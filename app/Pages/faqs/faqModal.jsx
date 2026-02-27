"use client";

export default function FaqModal({ isOpen, onClose }) {
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
					aria-label="Close add FAQ modal"
					className="absolute right-4 top-4 rounded-md px-2 py-1 text-lg text-black transition hover:bg-gray-100"
				>
					✕
				</button>
				<form className="space-y-4 pt-8">
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
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none"
						/>
					</div>
					<div>
						<label
							htmlFor="faq-answer"
							className="mb-1 block text-sm font-medium text-black"
						>
							Answer
						</label>
						<input
							id="faq-answer"
							type="text"
							name="answer"
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none"
						/>
					</div>
					<div className="flex justify-end">
						<button
							type="button"
							className="rounded-lg bg-[#556B2F] hover:bg-green-800 px-4 py-2 text-sm font-semibold text-white"
						>
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
