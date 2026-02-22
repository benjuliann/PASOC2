"use client";
import Link from "next/link";
import { useState } from "react";

export default function MembershipPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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

            <p className="text-center text-black mt-2 text-sm sm:text-base max-w-xl mx-auto">
              One-time membership fee of: <br />
              Adults (18+): $5.00 <br /> 
              Youth (under 18): $2.50 <br />
            </p>

          <h2 className="text-center text-[#556B2F] font-serif text-xl mt-4">
            Member Information
          </h2>

          <div className="mx-auto mt-3 h-[2px] w-32 bg-[#556B2F]/60" />

          {/* Form fields for Names & Birthday*/}
          <form className="mt-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-[#556B2F]/80">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
               </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-[#556B2F]/80">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
               </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-[#556B2F]/80">
                  Preferred Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="If different from first name"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
               </div>

               <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-[#556B2F]/80">
                  Birthday
                </label>
                <input
                  type="text"
                  placeholder="MM/DD/YYYY"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
               </div>
            </div>

            <div className="mx-auto mt-3 h-px w-full bg-[#556B2F]/60" />
            
              {/* Form fields for Address */}
            <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-[#556B2F]/80">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
             </div>
             
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-[#556B2F]/80">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-[#556B2F]/80">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="Postal Code (eg. A1A 1A1)"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
              </div>
            </div>

            <div className="mx-auto mt-3 h-px w-full bg-[#556B2F]/60" />

            {/* Form fields for Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-[#556B2F]/80">
                  Email Address
                </label>
                <input
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
               </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-[#556B2F]/80">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => SetPhone(e.target.value)}
                  className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/30"
                />
               </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7E9A45] text-white py-3 rounded-xl shadow-md hover:brightness-95 transition"
            >
              Submit Membership Info
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}