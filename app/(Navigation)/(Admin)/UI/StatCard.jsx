export function StatCard({ label, sublabel, value }) {
	return (
		<div className="flex-1 border-2 border-[#556B2F] rounded-2xl bg-white px-10 py-8 mx-auto flex flex-col items-center max-w-md shadow-sm w-full">
			<span
				className="text-xl text-[#556B2F] mb-1"
				style={{ fontFamily: "var(--font-serif)" }}
			>
				{label}
			</span>
			{sublabel && (
				<span
					className="text-sm text-[#556B2F]/70 mb-3"
					style={{ fontFamily: "var(--font-serif)" }}
				>
					{sublabel}
				</span>
			)}
			<span
				className="text-4xl font-bold text-[#1a1a1a] mt-1"
				style={{ fontFamily: "var(--font-serif)" }}
			>
				{value}
			</span>
		</div>
	);
}