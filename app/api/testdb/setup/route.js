import pool from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/testdb/setup
// Creates the GuestUsers table if it doesn't exist, and runs a connection check.
export async function GET() {
  const results = {};

  // Step 1: Test connection
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT 1 + 1 AS result");
    results.connection = {
      success: true,
      message: `Connected to MySQL. Ping result: ${rows[0].result}`,
    };
    connection.release();
  } catch (err) {
    results.connection = {
      success: false,
      error: err.message,
      code: err.code || null,
    };

    // No point continuing if we can't connect
    return NextResponse.json({ success: false, results }, { status: 500 });
  }

  // Step 2: Show current database
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS db");
    results.database = { success: true, name: rows[0].db };
  } catch (err) {
    results.database = { success: false, error: err.message };
  }

  // Step 3: Create GuestUsers table if not exists
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS GuestUsers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    results.table = {
      success: true,
      message: "GuestUsers table is ready (created or already exists).",
    };
  } catch (err) {
    results.table = { success: false, error: err.message };
  }

  // Step 4: Seed a test row
  try {
    await pool.query(
      "INSERT IGNORE INTO GuestUsers (name, email) VALUES (?, ?)",
      ["Test User", "test@pasoc.ca"]
    );
    results.seed = { success: true, message: "Seed row inserted (or already existed)." };
  } catch (err) {
    results.seed = { success: false, error: err.message };
  }

  const allOk = Object.values(results).every((r) => r.success);

  return NextResponse.json({
    success: allOk,
    message: allOk
      ? "All setup steps passed. Your DB is ready!"
      : "Some steps failed — see results for details.",
    results,
  });
}