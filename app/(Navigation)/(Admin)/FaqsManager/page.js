import React from "react";
import { HelpCircle } from "lucide-react";
import { FaqsManager } from "../UI/FaqsManager.jsx";

export default function FaqsPage() {
    return (
        <main className="min-h-screen bg-[#f0ece1] font-sans">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-[#556B2F] text-white rounded-xl p-3">
                        <HelpCircle size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-serif text-[#556B2F]">FAQs</h1>
                        <p className="text-sm text-[#556B2F]/60 mt-0.5">FAQ Manager</p>
                    </div>
                </div>
                <FaqsManager />
            </div>
        </main>
    );
}