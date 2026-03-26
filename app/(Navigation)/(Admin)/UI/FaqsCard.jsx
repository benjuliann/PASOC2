import React from "react";

export function FaqsCard({
	question,
	answer,
	onEdit,
	onDelete,
	isEditing = false,
	editQuestion,
	editAnswer,
	onChangeEditQuestion,
	onChangeEditAnswer,
	onSave,
	onCancel,
}) {
	const [isOpen, setIsOpen] = React.useState(false);
	const answerLines = String(answer || "")
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);

	return (
		<article className="w-full">
			{isEditing ? (
				<div className="space-y-3 rounded-2xl border border-gray-300 bg-[#f3f4f6] p-4">
					<input
						type="text"
						value={editQuestion}
						onChange={(event) =>
							onChangeEditQuestion(event.target.value)
						}
						placeholder="Question"
						className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
					/>
					<textarea
						value={editAnswer}
						onChange={(event) =>
							onChangeEditAnswer(event.target.value)
						}
						placeholder="Answer"
						rows={4}
						className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
					/>
					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={onSave}
							className="rounded-md bg-[#556B2F] px-4 py-2 text-base font-semibold text-white hover:bg-[#6b8e23]"
						>
							Save
						</button>
						<button
							type="button"
							onClick={onCancel}
							className="rounded-md bg-red-700 px-4 py-2 text-base font-semibold text-white hover:bg-red-800"
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<div className="flex items-center gap-3">
					<div className="flex-1 rounded-2xl border border-gray-300 bg-[#f3f4f6] px-6 py-4 shadow-sm">
						<div className="flex items-center justify-between gap-3">
							<h3 className="text-2xl font-semibold text-[#526f2c] leading-tight">
								{question}
							</h3>
							<button
								type="button"
								onClick={() =>
									setIsOpen((previous) => !previous)
								}
								className="text-black text-xl font-semibold"
								aria-label={
									isOpen ? "Hide answer" : "Show answer"
								}
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
									<p className="text-lg text-black">
										{answer}
									</p>
								)}
							</div>
						)}
					</div>

					<div className="flex shrink-0 flex-row gap-2">
						<button
							type="button"
							onClick={onEdit}
							className="rounded-md bg-[#556B2F] px-4 py-2 text-base font-semibold text-white hover:bg-[#6b8e23]"
						>
							Edit
						</button>
						<button
							type="button"
							onClick={onDelete}
							className="rounded-md bg-red-700 px-4 py-2 text-base font-semibold text-white hover:bg-red-800"
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</article>
	);
}
