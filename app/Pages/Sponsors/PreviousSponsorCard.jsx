import React from "react";

export default function PreviousSponsorCard({ sponsor }) {
	return (
		<div className="w-32 md:w-40 p-4 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col items-center gap-2">
			{/* Sponsor Image/Logo Placeholder */}
			<div className="w-16 h-16 bg-gray-200 rounded-lg border-2 border-gray-300 flex items-center justify-center shrink-0">
				<div className="text-gray-500">
					<svg
						className="w-6 h-6"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>

			{/* Sponsor Information */}
			<div className="text-center">
				<h3 className="font-bold text-green-700 text-sm mb-1">
					{sponsor.name}
				</h3>
			</div>
		</div>
	);
}
