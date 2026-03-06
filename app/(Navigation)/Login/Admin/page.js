"use client";

import Link from "next/link";
import { useState } from "react";
import { Divider } from "../Membership/components/FormUI";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-dvh bg-[#F4EFE7] relative overflow-y-auto md:overflow-hidden">
      {/* Back Arrow */}
      <Link href="/" className="absolute left-6 top-6">
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

      <div className="min-h-dvh px-4 flex justify-center items-center">
        <div className="w-full max-w-[560px] flex flex-col items-center scale-90">
          {/* PASOC Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/59857bbe636f97ab4cebcfbc3ad030ee40910eb4?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
              alt="PASOC Logo"
              className="w-[260px] sm:w-[320px] md:w-[360px] max-w-[85vw] mb-6"
            />
          </Link>

          {/* Title */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2">
              <h1 className="font-serif text-4xl text-[#556B2F] tracking-wide">
                ADMIN LOGIN
              </h1>
            </div>

            <Divider />

            <p className="mt-3 text-sm text-black/65">
              Internal access for authorized PASOC administrators
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center"
            noValidate
          >
            <div className="w-full max-w-[460px] space-y-5">
              <input
                type="email"
                placeholder="Admin Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-center text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/50"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-center text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/50"
              />

              <div className="flex items-center justify-between text-xs text-black/70">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                    className="accent-[#556B2F]"
                  />
                  Show password
                </label>

                <a href="#" className="hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="mt-7 w-full max-w-[300px] bg-[#556B2F] text-white py-3 rounded-xl shadow-md hover:brightness-95 transition"
            >
              Access Admin Portal
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

AdminLoginPage.noLayout = true;