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

async function getBulletinIdFromContext(context) {
	const params = await context?.params;
	const id = Number(params?.id);

	if (!Number.isInteger(id) || id <= 0) {
		return null;
	}

	return id;
}

export async function PUT(request, context) {
	try {
		const id = await getBulletinIdFromContext(context);
		if (!id) {
			return NextResponse.json(
				{ error: "Invalid bulletin id" },
				{ status: 400 },
			);
		}

		const body = await request.json();
		const title = (body.title || "").trim();
		const bulletinBody = (body.body || "").trim();
		const isPublished = normalizePublishedFlag(body.isPublished);
		const preserveUpdatedAt = Boolean(body.preserveUpdatedAt);

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

		const updateQuery = `UPDATE BulletinList
			 SET title = ?,
			     body = ?,
			     isPublished = ?,
			     publishDate = CASE
			       WHEN ? = 1 THEN COALESCE(publishDate, NOW())
			       ELSE NULL
			     END,
			     updatedAt = CASE
			       WHEN ? = 1 THEN updatedAt
			       ELSE NOW()
			     END
			 WHERE bulletinId = ?`;
		const updateParams = [
			title,
			bulletinBody,
			isPublished,
			isPublished,
			preserveUpdatedAt ? 1 : 0,
			id,
		];

		let result;
		try {
			[result] = await pool.query(updateQuery, updateParams);
		} catch (error) {
			const isPublishDateConstraintError =
				!isPublished &&
				error?.code === "ER_BAD_NULL_ERROR" &&
				String(error.message || "").includes("publishDate");

			if (!isPublishDateConstraintError) {
				throw error;
			}

			await pool.query(
				`ALTER TABLE BulletinList
				 MODIFY COLUMN publishDate DATETIME NULL DEFAULT NULL`,
			);
			[result] = await pool.query(updateQuery, updateParams);
		}

		if (result.affectedRows === 0) {
			return NextResponse.json(
				{ error: "Bulletin not found" },
				{ status: 404 },
			);
		}

		const [[updatedRow]] = await pool.query(
			`SELECT publishDate, updatedAt
			 FROM BulletinList
			 WHERE bulletinId = ?`,
			[id],
		);

		return NextResponse.json({
			bulletinId: Number(id),
			title,
			body: bulletinBody,
			publishDate: toIsoString(updatedRow?.publishDate),
			isPublished: Boolean(isPublished),
			updatedAt: toIsoString(updatedRow?.updatedAt),
		});
	} catch (error) {
		console.error("[PUT /api/Database/bulletins/:id]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(_request, context) {
	try {
		const id = await getBulletinIdFromContext(context);
		if (!id) {
			return NextResponse.json(
				{ error: "Invalid bulletin id" },
				{ status: 400 },
			);
		}

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
