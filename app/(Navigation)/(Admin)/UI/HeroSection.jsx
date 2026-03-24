"use client";
import * as React from "react";
import Link from "next/link";

export function HeroSection({ title, description }) {
  const [showButtons, setShowButtons] = React.useState(false);

  React.useEffect(() => {
    // window is undefined on the server; only read it in the browser
    if (typeof window !== "undefined") {
      setShowButtons(window.location.pathname === "/");
    }
  }, []);

  return (
    <section className="relative flex flex-col w-full min-h-[300px] overflow-hidden">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/40671902fc11001c38c8e27b20ebb110846d19b4?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
        alt="PASOC community gathering"
        className="object-cover absolute inset-0 w-full h-full"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(132,164,77,1)_0%,_rgba(132,164,77,1)_10%,_rgba(132,164,77,0)_100%)] z-0" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 flex flex-col justify-center items-start">
        <h1 className="text-[70px] text-white m-0 font-serif leading-tight">{title}</h1>
      </div>
    </section>
  );
}