import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function OverTheYearsSponsorCard({ sponsor, onDelete }) {
	return (
		<div className="relative w-36 md:w-44 p-5 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col items-center gap-3">
			{/* Sponsor Image/Logo Placeholder */}
			<div className="w-20 h-20 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center shrink-0">
				<Image
					src="/pasoc_logo.png"
					alt="PASOC logo placeholder"
					width={64}
					height={64}
					className="object-contain"
				/>
			</div>

			{/* Sponsor Information */}
			<div className="text-center">
				<h3 className="font-bold text-[#556B2F] text-sm mb-1">
					{sponsor.name}
				</h3>
			</div>
			<button
				type="button"
				onClick={() => onDelete(sponsor.id)}
				className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-700 flex items-center justify-center hover:bg-red-800 text-white"
				aria-label="Delete sponsor"
			>
				<X size={16} strokeWidth={2.5} />
			</button>
		</div>
	);
}
