"use client";
import * as React from "react";
import { HeroSection } from "./UI/HeroSection.jsx";
import { FloatingButton } from "./UI/FloatingButton.jsx";

function App() {
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<form action="/FAQs">
				<FloatingButton />
			</form>
			<div className="flex flex-col">
				<HeroSection />
			</div>
		</div>
	);
}

export default App;
