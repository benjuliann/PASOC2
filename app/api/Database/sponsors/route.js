export const dynamic = 'force-dynamic';

import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { containsProfanity } from "@/app/_utils/moderationHelpers";

const FEATURED_SPONSOR_LIMIT = 5;
const FEATURED_LIMIT_REACHED_MESSAGE =
	"Featured limit is reached. Move one to Over the Years first.";

function toDbSponsorStatus(value) {
	const normalized = String(value || "")
		.trim()
		.toLowerCase();
	if (normalized === "current") return "Current";
	if (normalized === "previous") return "Previous";
	return null;
}

function getSponsorModerationError(name, description) {
	if (containsProfanity(name)) {
		return "Sponsor name contains inappropriate language.";
	}

	if (containsProfanity(description)) {
		return "Sponsor description contains inappropriate language.";
	}

	return "";
}

export async function GET() {
	try {
		const [rows] = await pool.query(`
            SELECT
                sponsorId AS id,
                sponsorName AS name,
                sponsorDescription AS description,
				LOWER(sponsorStatus) AS status
			FROM SponsorInfo
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
		const status = toDbSponsorStatus(body.status || "current");

		if (!name) {
			return NextResponse.json(
				{ error: "Name is required" },
				{ status: 400 },
			);
		}

		if (!status) {
			return NextResponse.json(
				{ error: "Status must be Current or Previous" },
				{ status: 400 },
			);
		}

		if (status === "Current") {
			const [countRows] = await pool.query(
				`SELECT COUNT(*) AS total FROM SponsorInfo WHERE sponsorStatus = 'Current'`,
			);
			const featuredCount = Number(countRows?.[0]?.total || 0);

			if (featuredCount >= FEATURED_SPONSOR_LIMIT) {
				return NextResponse.json(
					{ error: FEATURED_LIMIT_REACHED_MESSAGE },
					{ status: 400 },
				);
			}
		}

		const moderationError = getSponsorModerationError(name, description);
		if (moderationError) {
			return NextResponse.json(
				{ error: moderationError },
				{ status: 400 },
			);
		}

		await pool.query(
			`INSERT INTO SponsorInfo (sponsorId, sponsorName, sponsorDescription, sponsorStatus)
             VALUES (?, ?, ?, ?)`,
			[id, name, description, status],
		);

		return NextResponse.json(
			{ id, name, description, status: status.toLowerCase() },
			{ status: 201 },
		);
	} catch (err) {
		console.error("[POST /api/Database/sponsors]", err.message);
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
