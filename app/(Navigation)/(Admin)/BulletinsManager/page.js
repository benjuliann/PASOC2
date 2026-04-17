import React from "react";
import { Newspaper } from "lucide-react";
import { BulletinManager } from "../UI/BulletinsManager.jsx";

export default function BulletinManagerPage() {
	return (
		<main className="min-h-screen bg-[#f0ece1] font-sans">
			<div className="max-w-7xl mx-auto px-6 py-12">
				{/* Header */}
				<div className="flex items-center gap-4 mb-10">
					<div className="bg-[#556B2F] text-white rounded-xl p-3">
						<Newspaper size={28} />
					</div>
					<div>
						<h1 className="text-3xl font-serif text-[#556B2F]">Bulletins</h1>
						<p className="text-sm text-[#556B2F]/60 mt-0.5">Bulletin Manager</p>
					</div>
				</div>
				<BulletinManager />
			</div>
		</main>
	);
}