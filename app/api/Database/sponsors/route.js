import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const [rows] = await pool.query(`
            SELECT
                sponsorId AS id,
                sponsorName AS name,
                sponsorDescription AS description,
                sponsorStatus AS status
            FROM sponsorinfo
            ORDER BY sponsorName ASC
        `);
		return NextResponse.json(rows);
	} catch (err) {
		console.error("[GET /api/Database/sponsors]", err.message);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

export async function POST(request) {
	try {
		const body = await request.json();
		const id = `sp_${Date.now()}`;
		const name = (body.name || "").trim();
		const description = (body.description || "").trim();
		const status = body.status || "current";

		if (!name) {
			return NextResponse.json(
				{ error: "Name is required" },
				{ status: 400 },
			);
		}

		await pool.query(
			`INSERT INTO sponsorinfo (sponsorId, sponsorName, sponsorDescription, sponsorStatus)
             VALUES (?, ?, ?, ?)`,
			[id, name, description, status],
		);

		return NextResponse.json(
			{ id, name, description, status },
			{ status: 201 },
		);
	} catch (err) {
		console.error("[POST /api/Database/sponsors]", err.message);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
