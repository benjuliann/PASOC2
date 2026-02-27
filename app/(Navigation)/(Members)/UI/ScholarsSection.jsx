import React from "react";

const ScholarsSection = () => {
	// Scholar data
	const scholars = [
		{ id: 1, name: "Scholar Name" },
		{ id: 2, name: "Scholar Name" },
		{ id: 3, name: "Scholar Name" },
		{ id: 4, name: "Scholar Name" },
		{ id: 5, name: "Scholar Name" },
		{ id: 6, name: "Scholar Name" },
	];

	// Book icon component as placeholder
	const BookIcon = () => (
		<svg
			className="w-16 h-16 mx-auto mb-2 text-gray-600"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M12 2L3 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-9-5z" />
			<path d="M9 12l2 2 4-4" />
		</svg>
	);

	// Student reading icon as placeholder
	const StudentIcon = () => (
		<svg
			className="w-16 h-16 mx-auto mb-2 text-gray-700"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
			/>
		</svg>
	);

	return (
		<section className="py-16 px-4 bg-f5f5f4 mt-8 relative">
			<div className="max-w-6xl mx-auto text-center">
				{/* Title */}
				<h2 className="text-4xl font-bold text-gray-800 mb-8">
					2026 Scholarship Awardees
				</h2>

				{/* Congratulatory text */}
				<p className="text-lg text-gray-700 mb-12">
					Congrats to 2026 Scholars!
				</p>

				{/* Scholars flexbox */}
				<div className="flex flex-wrap justify-center gap-6 mb-12 rounded-xl border-b-[3px] border-zinc-800 px-3 pb-4.5 pt-2 bg-[#f5f5f4]">
					{scholars.map((scholar) => (
						<div
							key={scholar.id}
							className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 shrink-0 w-40"
						>
							{/* Icon placeholder */}
							<StudentIcon />
							{/* Scholar name */}
							<h3 className="text-sm font-medium text-gray-800 mt-2">
								{scholar.name}
							</h3>
						</div>
					))}
				</div>

				{/* Description */}
				<div className="text-left max-w-4xl mx-auto rounded-xl border-b-[3px] border-zinc-800 px-3 pb-4.5 pt-2 bg-[#f5f5f4]">
					<p className="text-gray-700 leading-relaxed">
						The Pangasinan Society of Calgary (PASOC) offers
						scholarship to children (General Public) who are now
						enrolled or are planning to enroll in any post secondary
						school in Calgary.
					</p>
					<br />
					<p className="text-gray-700 leading-relaxed">
						Academic achievement and financial needs are the main
						criteria of this award; however, consideration is given
						to applicant&apos;s community involvement,
						extra-curricular activities, leadership skills,
						character integrity, motivational and personal goals.
					</p>
				</div>
			</div>
		</section>
	);
};

export default ScholarsSection;
