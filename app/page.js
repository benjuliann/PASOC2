"use client";
import * as React from "react";
import { HeroSection } from "./UI/HeroSection.jsx";
import SocialFunctions from "./UI/SocialFunctions.jsx";
// import { SponsorSection } from "./Frontend/Home/SponsorSection";
// import { NewsSection } from "./Frontend/Home/NewsSection";
// import { ScholarsSection } from "./Frontend/Home/ScholarsSection";
// import { GallerySection } from "./Frontend/Home/GallerySection";
// import { FloatingButton } from "./Frontend/FloatingButton";

function App() {
	return (
		<div style={{ display: "flex", flexDirection: "column"}}>
			<FloatingButton />
			<div className="flex flex-col">
				<HeroSection />
				<SocialFunctions />
			</div>
		</div>
	);
}

export default App;
