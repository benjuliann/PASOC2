"use client";

import { HeroSection } from "@/app/(Navigation)/(Members)/UI/HeroSection";
import { useUserAuth } from "../../../_utils/auth-context";
import { DeletionConfirmation } from "../UI/DeletionConfirmation";
import { useState, useEffect } from "react";

async function getMemberInfo(userID) {
  try {
    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(
      `${baseURL}/api/Database/MemberInfo?uid=${userID}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch member info");
    }

    const data = await res.json();

    return data.data?.[0] || null;
  } catch (error) {
    console.error("Member info fetch error:", error);
    return null;
  }
}

export default function Profile() {
  const { user, firebaseSignOut } = useUserAuth();
  const [member, setMember] = useState(null);
  const [deletionClicked, setDeletionClicked] = useState(false);

  useEffect(() => {
    async function fetchMember() {
      if (!user?.uid) {
        setMember(null);
        return;
      }

      const memberData = await getMemberInfo(user.uid);
      setMember(memberData);
    }

    fetchMember();
  }, [user]);
  

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const profileImageSize = isMobile ? 100 : 150;

  return (
    <main>
      <HeroSection
        title="Your Profile"
        description="View and manage your profile information, including your name, email, and membership details. Update your preferences and stay connected with the PASOC community."
      />

      {user ? (
        <>
          <section className="flex flex-col md:flex-row gap-8 px-6 py-12 max-w-8xl mx-auto">
            <div className="mx-auto w-1/2 bg-neutral-200 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <h2 className="text-xl font-semibold text-center underline text-black">
                Profile Information
              </h2>
              <p className="text-lg text-black">
                Name: {member?.name || "Loading..."} <br />
                Email: {member?.email || user.email || "Loading..."} <br />
                Date of Birth: {member?.dateOfBirth || "Loading..."} <br />
                Address: {member?.address || "Loading..."} <br />
                Postal Code: {member?.postalCode || "Loading..."} <br />
                Primary Phone: {member?.primaryPhone || "Loading..."} <br />
              </p>
            </div>
          </section>

          <section>
            <div className="w-1/2 mx-auto">
              <h2 className="text-xl font-semibold text-center underline text-black">
                Edit Profile Information
              </h2>
              <form className="flex flex-col gap-4 mt-6">
                <section className="w-full flex flex-row items-center gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/50"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/50"
                  />
                </section>

                <input
                  type="text"
                  placeholder="Preferred Name"
                  className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/50"
                />

                <input
                  type="date"
                  placeholder="Birthday"
                  className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/50"
                />

                <input
                  type="text"
                  placeholder="Address"
                  className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/50"
                />

                <section className="w-full flex flex-row items-center gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/50"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-[#556B2F]/50"
                  />
                </section>

                <button
                  type="submit"
                  className="w-full bg-[#7E9A45] text-white py-3 rounded-lg shadow-md hover:brightness-95 transition"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </section>

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