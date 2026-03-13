"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

export default function PasswordField({
  placeholder = "Password",
  value,
  onChange,
  error = "",
  showError = true,
  children,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative">

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl border bg-white px-5 py-3 pr-12 text-left text-sm text-neutral-800 outline-none focus:ring-2 pr-14
          ${
            showError && error
              ? "border-red-400 focus:ring-red-200"
              : "border-black/25 focus:ring-[#556B2F]/50"
          }`}
        />

        {/* Eye button */}
        <button
          type="button"
          aria-label="Show password"
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
          onTouchStart={() => setShowPassword(true)}
          onTouchEnd={() => setShowPassword(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#556B2F]"
        >
          <Eye size={18} />
        </button>

      </div>

      {showError && error && (
        <p className="text-red-600 text-xs mt-2 text-center">
          {error}
        </p>
      )}

      {children}
    </div>
  );
}