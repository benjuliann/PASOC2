"use client";

import { HeroSection } from "@/app/(Navigation)/(Members)/UI/HeroSection";

export default function Motion() {

    return (
        <main>
            {/* HERO */}
            <HeroSection
                title="PASOC in Motion"
                description="Here are some Pangasinanese projects that we’ve been up to. Wanna help fund our projects?"
            />
            {/* MOTION */}
            <section className="bg-neutral-100 py-24 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col gap-6" onClick={() => router.push('/About')}>
                    <h2 className="text-4xl font-bold text-neutral-900">
                    Event Recap
                    </h2>
                    <p className="text-neutral-700 leading-relaxed text-lg">
                    Event description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien augue. Donec in nunc sed enim efficitur efficitur. Donec eget ligula a enim efficitur efficitur.
                    </p>
                </div>

                <div className="w-full h-[420px] rounded-2xl bg-gray-300 shadow-[0_20px_50px_rgba(0,0,0,0.08)]" />
                </div>
            </section>
        </main>
    );
}