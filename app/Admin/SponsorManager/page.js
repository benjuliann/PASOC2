"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { Header } from "../../(Navigation)/(Admin)/UI/Header";
import { Footer } from "../../(Navigation)/(Admin)/UI/Footer";
import CurrentSponsorCard from "../../(Navigation)/(Admin)/UI/CurrentSponsorCard";
import PreviousSponsorCard from "../../(Navigation)/(Admin)/UI/PreviousSponsorCard";

export default function SponsorManagerPage() {
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

	const [currentSponsors, setCurrentSponsors] = useState(
		initialCurrentSponsors,
	);

	const [previousSponsors, setPreviousSponsors] = useState([
		{ id: 3, name: "Name" },
		{ id: 4, name: "Name" },
		{ id: 5, name: "Name" },
	]);

	const [isAddSponsorModalOpen, setIsAddSponsorModalOpen] = useState(false);
	const [editingSponsorId, setEditingSponsorId] = useState(null);

	const [newSponsor, setNewSponsor] = useState({
		name: "",
		eventSponsored: "",
		description: "",
	});

	const handleSponsorFieldChange = (event) => {
		const { name, value } = event.target;
		setNewSponsor((previous) => ({
			...previous,
			[name]: value,
		}));
	};

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

	const handleDeletePreviousSponsor = (sponsorId) => {
		setPreviousSponsors((previous) =>
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

	const handleAddSponsor = (event) => {
		event.preventDefault();

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

		closeAddSponsorModal();
	};

	return (
		<div className="min-h-screen bg-[#f0ece1] flex flex-col font-sans">
			<Header />

			<main className="flex-1 flex flex-col items-center py-12 px-6 md:px-8">
				{/* Page Header */}
				<div className="w-full max-w-4xl mx-auto mb-8 flex flex-col items-center">
					<div className="flex items-center w-full justify-between mb-2">
						<hr className="flex-1 border-t border-[#556B2F] mx-4" />
						<h1 className="text-3xl font-serif font-bold text-[#556B2F] tracking-wide">
							SPONSORS
						</h1>
						<hr className="flex-1 border-t border-[#556B2F] mx-4" />
					</div>
				</div>

				{/* Current Sponsors Section */}
				<section className="w-full max-w-4xl mb-16">
					<div className="flex items-center justify-center gap-3 mb-8">
						<h2 className="text-2xl font-semibold underline text-[#2a2420]">
							Current Sponsors
						</h2>
						<button
							type="button"
							aria-label="Add current sponsor"
							className="w-8 h-8 rounded-full bg-[#556B2F] flex items-center justify-center hover:bg-[#6b8e23] focus:outline-none text-white"
							onClick={() => setIsAddSponsorModalOpen(true)}
						>
							<Plus size={16} strokeWidth={3} />
						</button>
					</div>

					<div className="flex flex-col gap-8 items-center">
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

				{/* Divider */}
				<div className="w-full max-w-4xl h-px bg-[#556B2F] mb-16"></div>

				{/* Previous Sponsors Section */}
				<section className="w-full max-w-4xl mb-16">
					<h2 className="text-2xl font-semibold text-center mb-8 underline text-[#2a2420]">
						Previous Sponsors
					</h2>
					<div className="flex flex-wrap justify-center gap-6">
						{previousSponsors.map((sponsor) => (
							<PreviousSponsorCard
								key={sponsor.id}
								sponsor={sponsor}
								onDelete={handleDeletePreviousSponsor}
							/>
						))}
					</div>
				</section>

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
								<div className="mx-auto flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-200">
									<Image
										src="/pasoc_logo.png"
										alt="PASOC logo placeholder"
										width={96}
										height={96}
										className="object-contain"
									/>
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

			<Footer />
		</div>
	);
}
