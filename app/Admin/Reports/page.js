"use client";
import React from "react";
import Link from "next/link";
import { Header } from "../../(Navigation)/(Admin)/UI/Header";
import { Footer } from "../../(Navigation)/(Admin)/UI/Footer";
import { Handshake, CheckCircle, Users, Landmark, CalendarDays } from "lucide-react";

const reportTiles = [
  { label: "Sponsor Reports", Icon: Handshake, href: "/Admin/Reports/Sponsor" },
  { label: "Attendence Reports", Icon: CheckCircle, href: "/Admin/Reports/Attendence" },
  { label: "Membership Reports", Icon: Users, href: "/Admin/Reports/Membership" },
  { label: "Donation Reports", Icon: Landmark, href: "/Admin/Reports/Donation" },
  { label: "Event Reports", Icon: CalendarDays, href: "/Admin/Reports/Event" },
];

function ReportTile({ label, Icon, href }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-4 text-center text-[#556B2F] font-semibold text-lg bg-white border-2 border-[#556B2F] rounded-2xl p-10 shadow-md hover:bg-[#f0ece1] transition-all duration-200"
      style={{ minWidth: 180 }}
    >
      <Icon size={48} strokeWidth={2} />
      <span>{label}</span>
    </Link>
  );
}

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#f0ece1] flex flex-col font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-6 mt-8 mb-8">
            <hr className="flex-1 border-[#556B2F] border-t-2" />
            <h2 className="text-3xl font-serif text-[#556B2F] text-center mx-4">REPORTS</h2>
            <hr className="flex-1 border-[#556B2F] border-t-2" />
          </div>
          <p className="text-center text-lg text-[#556B2F] mb-12">Select which type of report you would like to generate</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-4 md:gap-8 mt-8 sm:mt-16 md:mt-24 lg:flex lg:justify-center lg:gap-12 lg:mt-24">
            {reportTiles.map(tile => (
              <ReportTile key={tile.label} {...tile} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
