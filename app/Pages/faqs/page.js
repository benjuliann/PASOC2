import { HeroSection } from "../../UI/HeroSection.jsx";
import FaqsCard from "./faqsCard.jsx";

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
			<section className="mx-auto mt-10 w-full max-w-4xl px-6 pb-16">
				<FaqsCard
					question="How can I become a PASOC member?"
					answers={[
						"Complete the membership form on the website.",
						"Submit the required membership fee.",
						"Wait for a confirmation email from the PASOC team.",
					]}
				/>
			</section>
		</main>
	);
}
