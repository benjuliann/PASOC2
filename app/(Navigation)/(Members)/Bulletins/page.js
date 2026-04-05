"use client";

import { useRouter } from "next/navigation";
import { HeroSection } from "@/app/(Navigation)/(Members)/UI/HeroSection";

export default function Bulletin() {
	const router = useRouter();

	return (
		<main>
			{/* HERO */}
			<HeroSection
				title="Bulletins"
				description="Stay informed with the latest PASOC announcements and community updates."
			/>
			{/* BULLETIN */}
			<section className="bg-neutral-100 py-24 px-6">
				<div className="max-w-4xl mx-auto flex flex-col gap-6">
					<div
						className="flex flex-col gap-6 cursor-pointer"
						onClick={() => router.push("/About")}
					>
						<h2 className="text-4xl font-bold text-neutral-900">
							Bulletin Article
						</h2>
						<p className="text-neutral-700 leading-relaxed text-lg">
							Article. Lorem ipsum dolor sit amet, consectetur
							adipiscing elit. Donec vel sapien augue. Donec in
							nunc sed enim efficitur efficitur. Donec eget ligula
							a enim efficitur efficitur.
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
