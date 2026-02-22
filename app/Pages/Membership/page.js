"use client";
import Link from "next/link";

export default function MembershipPage() {
  return (
    <main className="min-h-dvh bg-[#F4EFE7] relative overflow-y-auto md:overflow-hidden">
      <Link href="/" className="absolute left-6 top-6" aria-label="Go back">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#556B2F"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Link>

      <div className="min-h-dvh px-4 flex justify-center items-start md:items-center py-10">
        <div className="w-full max-w-[640px] bg-white/40 rounded-2xl p-6 sm:p-8 shadow-sm border border-black/10">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#556B2F] tracking-wide text-center">
            Membership Registration
          </h1>
          <div className="mx-auto mt-3 h-[2px] w-32 bg-[#556B2F]/60" />

          {/* Space for form*/}
        </div>
      </div>
    </main>
  );
}