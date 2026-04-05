"use client";

import { HeroSection } from "@/app/(Navigation)/(Members)/UI/HeroSection";
import { useUserAuth } from "../../../_utils/auth-context";
import { DeletionConfirmation } from "../UI/DeletionConfirmation";
import { useState, useEffect } from "react";
import { validateField } from "../../../_utils/membershipFormValidators";
import { sanitizeByKey, toTitleCase } from "../../../_utils/membershipFormSanitizers";

async function getMemberInfo(user) {
  const token = await user.getIdToken();

  const res = await fetch("/api/Database/MemberInfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Failed to fetch member info");
  }

  return result.data?.[0] || null;
}

export default function Profile() {
  const { user, firebaseSignOut } = useUserAuth();

  const [member, setMember] = useState(null);
  const [deletionClicked, setDeletionClicked] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postalCode: "",
    primaryPhone: "",
  });

  const profileRequiredFields = new Set();

  function validateProfileField(key, value, currentForm) {
    const v = typeof value === "string" ? value.trim() : value;

    if (key === "name" && v) {
      const fullNameRegex = /^[A-Za-zÀ-ÿ' -]+$/;
      if (!fullNameRegex.test(v)) {
        return "Name can only contain letters, spaces, apostrophes, and hyphens.";
      }
    }

    if (key === "primaryPhone" && v) {
      const digits = String(v).replace(/\D/g, "");
      if (digits.length !== 10) {
        return "Enter a valid 10 digit phone number.";
      }
    }

    return validateField(key, value, currentForm, profileRequiredFields);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    let sanitizedValue = value;

    if (name === "name") {
      sanitizedValue = toTitleCase(value);
    } else {
      sanitizedValue = sanitizeByKey(name, value);
    }

    const nextForm = {
      ...formData,
      [name]: sanitizedValue,
    };

    setFormData(nextForm);

    const error = validateProfileField(name, sanitizedValue, nextForm);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!member?.uuid || !user) return;

    const newErrors = {
      name: validateProfileField("name", formData.name, formData),
      address: validateProfileField("address", formData.address, formData),
      postalCode: validateProfileField("postalCode", formData.postalCode, formData),
      primaryPhone: validateProfileField("primaryPhone", formData.primaryPhone, formData),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) return;

    setSaving(true);

    try {
      const token = await user.getIdToken();

      const res = await fetch("/api/Database/MemberInfo", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uuid: member.uuid,
          ...formData,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("PATCH error:", result);
        throw new Error(result.error || "Update failed");
      }

      const updatedMember = await getMemberInfo(user);
      setMember(updatedMember);
    } catch (error) {
      console.error("Profile update error:", error);
      alert(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    async function fetchMember() {
      if (!user) {
        setMember(null);
        return;
      }

      try {
        const memberData = await getMemberInfo(user);
        setMember(memberData);
      } catch (error) {
        console.error(error);
        setMember(null);
      }
    }

    fetchMember();
  }, [user]);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        address: member.address || "",
        postalCode: member.postalCode || "",
        primaryPhone: member.primaryPhone || "",
      });
    }
  }, [member]);

  const inputStyle =
    "w-full rounded-lg border bg-white px-4 py-2 text-sm text-black outline-none focus:ring-2 focus:ring-[#556B2F]/50";

  return (
    <main>
      <HeroSection
        title="Your Profile"
        description="View and manage your profile information, including your name, email, and membership details. Update your preferences and stay connected with the PASOC community."
      />

      {user ? (
        <>
          {/* PROFILE INFORMATION DISPLAY */}
          <section className="flex flex-col md:flex-row gap-8 px-6 py-12 max-w-8xl mx-auto">
            <div className="mx-auto w-1/2 bg-neutral-200 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <h2 className="text-xl font-semibold text-center underline text-black">
                Profile Information
              </h2>
              <p className="text-lg text-black">
                Name: {member?.name || "Loading..."} <br />
                Email: {member?.email || "Loading..."} <br />
                Date of Birth: {member?.dateOfBirth ? member.dateOfBirth.split('T')[0] : "Loading..."} <br />
                Address: {member?.address || "Loading..."} <br />
                Postal Code: {member?.postalCode || "Loading..."} <br />
                Primary Phone: {member?.primaryPhone || "Loading..."} <br />
              </p>
            </div>
          </section>

          {/* PROFILE EDITING */}
          <section>
            <div className="w-1/2 mx-auto">
              <h2 className="text-xl font-semibold text-center underline text-black">
                Edit Profile Information
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputStyle}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}

                <input
                  name="address"
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputStyle}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}

                <input
                  name="postalCode"
                  type="text"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={inputStyle}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                )}

                <input
                  name="primaryPhone"
                  type="text"
                  placeholder="Primary Phone"
                  value={formData.primaryPhone}
                  onChange={handleChange}
                  className={inputStyle}
                />
                {errors.primaryPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.primaryPhone}</p>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#7E9A45] text-white py-3 rounded-lg shadow-md hover:bg-[#7E9A45]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </section>

          {/* ACCOUNT SIGN OUT */}
          <section className="w-full flex flex-row gap-6 max-w-7xl mx-auto justify-between mt-12 border-t pt-12">
            <div className="md:w-1/2 mx-auto flex flex-col items-center gap-6">
              <button
                onClick={firebaseSignOut}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Sign Out
              </button>
            </div>
          </section>

          {/* ACCOUNT DELETION */}
          <section className="w-full flex flex-row gap-6 max-w-7xl mx-auto justify-between mt-12 border-t pt-12">
            <div className="md:w-1/2 mx-auto flex flex-col items-center gap-6">
              <p className="text-lg text-gray-700 text-center">
                Moving on from PASOC? We understand that circumstances change.
                If you wish to delete your account, please be aware that this
                action is irreversible and will permanently remove all your data
                from our system.
              </p>
              <button
                onClick={() => setDeletionClicked(true)}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete Account
              </button>
            </div>

            {deletionClicked && (
              <DeletionConfirmation
                onCancel={() => setDeletionClicked(false)}
              />
            )}
          </section>
        </>
      ) : (
        <section className="flex flex-col items-center gap-6 px-6 py-12 max-w-8xl mx-auto">
          <h2 className="text-xl font-semibold text-center text-black">
            Please log in to view your profile information.
          </h2>
        </section>
      )}
    </main>
  );
}