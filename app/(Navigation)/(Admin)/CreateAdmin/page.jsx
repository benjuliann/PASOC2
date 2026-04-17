"use client";

import { useState } from "react";
import { auth } from "@/app/_utils/firebase";
import { useUserAuth } from "@/app/_utils/auth-context";

const ROLES = {
  SUPERADMIN: 1,
  ADMIN: 2,
  MEMBER: 3,
};

export default function CreateAdminPage() {
  const { roleId, loading: authLoading } = useUserAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    roleId: 2,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function setField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("You must be logged in first.");
      }

      if (roleId !== ROLES.SUPERADMIN) {
        throw new Error("Only super admins can create admin accounts.");
      }

      const token = await currentUser.getIdToken();

      const response = await fetch("/api/admin/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create admin account.");
      }

      setMessage(data.message || "Admin account created successfully.");

      setForm({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        password: "",
        roleId: 2,
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return <div className="max-w-2xl mx-auto p-6">Loading...</div>;
  }

  if (roleId !== ROLES.SUPERADMIN) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Create Admin Account</h1>
        <p className="text-sm text-red-600">
          Access denied. Only super admins can view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Create Admin Account</h1>
      <p className="mb-6 text-sm text-gray-600">
        Super admins can use this page to create a new admin account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">First Name</label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Last Name</label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
            placeholder="Enter last name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date of Birth</label>
          <input
            type="date"
            value={form.dateOfBirth}
            onChange={(e) => setField("dateOfBirth", e.target.value)}
            className="w-full border border-[#556B2F]/20 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7E9A45]/40"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Temporary Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white"
            placeholder="Enter temporary password"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Account Role</label>
          <select
            value={form.roleId}
            onChange={(e) => setField("roleId", Number(e.target.value))}
            className="w-full border border-[#556B2F]/20 bg-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7E9A45]/40"
          >
            <option value={2}>Admin</option>
            <option value={1}>Super Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-[#556B2F] text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-green-600">{message}</p>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}