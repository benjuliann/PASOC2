import React from "react";
import { Landmark } from "lucide-react";
import { StatCard } from "../UI/StatCard";
import { ManagerTile } from "../UI/ManagerTile";

const donationTiles = [
	{
		label: "Donation Records",
		icon: "FileText",
		href: "/Admin/DonationsManager/Records",
	},
	{
		label: "In Person Donation",
		icon: "UserPlus",
		href: "/Admin/DonationsManager/InPerson",
	},
	{
		label: "Donation Receipts",
		icon: "Receipt",
		href: "/Admin/DonationsManager/Receipts",
	},
	{
		label: "Manage Donations",
		icon: "FolderCog",
		href: "/Admin/DonationsManager/Manage",
	},
];

export default function DonationManagerPage() {
	return (
		<main className="min-h-screen bg-[#f0ece1] font-sans">
			<div className="max-w-7xl mx-auto px-6 py-12">
				{/* Header */}
				<div className="flex items-center gap-4 mb-10">
					<div className="bg-[#556B2F] text-white rounded-xl p-3">
						<Landmark size={28} />
					</div>
					<div>
						<h1 className="text-3xl font-serif text-[#556B2F]">Donations</h1>
						<p className="text-sm text-[#556B2F]/60 mt-0.5">Donation Manager</p>
					</div>
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
						<ManagerTile
							key={tile.label}
							variant="compact"
							{...tile}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
