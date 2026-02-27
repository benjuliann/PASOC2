"use client";

import { useState } from "react";
import FaqsCard from "./faqsCard.jsx";
import FaqModal from "./faqModal.jsx";

export default function FaqsContent({ faqs }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [faqItems, setFaqItems] = useState(faqs);
	const [faqToDeleteIndex, setFaqToDeleteIndex] = useState(null);
	const [faqToEditIndex, setFaqToEditIndex] = useState(null);

	function normalizeAnswerInput(value) {
		if (!value) {
			return [];
		}

		return value
			.split("\n")
			.map((line) => line.trim())
			.filter(Boolean);
	}

	function requestDeleteFaq(indexToDelete) {
		setFaqToDeleteIndex(indexToDelete);
	}

	function handleConfirmDelete() {
		if (faqToDeleteIndex === null) {
			return;
		}

		setFaqItems((previousFaqs) =>
			previousFaqs.filter((_, index) => index !== faqToDeleteIndex),
		);
		setFaqToDeleteIndex(null);
	}

	function handleCancelDelete() {
		setFaqToDeleteIndex(null);
	}

	function handleStartAddFaq() {
		setFaqToEditIndex(null);
		setIsModalOpen(true);
	}

	function handleStartEditFaq(indexToEdit) {
		setFaqToEditIndex(indexToEdit);
		setIsModalOpen(true);
	}

	function handleCloseModal() {
		setIsModalOpen(false);
		setFaqToEditIndex(null);
	}

	function handleSaveFaq({ question, answer }) {
		if (!question || !answer) {
			return;
		}

		const answers = normalizeAnswerInput(answer);

		if (faqToEditIndex === null) {
			setFaqItems((previousFaqs) => [
				...previousFaqs,
				{ question, answers },
			]);
			handleCloseModal();
			return;
		}

		setFaqItems((previousFaqs) =>
			previousFaqs.map((faq, index) =>
				index === faqToEditIndex ? { question, answers } : faq,
			),
		);
		handleCloseModal();
	}

	return (
		<>
			<div className="mb-4 flex justify-end">
				<button
					type="button"
					onClick={handleStartAddFaq}
					className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-black shadow-sm transition hover:bg-gray-100"
				>
					+ Add FAQ
				</button>
			</div>
			<div className="space-y-4">
				{faqItems.map((faq, index) => (
					<div
						key={`${faq.question}-${index}`}
						className="flex items-center gap-3"
					>
						<div className="flex-1">
							<FaqsCard
								question={faq.question}
								answers={faq.answers}
							/>
						</div>
						<button
							type="button"
							onClick={() => handleStartEditFaq(index)}
							className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black shadow-sm transition hover:bg-gray-100"
						>
							Edit
						</button>
						<button
							type="button"
							onClick={() => requestDeleteFaq(index)}
							className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 shadow-sm transition hover:bg-red-100"
						>
							Delete
						</button>
					</div>
				))}
			</div>
			{faqToDeleteIndex !== null && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
					<div className="w-auto rounded-xl bg-white p-4 shadow-sm">
						<div className="flex items-center gap-2">
							<p className="whitespace-nowrap text-sm text-black">
								Are you sure you want to delete?
							</p>
							<div className="flex gap-2">
								<button
									type="button"
									onClick={handleCancelDelete}
									className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-black shadow-sm transition hover:bg-gray-100"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={handleConfirmDelete}
									className="rounded-lg border border-red-700 bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-800"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			<FaqModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onSave={handleSaveFaq}
				mode={faqToEditIndex === null ? "add" : "edit"}
				initialFaq={
					faqToEditIndex === null ? null : faqItems[faqToEditIndex]
				}
			/>
		</>
	);
}
