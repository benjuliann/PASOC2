"use client";

import { useState } from "react";

export default function GuestPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setForm({ name: "", email: "" });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4EFE7] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow border">
        <h1 className="text-2xl font-serif text-[#556B2F] text-center">
          Join as Guest
        </h1>

        {success && (
          <p className="text-green-600 text-center mt-3">
            ✅ Submitted! We'll reach out soon.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange("name")}
            required
            className="w-full p-3 rounded-xl border"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange("email")}
            required
            className="w-full p-3 rounded-xl border"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7E9A45] text-white py-3 rounded-xl"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}