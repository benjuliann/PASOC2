import React from "react";
import { HeroSection } from "../UI/HeroSection.jsx";
import { FaqsManager } from "../UI/FaqsManager.jsx";

export default function FaqsPage() {
	return (
		<main>
			<HeroSection
				title="Frequently Asked Questions"
				showButtons={false}
			/>
			<FaqsManager />
		</main>
	);
}
