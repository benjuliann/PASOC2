"use client";

import { HeroSection } from "@/app/(Navigation)/(Members)/UI/HeroSection";
import { useUserAuth } from '../../../_utils/auth-context';

export default function Profile() {
    const { user, firebaseSignOut } = useUserAuth();
    return (
        <main>
            {/* HERO */}
            <HeroSection
                title="Your Profile"
                description="View and manage your profile information, including your name, email, and membership details. Update your preferences and stay connected with the PASOC community."
            />
            <section className="flex flex-col md:flex-row gap-8 px-6 py-12 max-w-8xl mx-auto">
                <div className="mx-auto w-1/2 bg-neutral-200 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                    <h2 className="text-xl font-semibold text-center underline text-black">Profile Information</h2>
                    <p className="text-lg text-black">
                        Name: {user?.displayName || "John Doe"} <br />
                        Email: {user?.email || "john.doe@example.com"} <br />
                        Membership Status: Active <br />
                        Join Date: January 1, 2020
                    </p>
                </div>
            </section>
            <section>
                <div className="w-1/2 mx-auto">
                    <h2 className="text-xl font-semibold text-center underline text-black">Edit Profile Information</h2>
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
                        > Save Changes</button>
                    </form>
                </div>
            </section>
            <section className="w-full flex flex-row gap-6 max-w-7xl mx-auto justify-between mt-12 border-t pt-12">
                <div className="md:w-1/2 mx-auto flex flex-col items-center gap-6">
                    <button
                        onClick={firebaseSignOut}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Sign Out
                    </button>
                </div>
            </section>
        </main>
    );
}