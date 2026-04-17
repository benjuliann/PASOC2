import React from "react";
import { Landmark } from "lucide-react";
import { DonationsManager } from "../UI/DonationsManager.jsx";

export default function DonationManagerPage() {
	return (
		<main className="min-h-screen bg-[#f0ece1] font-sans">
			<div className="max-w-7xl mx-auto px-6 py-12">
				<div className="flex items-center gap-4 mb-10">
					<div className="bg-[#556B2F] text-white rounded-xl p-3">
						<Landmark size={28} />
					</div>
					<div>
						<h1 className="text-3xl font-serif text-[#556B2F]">Donations</h1>
						<p className="text-sm text-[#556B2F]/60 mt-0.5">Donation Manager</p>
					</div>
				</div>
				<DonationsManager />
			</div>
		</main>
	);
}
