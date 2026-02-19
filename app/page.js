"use client";
import * as React from "react";
import { HeroSection } from "./UI/HeroSection.jsx";
import SocialFunctions from "./UI/SocialFunctions.jsx";
import { FloatingButton } from "./UI/FloatingButton";
import { SponsorSection } from "./UI/SponsorSection.jsx";
import { NewsSection } from "./UI/NewsSection.jsx";
import ScholarsSection from "./UI/ScholarsSection.jsx";
// import { SponsorSection } from "./Frontend/Home/SponsorSection";
// import { ScholarsSection } from "./Frontend/Home/ScholarsSection";
// import { GallerySection } from "./Frontend/Home/GallerySection";

function App() {
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<FloatingButton />
			<div className="flex flex-col">
				<HeroSection />
				<SocialFunctions />
				<SponsorSection />
				<NewsSection />
				<ScholarsSection />
			</div>
		</div>
	);
}

export default App;
