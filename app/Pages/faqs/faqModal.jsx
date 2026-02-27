"use client";

import { useEffect, useState } from "react";

export default function FaqModal({
	isOpen,
	onClose,
	onSave,
	initialFaq = null,
	mode = "add",
}) {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		if (mode === "edit" && initialFaq) {
			setQuestion(initialFaq.question ?? "");
			const answersText = Array.isArray(initialFaq.answers)
				? initialFaq.answers.join("\n")
				: (initialFaq.answers ?? "");
			setAnswer(answersText);
			return;
		}

		setQuestion("");
		setAnswer("");
	}, [isOpen, initialFaq, mode]);

	function handleSubmit(event) {
		event.preventDefault();

		onSave?.({
			question: question.trim(),
			answer: answer.trim(),
		});
	}

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
			onClick={onClose}
		>
			<div
				className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-sm"
				onClick={(event) => event.stopPropagation()}
			>
				<button
					type="button"
					onClick={onClose}
					aria-label={`Close ${mode} FAQ modal`}
					className="absolute right-4 top-4 rounded-md px-2 py-1 text-lg text-black transition hover:bg-gray-100"
				>
					✕
				</button>
				<form onSubmit={handleSubmit} className="space-y-4 pt-8">
					<div>
						<label
							htmlFor="faq-question"
							className="mb-1 block text-sm font-medium text-black"
						>
							Question
						</label>
						<input
							id="faq-question"
							type="text"
							name="question"
							value={question}
							onChange={(event) =>
								setQuestion(event.target.value)
							}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="faq-answer"
							className="mb-1 block text-sm font-medium text-black"
						>
							Answer
						</label>
						<textarea
							id="faq-answer"
							name="answer"
							rows={4}
							value={answer}
							onChange={(event) => setAnswer(event.target.value)}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none"
							required
						/>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="rounded-lg bg-[#556B2F] hover:bg-green-800 px-4 py-2 text-sm font-semibold text-white"
						>
							{mode === "edit" ? "Save" : "Add"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
