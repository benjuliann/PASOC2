import React from "react";

export default function CurrentSponsorCard({ sponsor }) {
	return (
		<div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-row gap-8">
			{/* Sponsor Image/Logo Placeholder */}
			<div className="w-32 h-32 bg-gray-200 rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center shrink-0">
				<div className="text-gray-500">
					<svg
						className="w-8 h-8"
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
				<div className="text-lg text-gray-400 mt-1">
					Photo or Logo
				</div>
			</div>

			{/* Sponsor Information */}
			<div className="flex-1">
				<h3 className="font-bold text-gray-800 text-xl mb-2">
					{sponsor.name}
				</h3>

				<p className="text-sm text-gray-600 italic mb-3">
					Event Sponsored
				</p>

				<div className="bg-yellow-200 rounded-md p-3">
					<h4 className="font-semibold text-gray-800 mb-2">
						About Sponsor
					</h4>
					<p className="text-sm text-gray-700">
						{sponsor.description ||
							"Information about this sponsor will be displayed here."}
					</p>
				</div>
			</div>
		</div>
	);
}
