import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { containsProfanity } from "@/app/_utils/moderationHelpers";

function toIsoString(value) {
	if (!value) {
		return null;
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return null;
	}

	return date.toISOString();
}

function normalizePublishedFlag(value) {
	return value === true || value === 1 || value === "1" ? 1 : 0;
}

function getBulletinModerationError(title, body) {
	if (containsProfanity(title)) {
		return "Title contains inappropriate language.";
	}

	if (containsProfanity(body)) {
		return "Body contains inappropriate language.";
	}

	return "";
}

function mapBulletinRow(row) {
	return {
		bulletinId: row.bulletinId,
		title: row.title,
		body: row.body,
		publishDate: toIsoString(row.publishDate),
		isPublished: Boolean(row.isPublished),
		createdAt: toIsoString(row.createdAt),
		updatedAt: toIsoString(row.updatedAt),
	};
}

export async function GET() {
	try {
		const [rows] = await pool.query(
			`SELECT bulletinId, title, body, publishDate, isPublished, createdAt, updatedAt
			 FROM BulletinList
			 ORDER BY publishDate DESC, bulletinId DESC`,
		);

		return NextResponse.json(rows.map(mapBulletinRow));
	} catch (error) {
		console.error("[GET /api/Database/bulletins]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function POST(request) {
	try {
		const body = await request.json();
		const title = (body.title || "").trim();
		const bulletinBody = (body.body || "").trim();
		const isPublished = normalizePublishedFlag(body.isPublished);

		if (!title || !bulletinBody) {
			return NextResponse.json(
				{ error: "Title and body are required" },
				{ status: 400 },
			);
		}

		const moderationError = getBulletinModerationError(title, bulletinBody);
		if (moderationError) {
			return NextResponse.json(
				{ error: moderationError },
				{ status: 400 },
			);
		}

		const [result] = await pool.query(
			`INSERT INTO BulletinList (title, body, publishDate, isPublished)
			 VALUES (?, ?, NOW(), ?)`,
			[title, bulletinBody, isPublished],
		);

		return NextResponse.json(
			{
				bulletinId: result.insertId,
				title,
				body: bulletinBody,
				isPublished: Boolean(isPublished),
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("[POST /api/Database/bulletins]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}