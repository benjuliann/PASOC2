import React from "react";
import { StatCard } from "../UI/StatCard";
import { ManagerTile } from "../UI/ManagerTile";

const stats = [
	{ label: "Annual Donations", value: "$ 9,999.99" },
	{ label: "Active Members", value: "250" },
];

const managerTiles = [
	{ label: "Member Manager", icon: "Users", href: "/MemberManager" },
    { label: "Donation Manager", icon: "Landmark", href: "/DonationManager" },
	{ label: "Event Manager", icon: "CalendarDays", href: "/EventManager" },
	{ label: "Gallery Manager", icon: "Image", href: "/GalleryManager" },
	{ label: "Sponsor Manager", icon: "Handshake", href: "/SponsorsManager" },
	{ label: "Reports", icon: "FolderCog", href: "/Reports" },
];

export default function AdminDashboard() {
	return (
		<main className="flex-1 flex flex-col items-center px-6 py-12">
            {/* Stats row */}
			<section className="w-full max-w-3xl">
				<div className="flex flex-wrap gap-6 justify-center">
					{stats.map((s) => (
						<StatCard key={s.label} label={s.label} value={s.value} />
					))}
				</div>
			</section>

			{/* Manager tiles */}
			<section className="w-full max-w-4xl mt-16 mb-8">
				<div className="grid grid-cols-3 md:grid-cols-6 gap-6">
					{managerTiles.map((t) => (
						<ManagerTile key={t.label} variant="compact" {...t} />
					))}
				</div>
			</section>
		</main>
	);
}