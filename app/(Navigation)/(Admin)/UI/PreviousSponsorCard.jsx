import React from "react";
import Image from "next/image";

export default function PreviousSponsorCard({ sponsor, onDelete }) {
	return (
		<div className="w-36 md:w-44 p-5 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col items-center gap-3">
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
				className="self-end rounded-md bg-red-700 px-2 py-1 text-xs font-semibold text-white hover:bg-red-800"
			>
				Delete
			</button>
		</div>
	);
}
