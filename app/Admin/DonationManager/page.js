"use client";
import React from "react";
import Link from "next/link";
import { Header } from "../../(Navigation)/(Admin)/UI/Header";
import { Footer } from "../../(Navigation)/(Admin)/UI/Footer";
import { Landmark, FileText, UserPlus, Receipt, FolderCog } from "lucide-react";

const donationTiles = [
  { label: "Donation Records", Icon: FileText, href: "/Admin/DonationManager/Records" },
  { label: "In Person Donation", Icon: UserPlus, href: "/Admin/DonationManager/InPerson" },
  { label: "Donation Receipts", Icon: Receipt, href: "/Admin/DonationManager/Receipts" },
  { label: "Manage Donations", Icon: FolderCog, href: "/Admin/DonationManager/Manage" },
];

function DonationStatCard() {
  return (
    <div className="border-2 border-[#556B2F] rounded-2xl bg-white px-12 py-10 mx-auto flex flex-col items-center max-w-md shadow-md">
      <span className="text-2xl font-serif text-[#556B2F] mb-2">Annual Donations</span>
      <span className="text-lg font-serif text-[#556B2F] mb-2">Progress</span>
      <span className="text-4xl font-bold text-black mt-2">$ 9999.99</span>
    </div>
  );
}

function DonationTile({ label, Icon, href }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-4 text-center text-[#556B2F] font-semibold text-lg bg-white border-2 border-[#556B2F] rounded-2xl p-8 shadow-md hover:bg-[#f0ece1] transition-all duration-200"
      style={{ minWidth: 180 }}
    >
      <Icon size={48} strokeWidth={2} />
      <span>{label}</span>
    </Link>
  );
}

export default function DonationManagerPage() {
  return (
    <div className="min-h-screen bg-[#f0ece1] flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-6 mt-8 mb-12">
            <hr className="flex-1 border-[#556B2F] border-t-2" />
            <h2 className="text-3xl font-serif text-[#556B2F] text-center mx-4">DONATION MANAGER</h2>
            <hr className="flex-1 border-[#556B2F] border-t-2" />
          </div>
          <DonationStatCard />
          <div className="flex justify-center gap-12 mt-16">
            {donationTiles.map(tile => (
              <DonationTile key={tile.label} {...tile} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
