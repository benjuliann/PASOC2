import { HeroSection } from "../../UI/HeroSection.jsx";

export default function FAQsPage() {
	return (
		<main>
			<HeroSection
				heading={
					<span style={{ display: "inline-block", marginTop: 50 }}>
						Frequently Asked Questions
					</span>
				}
				greeting=""
				showButtons={false}
			/>
		</main>
	);
}
