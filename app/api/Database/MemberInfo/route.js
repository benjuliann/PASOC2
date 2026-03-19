import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    const connection = await pool.getConnection();
    connection.release();

    if (uid) {
      const [rows] = await pool.query(
        "SELECT * FROM MemberInfo WHERE memberID = ?",
        [uid]
      );

      return NextResponse.json({
        success: true,
        count: rows.length,
        isMember: rows.length > 0,
        data: rows,
      });
    }

    const [rows] = await pool.query("SELECT * FROM MemberInfo");

    return NextResponse.json({
      success: true,
      count: rows.length,
      isMember: false,
      data: rows,
    });
  } catch (err) {
    console.error("[GET /api/Database/MemberInfo]", err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
        code: err.code || null,
        hint:
          err.code === "ER_NO_SUCH_TABLE"
            ? "Table does not exist."
            : err.code === "ECONNREFUSED"
            ? "Cannot reach MySQL."
            : "Check server logs.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      memberID,
      name,
      dateOfBirth,
      applicationDate,
      address,
      postalCode,
      primaryPhone,
      secondaryPhone,
      email,
    } = body;

    if (!memberID || !name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: memberID, name, email",
        },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO MemberInfo
      (memberID, name, dateOfBirth, applicationDate, address, postalCode, primaryPhone, secondaryPhone, email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        memberID,
        name,
        dateOfBirth,
        applicationDate,
        address,
        postalCode,
        primaryPhone,
        secondaryPhone,
        email,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Member added",
      insertId: result.insertId,
    });
  } catch (err) {
    console.error("[POST /api/Database/MemberInfo]", err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
        code: err.code || null,
        hint:
          err.code === "ER_NO_SUCH_TABLE"
            ? "Table does not exist."
            : "Check server logs.",
      },
      { status: 500 }
    );
  }
}