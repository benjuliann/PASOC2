import React from "react";
import SponsorCard from "./CurrentSponsorCard";
import { FloatingButton } from "../../UI/FloatingButton";

export default function Sponsors() {
	// Mock data for current sponsors
	const currentSponsors = [
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

	// Mock data for previous sponsors
	const previousSponsors = [
		{ id: 3, name: "Name" },
		{ id: 4, name: "Name" },
		{ id: 5, name: "Name" },
	];

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
				<h2 className="text-2xl font-semibold text-center mb-8 underline text-gray-800">
					Current Sponsors
				</h2>
				<div className="flex flex-col gap-8 items-center">
					{currentSponsors.map((sponsor) => (
						<SponsorCard
							key={sponsor.id}
							sponsor={sponsor}
							isLarge={true}
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
					{previousSponsors.map((sponsor) => (
						<SponsorCard
							key={sponsor.id}
							sponsor={sponsor}
							isLarge={false}
						/>
					))}
				</div>
			</section>

			{/* Floating Button */}
			<FloatingButton />
		</main>
	);
}
