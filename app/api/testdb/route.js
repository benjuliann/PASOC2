import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Verify connection first
    const connection = await pool.getConnection();
    connection.release();

    const [rows] = await pool.query("SELECT * FROM GuestUsers ORDER BY id DESC");

    return NextResponse.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error("[GET /api/testdb]", err.message);

    // Return a more descriptive error for debugging
    return NextResponse.json(
      {
        success: false,
        error: err.message,
        code: err.code || null,
        hint: err.code === "ER_NO_SUCH_TABLE"
          ? "Table does not exist. Visit /api/testdb/setup to create it."
          : err.code === "ECONNREFUSED"
          ? "Cannot reach MySQL. Check MYSQL_HOST and that the DB service is running."
          : "Check server logs for more details.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      "INSERT INTO GuestUsers (name, email) VALUES (?, ?)",
      [name, email]
    );

    return NextResponse.json({
      success: true,
      message: "Guest user added",
      insertId: result.insertId,
    });
  } catch (err) {
    console.error("[POST /api/testdb]", err.message);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
        code: err.code || null,
        hint: err.code === "ER_NO_SUCH_TABLE"
          ? "Table does not exist. Visit /api/testdb/setup to create it first."
          : "Check server logs for more details.",
      },
      { status: 500 }
    );
  }
}