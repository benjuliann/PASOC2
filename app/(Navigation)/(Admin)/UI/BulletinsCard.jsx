import React from "react";

function formatDisplayDate(value) {
	if (!value) {
		return "No publish date";
	}

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return String(value);
	}

	return new Intl.DateTimeFormat("en-US", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}

export function BulletinCard({
	title,
	body,
	createdAt,
	updatedAt,
	isPublished = false,
	onEdit,
	onDelete,
	isEditing = false,
	editTitle,
	editBody,
	editIsPublished = false,
	editErrorMessage = "",
	onChangeEditTitle,
	onChangeEditBody,
	onChangeEditIsPublished,
	onSave,
	onCancel,
}) {
	const formattedCreatedAt = formatDisplayDate(createdAt);
	const formattedUpdatedAt = formatDisplayDate(updatedAt);
	const showUpdatedAt = Boolean(updatedAt && createdAt && updatedAt !== createdAt);

	return (
		<article className="w-full">
			{isEditing ? (
				<div className="overflow-hidden rounded-none border border-neutral-200 bg-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:rounded-3xl">
					<div className="flex flex-col gap-6 p-6 md:p-8">
						<div className="flex flex-wrap items-center gap-2">
							<span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#556B2F]">
								Edit Bulletin
							</span>
							<span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-700">
								{editIsPublished ? "Published" : "Draft"}
							</span>
						</div>

						{editErrorMessage && (
							<p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
								{editErrorMessage}
							</p>
						)}

						<input
							type="text"
							value={editTitle}
							onChange={(event) => onChangeEditTitle(event.target.value)}
							placeholder="Title"
							className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 text-3xl font-semibold text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-[#556B2F]"
						/>

						<textarea
							value={editBody}
							onChange={(event) => onChangeEditBody(event.target.value)}
							placeholder="Body"
							rows={8}
							className="w-full rounded-3xl border border-neutral-300 bg-white px-4 py-3 text-lg leading-relaxed text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-[#556B2F]"
						/>

						<label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
							<input
								type="checkbox"
								checked={editIsPublished}
								onChange={(event) =>
									onChangeEditIsPublished(event.target.checked)
								}
								className="h-4 w-4 accent-[#556B2F]"
							/>
							Published
						</label>

						<div className="flex flex-wrap justify-end gap-2 pt-2">
							<button
								type="button"
								onClick={onSave}
								className="rounded-full bg-[#556B2F] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#6b8e23]"
							>
								Save
							</button>
							<button
								type="button"
								onClick={onCancel}
								className="rounded-full bg-red-700 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-red-800"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className="overflow-hidden rounded-none border border-neutral-200 bg-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:rounded-3xl">
					<div className="flex flex-col gap-6 p-6 md:p-8">
						<div className="flex flex-wrap items-center gap-2">
							<span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#556B2F]">
								Bulletin
							</span>
							<span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-700">
								{isPublished ? "Published" : "Draft"}
							</span>
						</div>

						<h3 className="text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
							{title}
						</h3>

							<div className="space-y-1 text-sm font-medium uppercase tracking-[0.16em] text-neutral-600">
								<p>Published at {formattedCreatedAt}</p>
								{showUpdatedAt && <p>Updated at {formattedUpdatedAt}</p>}
							</div>

						<p className="whitespace-pre-line text-lg leading-relaxed text-neutral-700 md:text-xl">
							{body}
						</p>

						<div className="flex flex-wrap justify-end gap-2 pt-2">
							<button
								type="button"
								onClick={onEdit}
								className="rounded-full bg-[#556B2F] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#6b8e23]"
							>
								Edit
							</button>
							<button
								type="button"
								onClick={onDelete}
								className="rounded-full bg-red-700 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-red-800"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</article>
	);
}