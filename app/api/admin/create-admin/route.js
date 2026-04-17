import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";

const ROLES = {
  SUPERADMIN: 1,
  ADMIN: 2,
  MEMBER: 3,
};

export async function POST(request) {
  const adminAuth = getAdminAuth();
  let newFirebaseUser = null;
  let insertedUserLoginUuid = null;

  try {
    // Get Firebase token from request header
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Missing authentication token." },
        { status: 401 }
      );
    }

    // Verify logged-in user
    const decodedToken = await adminAuth.verifyIdToken(token);
    const currentUserUid = decodedToken.uid;

    // Get current user's role from MemberInfo
    const [currentUsers] = await pool.query(
      `SELECT uuid, roleId, email FROM MemberInfo WHERE uuid = ? LIMIT 1`,
      [currentUserUid]
    );

    if (!currentUsers.length) {
      return NextResponse.json(
        { error: "Current user not found in MemberInfo." },
        { status: 404 }
      );
    }

    const currentUser = currentUsers[0];

    // Only super admins can create admin/super admin accounts
    if (currentUser.roleId !== ROLES.SUPERADMIN) {
      return NextResponse.json(
        { error: "Only super admins can create admin or super admin accounts." },
        { status: 403 }
      );
    }

    // Read submitted form data
    const body = await request.json();

    const firstName = (body.firstName || "").trim();
    const lastName = (body.lastName || "").trim();
    const dateOfBirth = body.dateOfBirth;
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";
    const requestedRoleId = Number(body.roleId);

    if (!firstName || !lastName || !dateOfBirth || !email || !password || !requestedRoleId) {
      return NextResponse.json(
        { error: "All fields including role are required." },
        { status: 400 }
      );
    }

    const allowedRoles = [ROLES.ADMIN, ROLES.SUPERADMIN];

    if (!allowedRoles.includes(requestedRoleId)) {
      return NextResponse.json(
        { error: "Invalid role selected." },
        { status: 400 }
      );
    }

    // Check if email already exists in UserLogin
    const [existingUsers] = await pool.query(
      `SELECT uuid FROM UserLogin WHERE email = ? LIMIT 1`,
      [email]
    );

    if (existingUsers.length) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Create Firebase Auth user
    newFirebaseUser = await adminAuth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // Insert into UserLogin
    await pool.query(
      `INSERT INTO UserLogin (uuid, email)
       VALUES (?, ?)`,
      [newFirebaseUser.uid, email]
    );

    insertedUserLoginUuid = newFirebaseUser.uid;

    // Insert into MemberInfo with temp values for required fields
    await pool.query(
      `INSERT INTO MemberInfo (
        uuid,
        roleId,
        name,
        dateOfBirth,
        applicationDate,
        address,
        postalCode,
        primaryPhone,
        secondaryPhone,
        email
      )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newFirebaseUser.uid,
        requestedRoleId,
        `${firstName} ${lastName}`,
        dateOfBirth,
        new Date(),
        "",
        "",
        "",
        "",
        email,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message:
          requestedRoleId === ROLES.SUPERADMIN
            ? "Super admin account created successfully."
            : "Admin account created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create account error:", error);

    // Clean up UserLogin row if it got inserted
    if (insertedUserLoginUuid) {
      try {
        await pool.query(`DELETE FROM UserLogin WHERE uuid = ?`, [
          insertedUserLoginUuid,
        ]);
      } catch (cleanupError) {
        console.error("Failed to clean up UserLogin row:", cleanupError);
      }
    }

    // Clean up Firebase user if it got created
    if (newFirebaseUser?.uid) {
      try {
        await adminAuth.deleteUser(newFirebaseUser.uid);
      } catch (cleanupError) {
        console.error("Failed to clean up Firebase user:", cleanupError);
      }
    }

    return NextResponse.json(
      {
        error: error.message || "Failed to create account.",
      },
      { status: 500 }
    );
  }
}