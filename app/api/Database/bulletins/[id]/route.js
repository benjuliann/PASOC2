import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { containsProfanity } from "@/app/_utils/moderationHelpers";

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

export async function PUT(request, context) {
	try {
		const { id } = context.params;
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
			`UPDATE BulletinList
			 SET title = ?, body = ?, isPublished = ?
			 WHERE bulletinId = ?`,
			[title, bulletinBody, isPublished, id],
		);

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{ error: "Bulletin not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({
			bulletinId: Number(id),
			title,
			body: bulletinBody,
			isPublished: Boolean(isPublished),
		});
	} catch (error) {
		console.error("[PUT /api/Database/bulletins/:id]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(_request, context) {
	try {
		const { id } = context.params;

		const [result] = await pool.query(
			`DELETE FROM BulletinList WHERE bulletinId = ?`,
			[id],
		);

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{ error: "Bulletin not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error("[DELETE /api/Database/bulletins/:id]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}