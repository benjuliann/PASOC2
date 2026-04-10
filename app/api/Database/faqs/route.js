export const dynamic = 'force-dynamic';

import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { containsProfanity } from "@/app/_utils/moderationHelpers";

function getFaqModerationError(question, answer) {
	if (containsProfanity(question)) {
		return "Question contains inappropriate language.";
	}

	if (containsProfanity(answer)) {
		return "Answer contains inappropriate language.";
	}

	return "";
}

function parsePositiveInteger(value, fallback) {
	const parsed = Number.parseInt(value, 10);
	if (!Number.isInteger(parsed) || parsed <= 0) {
		return fallback;
	}

	return parsed;
}

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const requestedPage = parsePositiveInteger(searchParams.get("page"), 1);
		const requestedLimit = parsePositiveInteger(
			searchParams.get("limit"),
			5,
		);
		const limit = Math.min(requestedLimit, 50);

		const [countRows] = await pool.query(
			`SELECT COUNT(*) AS totalCount
			 FROM FaqList`,
		);
		const totalCount = Number(countRows?.[0]?.totalCount || 0);
		const pageCount = totalCount > 0 ? Math.ceil(totalCount / limit) : 1;
		const page = Math.min(requestedPage, pageCount);
		const offset = (page - 1) * limit;

		const [rows] = await pool.query(
			`SELECT questionID AS id, questionTitle AS question, answerContent AS answer
             FROM FaqList
			 ORDER BY questionID ASC
			 LIMIT ? OFFSET ?`,
			[limit, offset],
		);

		return NextResponse.json({
			data: rows,
			pagination: {
				page,
				limit,
				totalCount,
				pageCount,
				hasPrevPage: page > 1,
				hasNextPage: page < pageCount,
			},
		});
	} catch (error) {
		console.error("[GET /api/Database/faqs]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function POST(request) {
	try {
		const body = await request.json();
		const question = (body.question || "").trim();
		const answer = (body.answer || "").trim();

		if (!question || !answer) {
			return NextResponse.json(
				{ error: "Question and answer are required" },
				{ status: 400 },
			);
		}

		const moderationError = getFaqModerationError(question, answer);
		if (moderationError) {
			return NextResponse.json(
				{ error: moderationError },
				{ status: 400 },
			);
		}

		const [result] = await pool.query(
			`INSERT INTO FaqList (questionTitle, answerContent) VALUES (?, ?)`,
			[question, answer],
		);

		return NextResponse.json(
			{ id: result.insertId, question, answer },
			{ status: 201 },
		);
	} catch (error) {
		console.error("[POST /api/Database/faqs]", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
