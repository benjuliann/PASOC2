import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await pool.getConnection();
    connection.release();

    const [rows] = await pool.query(
      "SELECT * FROM Events ORDER BY eventDate ASC"
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

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, date, time, where, sponsor } = body;

    if (!name || !date || !time || !where) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, date, time, where" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO Events (eventName, eventDate, eventTime, eventLocation, eventSponsor)
       VALUES (?, ?, ?, ?, ?)`,
      [name, date, time, where, sponsor || null]
    );

    return NextResponse.json({
      success: true,
      message: "Event created",
      insertId: result.insertId,
    });
  } catch (err) {
    console.error("[POST /api/Database/events]", err.message);
    return NextResponse.json(
      { success: false, error: err.message, code: err.code || null },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, date, time, where, sponsor } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing required field: id" },
        { status: 400 }
      );
    }

    const fields = [];
    const values = [];

    if (name !== undefined) { fields.push("eventName = ?"); values.push(name); }
    if (date !== undefined) { fields.push("eventDate = ?"); values.push(date); }
    if (time !== undefined) { fields.push("eventTime = ?"); values.push(time); }
    if (where !== undefined) { fields.push("eventLocation = ?"); values.push(where); }
    if (sponsor !== undefined) { fields.push("eventSponsor = ?"); values.push(sponsor); }

    if (fields.length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields provided to update" },
        { status: 400 }
      );
    }

    values.push(id);

    const [result] = await pool.query(
      `UPDATE Events SET ${fields.join(", ")} WHERE eventId = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Event updated" });
  } catch (err) {
    console.error("[PUT /api/Database/events]", err.message);
    return NextResponse.json(
      { success: false, error: err.message, code: err.code || null },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing required query parameter: id" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      "DELETE FROM Events WHERE eventId = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Event deleted" });
  } catch (err) {
    console.error("[DELETE /api/Database/events]", err.message);
    return NextResponse.json(
      { success: false, error: err.message, code: err.code || null },
      { status: 500 }
    );
  }
}