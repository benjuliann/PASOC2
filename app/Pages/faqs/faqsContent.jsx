"use client";

import { useState } from "react";
import FaqsCard from "./faqsCard.jsx";
import FaqModal from "./faqModal.jsx";

export default function FaqsContent({ faqs }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<div className="mb-4 flex justify-end">
				<button
					type="button"
					onClick={() => setIsModalOpen(true)}
					className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-black shadow-sm transition hover:bg-gray-100"
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
			<FaqModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
}
