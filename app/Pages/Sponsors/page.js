"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import CurrentSponsorCard from "./CurrentSponsorCard";
import PreviousSponsorCard from "./PreviousSponsorCard";
import { FloatingButton } from "../../UI/FloatingButton";

export default function Sponsors() {
	// Mock data for current sponsors
	const initialCurrentSponsors = [
		{
			id: 1,
			name: "Sponsor Name",
			eventSponsored: "Event Sponsored",
			description:
				"Information about this sponsor and their contribution to our events. This section provides details about their partnership with us.",
		},
		{
			id: 2,
			name: "Sponsor Name",
			eventSponsored: "Event Sponsored",
			description:
				"Information about this sponsor and their contribution to our events. This section provides details about their partnership with us.",
		},
	];

	// State: list shown in the "Current Sponsors" section.
	const [currentSponsors, setCurrentSponsors] = useState(
		initialCurrentSponsors,
	);
	// State: controls whether the add-sponsor modal is visible.
	const [isAddSponsorModalOpen, setIsAddSponsorModalOpen] = useState(false);
	const [editingSponsorId, setEditingSponsorId] = useState(null);
	// State: stores the values typed into the modal form fields.
	const [newSponsor, setNewSponsor] = useState({
		name: "",
		eventSponsored: "",
		description: "",
	});
	// State: list shown in the "Previous Sponsors" section.
	const [previousSponsors, setPreviousSponsors] = useState([
		{ id: 3, name: "Name" },
		{ id: 4, name: "Name" },
		{ id: 5, name: "Name" },
	]);

	// input handler: updates a form field by its "name" attribute.
	const handleSponsorFieldChange = (event) => {
		const { name, value } = event.target;
		setNewSponsor((previous) => ({
			...previous,
			[name]: value,
		}));
	};

	// Closes modal and clears form so next open starts fresh.
	const closeAddSponsorModal = () => {
		setIsAddSponsorModalOpen(false);
		setEditingSponsorId(null);
		setNewSponsor({
			name: "",
			eventSponsored: "",
			description: "",
		});
	};

	const handleDeleteCurrentSponsor = (sponsorId) => {
		setCurrentSponsors((previous) =>
			previous.filter((sponsor) => sponsor.id !== sponsorId),
		);
	};

	const handleMoveToPrevious = (sponsorId) => {
		setCurrentSponsors((previousCurrent) => {
			const sponsorToMove = previousCurrent.find(
				(sponsor) => sponsor.id === sponsorId,
			);

			if (!sponsorToMove) {
				return previousCurrent;
			}

			setPreviousSponsors((previousList) => [
				...previousList,
				{ id: Date.now(), name: sponsorToMove.name },
			]);

			return previousCurrent.filter(
				(sponsor) => sponsor.id !== sponsorId,
			);
		});
	};

	const handleEditCurrentSponsor = (sponsorId) => {
		const sponsorToEdit = currentSponsors.find(
			(sponsor) => sponsor.id === sponsorId,
		);

		if (!sponsorToEdit) {
			return;
		}

		setEditingSponsorId(sponsorId);
		setNewSponsor({
			name: sponsorToEdit.name,
			eventSponsored: sponsorToEdit.eventSponsored || "",
			description: sponsorToEdit.description || "",
		});
		setIsAddSponsorModalOpen(true);
	};

	// Handles form submit: validates, creates a new sponsor object, and appends it to the list.
	const handleAddSponsor = (event) => {
		event.preventDefault();

		// Basic guard: sponsor name is required.
		if (!newSponsor.name.trim()) {
			return;
		}

		if (editingSponsorId) {
			setCurrentSponsors((previous) =>
				previous.map((sponsor) =>
					sponsor.id === editingSponsorId
						? {
								...sponsor,
								name: newSponsor.name.trim(),
								eventSponsored:
									newSponsor.eventSponsored.trim() ||
									"Event Sponsored",
								description: newSponsor.description.trim(),
							}
						: sponsor,
				),
			);
		} else {
			// Add the new sponsor to existing sponsors in state.
			setCurrentSponsors((previous) => [
				...previous,
				{
					id: Date.now(),
					name: newSponsor.name.trim(),
					eventSponsored:
						newSponsor.eventSponsored.trim() || "Event Sponsored",
					description: newSponsor.description.trim(),
				},
			]);
		}

		// Close and reset modal after successful add.
		closeAddSponsorModal();
	};

	return (
		<main className="min-h-screen p-6 md:p-8">
			{/* Page Header */}
			<div className="text-center mb-12">
				<div className="flex items-center justify-center mb-4">
					<div className="flex-1 h-px bg-gray-300"></div>
					<h1 className="text-3xl font-bold px-6 text-gray-800">
						SPONSORS
					</h1>
					<div className="flex-1 h-px bg-gray-300"></div>
				</div>
			</div>

			{/* Current Sponsors Section */}
			<section className="mb-16">
				<div className="flex items-center justify-center gap-3 mb-8">
					<h2 className="text-2xl font-semibold underline text-gray-800">
						Current Sponsors
					</h2>
					{/* Opens modal to add a new current sponsor */}
					<button
						type="button"
						aria-label="Add current sponsor"
						className="w-8 h-8 rounded-full bg-[#556B2F] flex items-center justify-center hover:bg-green-800 focus:outline-none"
						onClick={() => setIsAddSponsorModalOpen(true)}
					>
						<Plus size={16} strokeWidth={3} />
					</button>
				</div>
				<div className="flex flex-col gap-8 items-center">
					{/* Render one card per current sponsor in state */}
					{currentSponsors.map((sponsor) => (
						<CurrentSponsorCard
							key={sponsor.id}
							sponsor={sponsor}
							onDelete={handleDeleteCurrentSponsor}
							onEdit={handleEditCurrentSponsor}
							onMoveToPrevious={handleMoveToPrevious}
						/>
					))}
				</div>
			</section>

			{/* Divider Line */}
			<div className="w-full h-px bg-gray-300 mb-16"></div>

			{/* Previous Sponsors Section */}
			<section className="mb-16">
				<h2 className="text-2xl font-semibold text-center mb-8 underline text-gray-800">
					Previous Sponsors
				</h2>
				<div className="flex flex-wrap justify-center gap-6">
					{/* Render static previous sponsors list */}
					{previousSponsors.map((sponsor) => (
						<PreviousSponsorCard
							key={sponsor.id}
							sponsor={sponsor}
						/>
					))}
				</div>
			</section>

			{/* Floating Button */}
			<form action="/FAQs">
				<FloatingButton />
			</form>

			{/* Modal only renders when isAddSponsorModalOpen is true */}
			{isAddSponsorModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
					<div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
						<div className="relative mb-4">
							<h3 className="text-center text-xl font-bold text-gray-800">
								{editingSponsorId
									? "Edit Sponsor"
									: "Current Sponsor"}
							</h3>
							<button
								type="button"
								onClick={closeAddSponsorModal}
								className="absolute right-0 top-0 text-gray-600 hover:text-gray-800"
								aria-label="Close modal"
							>
								<X size={18} strokeWidth={2.5} />
							</button>
						</div>

						<form
							onSubmit={handleAddSponsor}
							className="flex flex-col gap-6"
						>
							{/* Placeholder logo/photo area (not wired to uploads yet) */}
							<div className="mx-auto flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-200">
								<div className="text-gray-500">
									<svg
										className="h-8 w-8"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<div className="mt-1 text-center text-sm text-gray-500">
									Photo or Logo
								</div>
							</div>

							<div className="space-y-4">
								<div>
									<label
										htmlFor="name"
										className="mb-1 block text-sm font-semibold text-gray-700"
									>
										Sponsor Name
									</label>
									<input
										id="name"
										name="name"
										type="text"
										value={newSponsor.name}
										onChange={handleSponsorFieldChange}
										required
										className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-400"
									/>
								</div>

								<div>
									<label
										htmlFor="eventSponsored"
										className="mb-1 block text-sm font-semibold text-gray-700"
									>
										Event Sponsored
									</label>
									<input
										id="eventSponsored"
										name="eventSponsored"
										type="text"
										value={newSponsor.eventSponsored}
										onChange={handleSponsorFieldChange}
										className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-400"
									/>
								</div>

								<div>
									<label
										htmlFor="description"
										className="mb-1 block text-sm font-semibold text-gray-700"
									>
										About Sponsor
									</label>
									<textarea
										id="description"
										name="description"
										rows={4}
										value={newSponsor.description}
										onChange={handleSponsorFieldChange}
										className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-400"
									/>
								</div>

								<div className="flex justify-end">
									<button
										type="submit"
										className="rounded-md bg-[#556B2F] px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
									>
										{editingSponsorId
											? "Save Changes"
											: "Add Sponsor"}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</main>
	);
}
