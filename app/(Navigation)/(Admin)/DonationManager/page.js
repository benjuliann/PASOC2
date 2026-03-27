import React from "react";
import { StatCard } from "../UI/StatCard";
import { ManagerTile } from "../UI/ManagerTile";

const donationTiles = [
	{ label: "Donation Records", icon: "FileText", href: "/Admin/DonationManager/Records" },
	{ label: "In Person Donation", icon: "UserPlus", href: "/Admin/DonationManager/InPerson" },
	{ label: "Donation Receipts", icon: "Receipt", href: "/Admin/DonationManager/Receipts" },
	{ label: "Manage Donations", icon: "FolderCog", href: "/Admin/DonationManager/Manage" },
];

export default function DonationManagerPage() {
	return (
		<main className="flex-1 flex flex-col items-center px-6 py-12">
			<div className="w-full max-w-4xl mx-auto">
				{/* Section heading */}
				<div className="flex items-center gap-4 mb-10">
					<hr className="flex-1 border-t-2 border-[#556B2F]" />
					<h2
						className="text-2xl text-[#556B2F] text-center shrink-0"
						style={{ fontFamily: "var(--font-serif)" }}
					>
						Donation Manager
					</h2>
					<hr className="flex-1 border-t-2 border-[#556B2F]" />
				</div>

				{/* Stat */}
				<StatCard
					label="Annual Donations"
					sublabel="Current year"
					value="$ 9,999.99"
				/>

				{/* Compact nav tiles */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
					{donationTiles.map((tile) => (
						<ManagerTile key={tile.label} variant="compact" {...tile} />
					))}
				</div>
			</div>
		</main>
	);
}