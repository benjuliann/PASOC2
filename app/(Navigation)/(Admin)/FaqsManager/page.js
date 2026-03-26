import React from "react";
import { HeroSection } from "../UI/HeroSection.jsx";
import { FaqsManager } from "../UI/FaqsManager.jsx";

export default function FaqsPage() {
    return (
        <main>
            {/* Page Header */}
          <div className="w-full max-w-4xl mx-auto mb-8 flex flex-col items-center">
            <div className="flex items-center w-full justify-between mb-2">
              <hr className="flex-1 border-t border-[#556B2F] mx-4" />
              <h1 className="text-3xl font-serif font-bold text-[#556B2F] tracking-wide">
                FAQ MANAGER
              </h1>
              <hr className="flex-1 border-t border-[#556B2F] mx-4" />
            </div>
          </div>
            <FaqsManager />
        </main>
    );
}