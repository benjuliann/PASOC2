"use client";
import * as React from "react";
import { HeroSection } from "./UI/HeroSection.jsx";
import { FloatingButton } from "./UI/FloatingButton.jsx";
import Head from "next/head";

function App() {
	return (
		<div style={{ display: "flex", flexDirection: "column"}}>
			<Head>
        		<title>My page title</title>
				
      		</Head>
			<FloatingButton />
			<div className="flex flex-col">
				<HeroSection />
			</div>
		</div>
	);
}

export default App;
