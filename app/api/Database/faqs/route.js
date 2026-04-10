import pool from "@/lib/db";
import { NextResponse } from "next/server";
import {
	shouldRejectForModeration,
	getModerationErrorMessage,
} from "@/app/_utils/moderationHelpers"

async function getFaqModerationError(question, answer) {
	const questionResult = await shouldRejectForModeration("question", question);
	if (questionResult.shouldReject) {
		return getModerationErrorMessage(questionResult);
	}

	const answerResult = await shouldRejectForModeration("answer", answer);
	if (answerResult.shouldReject) {
		return getModerationErrorMessage(answerResult);
	}

	return "";
}

export async function GET() {
	try {
		const [rows] = await pool.query(
			`SELECT questionID AS id, questionTitle AS question, answerContent AS answer
             FROM FaqList
             ORDER BY questionID ASC`,
		);
		return NextResponse.json(rows);
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

		const moderationError = await getFaqModerationError(question, answer);
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
