"use client";
import * as React from "react";
import { HeroSection } from "./UI/HeroSection.jsx";
import SocialFunctions from "./UI/SocialFunctions.jsx";
import { FloatingButton } from "./UI/FloatingButton";
import { SponsorSection } from "./UI/SponsorSection.jsx";
import { NewsSection } from "./UI/NewsSection.jsx";
import ScholarsSection from "./UI/ScholarsSection.jsx";
import { GallerySection } from "./UI/GallerySection.jsx";

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
        <GallerySection />
			</div>
		</div>
	);
}

export default App;
