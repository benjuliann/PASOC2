import React from "react";
import Image from "next/image";

export default function FeaturedSponsorCard({
	sponsor,
	onDelete,
	onEdit,
	onMoveToPrevious,
}) {
	return (
		<div className="w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
			<div className="flex flex-row gap-8">
				{/* Sponsor Image/Logo Placeholder */}
				<div className="w-32 h-32 bg-gray-200 rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center shrink-0">
					<Image
						src="/pasoc_logo.png"
						alt="PASOC logo placeholder"
						width={96}
						height={96}
						className="object-contain"
					/>
				</div>

				{/* Sponsor Information */}
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

			<div className="mt-4 flex flex-wrap justify-end gap-2">
				<button
					type="button"
					onClick={() => onEdit(sponsor.id)}
					className="rounded-md bg-[#556B2F] px-3 py-1 text-sm font-semibold text-white hover:bg-[#6b8e23]"
				>
					Edit
				</button>
				<button
					type="button"
					onClick={() => onDelete(sponsor.id)}
					className="rounded-md bg-red-700 px-3 py-1 text-sm font-semibold text-white hover:bg-red-800"
				>
					Delete
				</button>
				<button
					type="button"
					onClick={() => onMoveToPrevious(sponsor.id)}
					className="rounded-md bg-gray-700 px-3 py-1 text-sm font-semibold text-white hover:bg-gray-800"
				>
					Move
				</button>
			</div>
		</div>
	);
}
