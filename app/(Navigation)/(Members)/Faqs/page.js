"use client";

import React from "react";
import { HeroSection } from "../UI/HeroSection.jsx";

function FaqItem({ question, answer }) {
	const [isOpen, setIsOpen] = React.useState(false);
	const answerLines = String(answer || "")
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);

	return (
		<article className="w-full rounded-2xl border border-gray-300 bg-[#f3f4f6] px-6 py-4 shadow-sm">
			<div className="flex items-center justify-between gap-3">
				<h3 className="text-2xl font-semibold text-[#526f2c] leading-tight">
					{question}
				</h3>
				<button
					type="button"
					onClick={() => setIsOpen((previous) => !previous)}
					className="text-black text-xl font-semibold"
					aria-label={isOpen ? "Hide answer" : "Show answer"}
				>
					{isOpen ? "▲" : "▼"}
				</button>
			</div>

			{isOpen && (
				<div className="mt-3 border-t border-gray-300 pt-4">
					{answerLines.length > 1 ? (
						<ul className="list-disc pl-6 space-y-1 text-lg text-black">
							{answerLines.map((line, index) => (
								<li key={index}>{line}</li>
							))}
						</ul>
					) : (
						<p className="text-lg text-black">{answer}</p>
					)}
				</div>
			)}
		</article>
	);
}

export default function FaqsPage() {
	const [faqs, setFaqs] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [errorMessage, setErrorMessage] = React.useState("");

	React.useEffect(() => {
		const loadFaqs = async () => {
			try {
				setIsLoading(true);
				setErrorMessage("");
				const response = await fetch("/api/Database/faqs", {
					cache: "no-store",
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || "Failed to load FAQs");
				}

				setFaqs(Array.isArray(data) ? data : []);
			} catch (error) {
				setErrorMessage(error.message || "Failed to load FAQs");
			} finally {
				setIsLoading(false);
			}
		};

		loadFaqs();
	}, []);

	return (
		<main>
			<HeroSection title="Frequently Asked Questions" />
			<section className="w-full max-w-6xl mx-auto px-6 py-10 space-y-6">
				{errorMessage && (
					<p className="text-red-700 font-medium">{errorMessage}</p>
				)}
				{isLoading ? (
					<p className="text-gray-700">Loading FAQs...</p>
				) : (
					faqs.map((faq) => (
						<FaqItem
							key={faq.id}
							question={faq.question}
							answer={faq.answer}
						/>
					))
				)}
			</section>
		</main>
	);
}
