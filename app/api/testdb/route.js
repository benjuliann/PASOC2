import pool from "@/lib/db1";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM GuestUsers");

    return NextResponse.json(rows);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    const [result] = await pool.query(
      "INSERT INTO GuestUsers (name, email) VALUES (?, ?)",
      [name, email]
    );

    return NextResponse.json({
      message: "Guest user added",
      insertId: result.insertId,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}