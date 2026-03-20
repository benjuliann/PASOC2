"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

function CurrentSponsorCardReadOnly({ sponsor }) {
	return (
		<div className="w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
			<div className="flex flex-row gap-8">
				<div className="w-32 h-32 bg-gray-200 rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center shrink-0">
					<Image
						src="/pasoc_logo.png"
						alt="PASOC logo placeholder"
						width={96}
						height={96}
						className="object-contain"
					/>
				</div>

				<div className="flex-1">
					<h3 className="font-bold text-[#556B2F] text-xl mb-2">
						{sponsor.name}
					</h3>

					<div className="bg-yellow-200 rounded-md p-3">
						<h4 className="font-semibold text-gray-800 mb-2">
							Description:
						</h4>
						<p className="text-sm text-gray-700">
							{sponsor.description ||
								"Information about this sponsor will be displayed here."}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function PreviousSponsorCardReadOnly({ sponsor }) {
	return (
		<div className="w-36 md:w-44 p-5 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col items-center gap-3">
			<div className="w-20 h-20 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center shrink-0">
				<Image
					src="/pasoc_logo.png"
					alt="PASOC logo placeholder"
					width={64}
					height={64}
					className="object-contain"
				/>
			</div>

			<div className="text-center">
				<h3 className="font-bold text-[#556B2F] text-sm mb-1">
					{sponsor.name}
				</h3>
			</div>
		</div>
	);
}

export default function SponsorsPage() {
	const [currentSponsors, setCurrentSponsors] = useState([]);
	const [previousSponsors, setPreviousSponsors] = useState([]);

	useEffect(() => {
		const loadSponsors = async () => {
			try {
				const res = await fetch("/api/Database/sponsors", {
					cache: "no-store",
				});

				if (!res.ok) {
					console.error("Load failed:", await res.text());
					return;
				}

				const raw = await res.json();

				const allSponsors = raw.map((sponsor) => ({
					id: sponsor.id ?? sponsor.sponsorId,
					name: sponsor.name ?? sponsor.sponsorName ?? "",
					description:
						sponsor.description ?? sponsor.sponsorDescription ?? "",
					status:
						sponsor.status ?? sponsor.sponsorStatus ?? "current",
				}));

				setCurrentSponsors(
					allSponsors.filter(
						(sponsor) => sponsor.status === "current",
					),
				);
				setPreviousSponsors(
					allSponsors.filter(
						(sponsor) => sponsor.status === "previous",
					),
				);
			} catch (error) {
				console.error(error);
			}
		};

		loadSponsors();
	}, []);

	return (
		<div className="min-h-screen bg-[#f0ece1] flex flex-col font-sans">
			<main className="flex-1 flex flex-col items-center py-12 px-6 md:px-8">
				<div className="w-full max-w-4xl mx-auto mb-8 flex flex-col items-center">
					<div className="flex items-center w-full justify-between mb-2">
						<hr className="flex-1 border-t border-[#556B2F] mx-4" />
						<h1 className="text-3xl font-serif font-bold text-[#556B2F] tracking-wide">
							SPONSORS
						</h1>
						<hr className="flex-1 border-t border-[#556B2F] mx-4" />
					</div>
				</div>

				<section className="w-full max-w-4xl mb-16">
					<div className="flex items-center justify-center gap-3 mb-8">
						<h2 className="text-2xl font-semibold underline text-[#2a2420]">
							Current Sponsors
						</h2>
					</div>

					<div className="flex flex-col gap-8 items-center">
						{currentSponsors.map((sponsor) => (
							<CurrentSponsorCardReadOnly
								key={sponsor.id}
								sponsor={sponsor}
							/>
						))}
					</div>
				</section>

				<div className="w-full max-w-4xl h-px bg-[#556B2F] mb-16"></div>

				<section className="w-full max-w-4xl mb-16">
					<h2 className="text-2xl font-semibold text-center mb-8 underline text-[#2a2420]">
						Previous Sponsors
					</h2>
					<div className="flex flex-wrap justify-center gap-6">
						{previousSponsors.map((sponsor) => (
							<PreviousSponsorCardReadOnly
								key={sponsor.id}
								sponsor={sponsor}
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}
