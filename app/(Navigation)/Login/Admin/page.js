"use client";

import Link from "next/link";
import { useState } from "react";
import { Divider } from "../Membership/components/FormUI";
import LoginPageTemp from "../components/LoginPageTemp";
import InputFields from "../components/InputFields";
import PasswordField from "../components/PasswordField";
import LoginSubmitButton from "../components/LoginSubmitButton";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!email.includes("@") || (!email.includes("."))) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form valid, submit login");
    }
  };

  return (
    <LoginPageTemp backHref="/">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="font-serif text-4xl text-[#556B2F] tracking-wide">
          ADMIN LOGIN
        </h1>

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
          <InputFields
            type="email"
            placeholder="Admin Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
            error={errors.email}
          />

          <PasswordField
            placeholder="Admin Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: "" });
            }}
            error={errors.password}
          />

          <div className="flex items-center justify-end text-xs text-black/70">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>

        <LoginSubmitButton>
          Access Admin Portal
        </LoginSubmitButton>
      </form>
    </LoginPageTemp>
  );
}

AdminLoginPage.noLayout = true;