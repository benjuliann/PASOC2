import pool from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    // Verify connection
    const connection = await pool.getConnection();
    connection.release();

    const [rows] = await pool.query(
      "SELECT * FROM Events ORDER BY eventId DESC"
    );

    return NextResponse.json({
      success: true,
      count: rows.length,
      data: rows,
    });

  } catch (err) {
    console.error("[GET /api/Database/events]", err.message);

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

