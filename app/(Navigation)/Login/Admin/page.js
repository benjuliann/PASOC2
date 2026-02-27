"use client";
import Link from "next/link";
import { useState } from "react";
import { useUserAuth } from '../../_utils/auth-context';

export default function LoginPage() {
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { user, emailSignIn, googleSignIn, facebookSignIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    // Simple email format check
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    // If everything is fine, clear the error and proceed (e.g., redirect to dashboard)
    setError("");
    try {
      await emailSignIn(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
    } catch (err) {
      setError(err.message);
    }
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

          {/* LOGIN Title */}
          <div className="text-center mb-6">
            <h1 className="font-serif text-4xl text-[#556B2F] tracking-wide">
              LOGIN
            </h1>
            <div className="mx-auto mt-2 h-[2px] w-24 bg-[#556B2F]/60" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
          noValidate>
            <div className="w-full max-w-[460px] space-y-6">

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(""); // Clear error when user starts typing
                }} 
                className={`w-full rounded-xl border bg-white px-5 py-3 text-center text-sm text-neutral-800 outline-none focus:ring-2
                    ${error ? "border-red-400 focus:ring-red-200" : "border-black/25 focus:ring-[#556B2F]/50"}
                    `}              
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className={`w-full rounded-xl border bg-white px-5 py-3 text-center text-sm text-neutral-800 outline-none focus:ring-2
                    ${error ? "border-red-400 focus:ring-red-200" : "border-black/25 focus:ring-[#556B2F]/50"}
                    `}
              />

              {error && (
                <div className="rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm px-4 py-2 text-center">
                  {error}
                </div>
              )}

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
          </form>

          {/* Social Buttons */}
          <div className="mt-6 flex gap-6">
            <button onClick={handleFacebookSignIn} className="h-14 w-20 rounded-xl border border-[#556B2F]/70 bg-white shadow-sm hover:bg-white/70 transition flex items-center justify-center text-lg font-semibold">
              <img src="/facebook.svg" className="h-6 w-6" alt="Facebook" />
            </button>

            <button onClick={handleGoogleSignIn} className="h-14 w-20 rounded-xl border border-[#556B2F]/70 bg-white shadow-sm hover:bg-white/70 transition flex items-center justify-center text-lg font-semibold">
              <img src="/google.svg" className="h-6 w-6" alt="Google" />
            </button>

            <SocialBox>
              <img src="/apple.svg" className="h-6 w-6" alt="Apple" />
            </SocialBox>
          </div>
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

LoginPage.noLayout = true; // This tells the RootLayout to not render the Header and Footer for this page.