import { HeroSection } from "../../UI/HeroSection.jsx";
import FaqsCard from "./faqsCard.jsx";
import { query } from "../../../lib/db.js";

const fallbackFaqs = [
	{
		question: "How can I become a PASOC member?",
		answers: [
			"Complete the membership form on the website.",
			"Submit the required membership fee.",
			"Wait for a confirmation email from the PASOC team.",
		],
	},
];

function normalizeAnswers(value) {
	if (Array.isArray(value)) {
		return value;
	}

	if (typeof value !== "string" || value.trim() === "") {
		return [];
	}

	try {
		const parsed = JSON.parse(value);
		if (Array.isArray(parsed)) {
			return parsed;
		}
	} catch {}

	return value
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);
}

async function getFaqs() {
	try {
		const rows = await query(
			"SELECT id, question, answers FROM faqs ORDER BY sort_order ASC, id ASC",
		);

		if (!Array.isArray(rows) || rows.length === 0) {
			return fallbackFaqs;
		}

		return rows
			.map((row) => ({
				question: row.question,
				answers: normalizeAnswers(row.answers),
			}))
			.filter((faq) => faq.question);
	} catch (error) {
		console.error("Failed loading FAQs from MySQL:", error.message);
		return fallbackFaqs;
	}
}

export default async function FAQsPage() {
	const faqs = await getFaqs();

	return (
		<main>
			<HeroSection
				heading={
					<span style={{ display: "inline-block", marginTop: 50 }}>
						Frequently Asked Questions
					</span>
				}
				greeting=""
				showButtons={false}
			/>
			<section className="mx-auto mt-10 w-full max-w-4xl px-6 pb-16">
				<div className="mb-4 flex justify-end">
					<button
						type="button"
						className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-gray-100"
					>
						+ Add FAQ
					</button>
				</div>
				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<FaqsCard
							key={`${faq.question}-${index}`}
							question={faq.question}
							answers={faq.answers}
						/>
					))}
				</div>
			</section>
		</main>
	);
}
