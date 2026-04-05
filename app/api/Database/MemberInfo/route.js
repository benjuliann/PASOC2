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
        "SELECT * FROM MemberInfo WHERE uuid = ?",
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
      uuid,
      roleId,
      name,
      dateOfBirth,
      applicationDate,
      address,
      postalCode,
      primaryPhone,
      secondaryPhone,
      email,
    } = body;

    if (!uuid || !name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: uuid, name, email",
        },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO MemberInfo
      (uuid, roleId, name, dateOfBirth, applicationDate, address, postalCode, primaryPhone, secondaryPhone, email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuid,
        roleId,
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

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get("uuid");
    if (!uuid) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required query parameter: uuid",
        },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      "DELETE FROM MemberInfo WHERE uuid = ?",
      [uuid]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No member found with the provided uuid",
        },
        { status: 404 }
      );
    } else {
      return NextResponse.json({
        success: true,
        message: "Member deleted",
      });
    }
  } catch (err) {
    console.error("[DELETE /api/Database/MemberInfo]", err);
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

export async function PATCH(request) {
  try {
    const body = await request.json();

    const {
      uuid,
      name,
      applicationDate,
      address,
      postalCode,
      primaryPhone,
      secondaryPhone,
      email,
    } = body;

    if (!uuid) {
      return NextResponse.json(
        {
          success: false,
          error: "uuid is required",
        },
        { status: 400 }
      );
    }

    // Store fields dynamically
    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }

    if (applicationDate !== undefined) {
      fields.push("applicationDate = ?");
      values.push(applicationDate);
    }

    if (address !== undefined) {
      fields.push("address = ?");
      values.push(address);
    }

    if (postalCode !== undefined) {
      fields.push("postalCode = ?");
      values.push(postalCode);
    }

    if (primaryPhone !== undefined) {
      fields.push("primaryPhone = ?");
      values.push(primaryPhone);
    }

    if (secondaryPhone !== undefined) {
      fields.push("secondaryPhone = ?");
      values.push(secondaryPhone);
    }

    if (email !== undefined) {
      fields.push("email = ?");
      values.push(email);
    }

    // Prevent empty update
    if (fields.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No fields provided to update",
        },
        { status: 400 }
      );
    }

    values.push(uuid);

    const [result] = await pool.query(
      `UPDATE MemberInfo
       SET ${fields.join(", ")}
       WHERE uuid = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Member not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Member updated successfully",
    });

  } catch (error) {

  console.error("PATCH ERROR:", error);

  return NextResponse.json(
    {
      success:false,
      error:error.message   // SHOW REAL ERROR
    },
    { status:500 }
  );
}
}