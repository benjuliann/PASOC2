import pool from "@/lib/db";
import { NextResponse } from "next/server";
import {
	shouldRejectForModeration,
	getModerationErrorMessage,
} from "@/app/_utils/moderationHelpers";

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

function getCurrentTimestamp() {
	return new Date();
}

async function getBulletinModerationError(title, body) {
	const titleResult = await shouldRejectForModeration("title", title);
	if (titleResult.shouldReject) {
		return getModerationErrorMessage(titleResult);
	}

	const bodyResult = await shouldRejectForModeration("body", body);
	if (bodyResult.shouldReject) {
		return getModerationErrorMessage(bodyResult);
	}

	return "";
}

function mapBulletinRow(row) {
	const isPublished = Boolean(row.isPublished);

	return {
		bulletinId: row.bulletinId,
		title: row.title,
		body: row.body,
		publishDate: isPublished ? toIsoString(row.publishDate) : null,
		isPublished,
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
		const now = getCurrentTimestamp();
		const publishDate = isPublished ? now : null;

		if (!title || !bulletinBody) {
			return NextResponse.json(
				{ error: "Title and body are required" },
				{ status: 400 },
			);
		}

		const moderationError = await getBulletinModerationError(title, bulletinBody);
		if (moderationError) {
			return NextResponse.json(
				{ error: moderationError },
				{ status: 400 },
			);
		}

		const insertQuery = `INSERT INTO BulletinList
			 (title, body, publishDate, isPublished, createdAt, updatedAt)
		 VALUES (?, ?, ?, ?, ?, ?)`;
		const insertParams = [
			title,
			bulletinBody,
			publishDate,
			isPublished,
			now,
			now,
		];

		let result;
		try {
			[result] = await pool.query(insertQuery, insertParams);
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
			[result] = await pool.query(insertQuery, insertParams);
		}

		return NextResponse.json(
			{
				bulletinId: result.insertId,
				title,
				body: bulletinBody,
				publishDate: toIsoString(publishDate),
				isPublished: Boolean(isPublished),
				createdAt: toIsoString(now),
				updatedAt: toIsoString(now),
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("[POST /api/Database/bulletins]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}