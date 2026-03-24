"use client";

import React from "react";
import { FaqsCard } from "./FaqsCard.jsx";

export function FaqsManager() {
	const [faqs, setFaqs] = React.useState([]);
	const [question, setQuestion] = React.useState("");
	const [answer, setAnswer] = React.useState("");
	const [editingId, setEditingId] = React.useState(null);
	const [editQuestion, setEditQuestion] = React.useState("");
	const [editAnswer, setEditAnswer] = React.useState("");
	const [isAdding, setIsAdding] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);
	const [errorMessage, setErrorMessage] = React.useState("");
	const [confirmModal, setConfirmModal] = React.useState({
		isOpen: false,
		action: null,
		faqId: null,
	});

	const loadFaqs = React.useCallback(async () => {
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
	}, []);

	React.useEffect(() => {
		loadFaqs();
	}, [loadFaqs]);

	const addFaq = async () => {
		const trimmedQuestion = question.trim();
		const trimmedAnswer = answer.trim();
		if (!trimmedQuestion || !trimmedAnswer) return;

		try {
			setErrorMessage("");
			const response = await fetch("/api/Database/faqs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					question: trimmedQuestion,
					answer: trimmedAnswer,
				}),
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to add FAQ");
			}

			setFaqs((previous) => [...previous, data]);
			setQuestion("");
			setAnswer("");
			setIsAdding(false);
		} catch (error) {
			setErrorMessage(error.message || "Failed to add FAQ");
		}
	};

	const startEdit = (faq) => {
		setEditingId(faq.id);
		setEditQuestion(faq.question);
		setEditAnswer(faq.answer);
	};

	const saveEdit = async (id) => {
		const trimmedQuestion = editQuestion.trim();
		const trimmedAnswer = editAnswer.trim();
		if (!trimmedQuestion || !trimmedAnswer) return;

		try {
			setErrorMessage("");
			const response = await fetch(`/api/Database/faqs/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					question: trimmedQuestion,
					answer: trimmedAnswer,
				}),
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to update FAQ");
			}

			setFaqs((previous) =>
				previous.map((faq) =>
					faq.id === id
						? {
								...faq,
								question: trimmedQuestion,
								answer: trimmedAnswer,
							}
						: faq,
				),
			);
			setEditingId(null);
			setEditQuestion("");
			setEditAnswer("");
		} catch (error) {
			setErrorMessage(error.message || "Failed to update FAQ");
		}
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditQuestion("");
		setEditAnswer("");
	};

	const openDeleteConfirmModal = (id) => {
		setConfirmModal({
			isOpen: true,
			action: "delete",
			faqId: id,
		});
	};

	const openCreateConfirmModal = () => {
		const trimmedQuestion = question.trim();
		const trimmedAnswer = answer.trim();
		if (!trimmedQuestion || !trimmedAnswer) return;

		setConfirmModal({
			isOpen: true,
			action: "create",
			faqId: null,
		});
	};

	const openEditConfirmModal = (id) => {
		const trimmedQuestion = editQuestion.trim();
		const trimmedAnswer = editAnswer.trim();
		if (!trimmedQuestion || !trimmedAnswer) return;

		setConfirmModal({
			isOpen: true,
			action: "edit",
			faqId: id,
		});
	};

	const closeConfirmModal = () => {
		setConfirmModal({
			isOpen: false,
			action: null,
			faqId: null,
		});
	};

	const deleteFaq = async (id) => {
		try {
			setErrorMessage("");
			const response = await fetch(`/api/Database/faqs/${id}`, {
				method: "DELETE",
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to delete FAQ");
			}

			setFaqs((previous) => previous.filter((faq) => faq.id !== id));
			if (editingId === id) {
				cancelEdit();
			}
			closeConfirmModal();
		} catch (error) {
			setErrorMessage(error.message || "Failed to delete FAQ");
		}
	};

	const selectedFaqQuestion =
		faqs.find((faq) => faq.id === confirmModal.faqId)?.question ||
		"this FAQ";
	const createFaqQuestion = question.trim() || "this FAQ";
	const editFaqQuestion = editQuestion.trim() || "this FAQ";

	const confirmAction = () => {
		if (confirmModal.action === "create") {
			addFaq();
			closeConfirmModal();
			return;
		}

		if (confirmModal.action === "edit" && confirmModal.faqId) {
			saveEdit(confirmModal.faqId);
			closeConfirmModal();
			return;
		}

		if (confirmModal.action === "delete" && confirmModal.faqId) {
			deleteFaq(confirmModal.faqId);
		}
	};

	return (
		<section className="w-full max-w-6xl mx-auto px-6 py-10 space-y-6">
			{errorMessage && (
				<p className="text-red-700 font-medium">{errorMessage}</p>
			)}
			{isAdding ? (
				<div className="rounded-xl bg-white shadow-md p-5 space-y-3">
					<input
						type="text"
						value={question}
						onChange={(event) => setQuestion(event.target.value)}
						placeholder="Question"
						className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
					/>
					<textarea
						value={answer}
						onChange={(event) => setAnswer(event.target.value)}
						placeholder="Answer"
						rows={4}
						className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black"
					/>
					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={openCreateConfirmModal}
							className="rounded-md bg-[#556B2F] px-4 py-2 text-base font-semibold text-white hover:bg-[#6b8e23]"
						>
							Add FAQs
						</button>
						<button
							type="button"
							onClick={() => {
								setIsAdding(false);
								setQuestion("");
								setAnswer("");
							}}
							className="rounded-md bg-red-700 px-4 py-2 text-base font-semibold text-white hover:bg-red-800"
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<div className="flex justify-end">
					<button
						type="button"
						onClick={() => setIsAdding(true)}
						className="rounded-md bg-[#556B2F] px-4 py-2 text-base font-semibold text-white hover:bg-[#6b8e23]"
					>
						Add FAQs
					</button>
				</div>
			)}

			{isLoading ? (
				<p className="text-gray-700">Loading FAQs...</p>
			) : (
				faqs.map((faq) => (
					<FaqsCard
						key={faq.id}
						question={faq.question}
						answer={faq.answer}
						onEdit={() => startEdit(faq)}
						onDelete={() => openDeleteConfirmModal(faq.id)}
						isEditing={editingId === faq.id}
						editQuestion={editQuestion}
						editAnswer={editAnswer}
						onChangeEditQuestion={setEditQuestion}
						onChangeEditAnswer={setEditAnswer}
						onSave={() => openEditConfirmModal(faq.id)}
						onCancel={cancelEdit}
					/>
				))
			)}

			{confirmModal.isOpen && (
				<div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
					<div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
						<h3 className="text-lg font-bold text-gray-800">
							{confirmModal.action === "create"
								? `Are you sure you want to create "${createFaqQuestion}"?`
								: confirmModal.action === "edit"
									? `Are you sure you want to save changes to "${editFaqQuestion}"?`
									: `Are you sure you want to delete "${selectedFaqQuestion}"?`}
						</h3>

						<div className="mt-6 flex justify-end gap-2">
							<button
								type="button"
								onClick={closeConfirmModal}
								className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={confirmAction}
								className={`rounded-md px-3 py-2 text-sm font-semibold text-white ${
									confirmModal.action === "create" ||
									confirmModal.action === "edit"
										? "bg-[#556B2F] hover:bg-[#6b8e23]"
										: "bg-red-700 hover:bg-red-800"
								}`}
							>
								{confirmModal.action === "create"
									? "Create"
									: confirmModal.action === "edit"
										? "Save"
										: "Delete"}
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
