export const dynamic = 'force-dynamic';

import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { containsProfanity } from "@/app/_utils/moderationHelpers";

function toDbSponsorStatus(value) {
	const normalized = String(value || "")
		.trim()
		.toLowerCase();
	if (normalized === "current") return "Current";
	if (normalized === "previous") return "Previous";
	return null;
}

function getSponsorModerationError(key, value) {
	if (!value) return "";

	if (containsProfanity(value)) {
		return key === "name"
			? "Sponsor name contains inappropriate language."
			: "Sponsor description contains inappropriate language.";
	}

	return "";
}

export async function PUT(request, context) {
	try {
		const { id } = await context.params;
		const body = await request.json();

		const fields = [];
		const values = [];

		if (typeof body.name === "string") {
			const trimmedName = body.name.trim();
			const nameModerationError = getSponsorModerationError(
				"name",
				trimmedName,
			);

			if (nameModerationError) {
				return NextResponse.json(
					{ error: nameModerationError },
					{ status: 400 },
				);
			}

			fields.push("sponsorName = ?");
			values.push(trimmedName);
		}
		if (typeof body.description === "string") {
			const trimmedDescription = body.description.trim();
			const descriptionModerationError = getSponsorModerationError(
				"description",
				trimmedDescription,
			);

			if (descriptionModerationError) {
				return NextResponse.json(
					{ error: descriptionModerationError },
					{ status: 400 },
				);
			}

			fields.push("sponsorDescription = ?");
			values.push(trimmedDescription);
		}
		if (typeof body.status === "string") {
			const normalizedStatus = toDbSponsorStatus(body.status);
			if (!normalizedStatus) {
				return NextResponse.json(
					{ error: "Status must be Current or Previous" },
					{ status: 400 },
				);
			}
			fields.push("sponsorStatus = ?");
			values.push(normalizedStatus);
		}

		if (!fields.length) {
			return NextResponse.json(
				{ error: "No fields provided" },
				{ status: 400 },
			);
		}

		values.push(id);

		const [result] = await pool.query(
			`UPDATE SponsorInfo SET ${fields.join(", ")} WHERE sponsorId = ?`,
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
			`DELETE FROM SponsorInfo WHERE sponsorId = ?`,
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
