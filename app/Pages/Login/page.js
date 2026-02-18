"use client";
import Link from "next/link";

export default function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="h-screen bg-[#F4EFE7] relative overflow-hidden">
      
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

      <div className="h-screen px-4 flex justify-center items-center">
        <div className="w-full max-w-[560px] flex flex-col items-center scale-90">
          
          {/* PASOC Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/59857bbe636f97ab4cebcfbc3ad030ee40910eb4?placeholderIfAbsent=true&apiKey=fbbee8c7a138402fba2a2964fb2f753d"
              alt="PASOC Logo"
              className="w-[360px] max-w-[85vw] mb-6"
            />
          </Link>

          {/* LOGIN Title */}
          <div className="text-center mb-6">
            <h1 className="font-serif text-4xl text-[#556B2F] tracking-wide">
              LOGIN
            </h1>
            <div className="mx-auto mt-2 h-[2px] w-24 bg-[#556B2F]/60" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="w-full max-w-[460px] space-y-6">

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-center text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/50"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-xl border border-black/25 bg-white px-5 py-3 text-center text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/50"
              />

              {/* Remember + Forgot Password */}
              <div className="flex items-center justify-between text-xs text-black/70">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#556B2F]" />
                  Remember me
                </label>

                <a href="#" className="hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-7 w-full max-w-[300px] bg-[#7E9A45] text-white py-3 rounded-xl shadow-md hover:brightness-95 transition"
            >
              Log In
            </button>

            {/* Sign up */}
            <a
              href="#"
              className="mt-4 text-sm text-blue-700 font-semibold hover:underline"
            >
              Sign Up
            </a>

            {/* Divider */}
            <div className="mt-6 w-full max-w-[520px] flex items-center gap-3">
              <div className="flex-1 h-px bg-black/20" />
              <span className="text-xs text-black/60">or log in with</span>
              <div className="flex-1 h-px bg-black/20" />
            </div>

            {/* Social Buttons */}
            <div className="mt-6 flex gap-6">
              <SocialBox>
                <img src="/facebook.svg" className="h-6 w-6" alt="Facebook" />
              </SocialBox>

              <SocialBox>
                <img src="/google.svg" className="h-6 w-6" alt="Google" />
              </SocialBox>

              <SocialBox>
                <img src="/apple.svg" className="h-6 w-6" alt="Apple" />
              </SocialBox>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function SocialBox({ children }) {
  return (
    <button className="h-14 w-20 rounded-xl border border-[#556B2F]/70 bg-white shadow-sm hover:bg-white/70 transition flex items-center justify-center text-lg font-semibold">
      {children}
    </button>
  );
}