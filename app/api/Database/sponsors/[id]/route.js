import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, context) {
	try {
		const { id } = await context.params;
		const body = await request.json();

		const fields = [];
		const values = [];

		if (typeof body.name === "string") {
			fields.push("sponsorName = ?");
			values.push(body.name.trim());
		}
		if (typeof body.description === "string") {
			fields.push("sponsorDescription = ?");
			values.push(body.description.trim());
		}
		if (typeof body.status === "string") {
			fields.push("sponsorStatus = ?");
			values.push(body.status);
		}

		if (!fields.length) {
			return NextResponse.json(
				{ error: "No fields provided" },
				{ status: 400 },
			);
		}

		values.push(id);

		const [result] = await pool.query(
			`UPDATE sponsorinfo SET ${fields.join(", ")} WHERE sponsorId = ?`,
			values,
		);

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{ error: "Sponsor not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error("[PUT /api/Database/sponsors/:id]", err.message);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

export async function DELETE(_request, context) {
	try {
		const { id } = await context.params;

		const [result] = await pool.query(
			`DELETE FROM sponsorinfo WHERE sponsorId = ?`,
			[id],
		);

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{ error: "Sponsor not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ ok: true });
	} catch (err) {
		console.error("[DELETE /api/Database/sponsors/:id]", err.message);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
