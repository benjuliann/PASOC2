"use client";

import { useState } from "react";

export default function FaqsCard({ question, answers = [] }) {
	const [isOpen, setIsOpen] = useState(false);
	const normalizedAnswers = Array.isArray(answers) ? answers : [answers];

	return (
		<section
			className={`w-full rounded-xl border border-gray-300 bg-white px-6 pt-3 shadow-sm ${
				isOpen ? "pb-6" : "pb-3"
			}`}
		>
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-xl font-semibold text-black">{question}</h2>
				<button
					type="button"
					onClick={() => setIsOpen((prev) => !prev)}
					aria-expanded={isOpen}
					aria-label={isOpen ? "Collapse answer" : "Expand answer"}
					className="text-2xl text-black transition-transform duration-200"
					style={{
						transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
					}}
				>
					▾
				</button>
			</div>
			{isOpen && (
				<ul className="mt-4 list-disc space-y-2 pl-6">
					{normalizedAnswers.map((answer, index) => (
						<li
							key={`${question}-${index}`}
							className="text-base text-black"
						>
							{answer}
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
