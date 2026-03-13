"use client";
import Link from "next/link";
import { useState } from "react";
import { useUserAuth } from '../../../_utils/auth-context';
import { useRouter } from "next/navigation";

import LoginPageTemp from "../components/LoginPageTemp";
import InputFields from "../components/InputFields";
import PasswordField from "../components/PasswordField";
import LoginSubmitButton from "../components/LoginSubmitButton";
import SocialLoginButtons from "../components/SocialLoginButtons";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { emailSignIn, googleSignIn, facebookSignIn } = useUserAuth();
  const [loading, setLoading] = useState(false); // Prevent multiple clicks on login button while processing

  // User friendly error messages converted from firebase error codes
  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/user-not-found":; 
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Incorrect email or password. Please try again.";

      case "auth/too-many-requests":
        return "Too many failed login attempts. Please try again later.";

      case "auth/network-request-failed":
        return "Network error. Please check your connection and try again.";

      case "auth/popup-closed-by-user":
        return "Login popup closed before completing. Please try again.";
        
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevents resubmission if already processing
    if (loading) return;

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    // Simple email format check
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    // If everything is fine, clear the error and proceed (e.g., redirect to dashboard)
    setError("");
    setLoading(true);

    try {
      await emailSignIn(email, password);
      router.push('/');
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;

    setError("");
    setLoading(true);
    try {
      await googleSignIn();
      router.push('/');
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    if (loading) return;

    setError("");
    setLoading(true);
    try {
      await facebookSignIn();
      router.push('/');
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageTemp backHref="/">
      {/* LOGIN Title */}
      <div className="text-center mb-6">
        <h1 className="font-serif text-4xl text-[#556B2F] tracking-wide">
          LOGIN
        </h1>
        <div className="mx-auto mt-2 h-[2px] w-24 bg-[#556B2F]/60" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
        noValidate
      >
        <div className="w-full max-w-[460px] space-y-6">
          <InputFields
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(""); // Clear error when user starts typing
            }}
          />

          <PasswordField
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
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

        <LoginSubmitButton loading={loading} loadingText="Logging in...">
          Log In
        </LoginSubmitButton>

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

      <SocialLoginButtons
        onFacebook={handleFacebookSignIn}
        onGoogle={handleGoogleSignIn}
        disabled={loading}
      />
    </LoginPageTemp>
  );
}

LoginPage.noLayout = true; // This tells the RootLayout to not render the Header and Footer for this page.