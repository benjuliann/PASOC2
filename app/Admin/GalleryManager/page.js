"use client";
import React from "react";
import { Header } from "../../(Navigation)/(Admin)/UI/Header";
import { Footer } from "../../(Navigation)/(Admin)/UI/Footer";

export default function GalleryManagerPage() {
  return (
    <div className="min-h-screen bg-[#f0ece1] flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-[#556B2F]">Gallery Manager</h1>
        <p className="mt-4 text-lg text-[#556B2F]">This is the Gallery Manager page.</p>
      </main>
      <Footer />
    </div>
  );
}
