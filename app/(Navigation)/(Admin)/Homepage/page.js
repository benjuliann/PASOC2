"use client";

import { useRouter } from "next/navigation";
import { HeroSection } from "./(Navigation)/UI/HeroSection";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="w-full">

      {/* HERO */}
      <HeroSection
		title="Welcome back admin!"
		description="It is our pleasure to receive you in our new online office. May you find this visit interesting and informative. Join us today below, or stayed tuned by signing as a Guest!"
	  />

      {/* ABOUT */}
      <section className="bg-neutral-100 py-24 px-6" onClick={() => router.push('/Pages/About')}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold text-neutral-900">
              About Us
            </h2>
            <p className="text-neutral-700 leading-relaxed text-lg">
              Founded in 1988, PASOC fosters cultural pride, community service,
              and leadership among members of the Pangasinan and Filipino
              community in Calgary. Through annual celebrations, scholarships,
              and outreach initiatives, the organization builds lasting
              connections across generations.
            </p>
          </div>

          <div className="w-full h-[420px] rounded-2xl bg-gray-300 shadow-[0_20px_50px_rgba(0,0,0,0.08)]" />
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-white py-24 px-6 text-neutral-900">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <h2 className="text-3xl font-bold text-neutral-900">
            Latest News
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-neutral-100 p-8 rounded-2xl transition-all duration-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
              >
                <h3 className="text-xl font-semibold text-primary-600 mb-4">
                  2026 Scholarship Awardees
                </h3>
                <p className="text-neutral-700 text-base leading-relaxed mb-6">
                  Congratulations to this year’s recipients recognized for
                  academic excellence, leadership, and community involvement.
                </p>
                <span className="text-primary-600 font-semibold text-sm hover:underline cursor-pointer">
                  Read more →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHOLARSHIP FEATURE */}
      <section className="bg-primary-50 py-32 px-6 text-neutral-900">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
          <h2 className="text-4xl font-bold text-primary-700">
            Scholarship & Bursary Program
          </h2>

          <p className="text-neutral-700 text-lg leading-relaxed">
            PASOC supports students demonstrating academic achievement,
            leadership, and active community engagement. Applications are open
            to eligible candidates in Calgary and surrounding areas.
          </p>

          <button className="bg-[#556B2F] hover:bg-primary-700 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-sm">
            Learn More & Apply
          </button>
        </div>
      </section>

      {/* EVENTS */}
      <section className="bg-white py-24 px-6 text-neutral-900">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <h2 className="text-3xl font-bold text-neutral-900">
            Upcoming Events
          </h2>

          <div className="flex flex-col gap-6">
            {[
              { name: "Summer Picnic — Stampede Weekend", date: "July 2026" },
              { name: "Annual Camping Weekend", date: "August 2026" },
              { name: "Christmas Dinner & Dance", date: "December 2026" },
            ].map((event, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-neutral-100 px-8 py-6 rounded-xl"
              >
                <span className="text-lg font-medium text-neutral-900">
                  {event.name}
                </span>
                <span className="text-primary-600 font-semibold">
                  {event.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 py-36 px-6 text-neutral-900">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
          <h2 className="text-4xl font-bold">
            Join the PASOC Community
          </h2>

          <p className="text-lg opacity-90 leading-relaxed">
            Support our mission and experience meaningful cultural celebration,
            community engagement, and lifelong friendships.
          </p>

          <button className="bg-[#556B2F] text-white border border-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200">
            Become a Member
          </button>
        </div>
      </section>

    </main>
  );
}