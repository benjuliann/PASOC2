"use client";
import React from "react";
import Link from "next/link";
import { Handshake, CheckCircle, Users, Landmark, CalendarDays, FolderCog } from "lucide-react";

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
      className="flex flex-col items-center gap-3 text-center text-[#556B2F] font-semibold text-base sm:text-lg bg-white border-2 border-[#556B2F] rounded-2xl p-6 sm:p-8 md:p-10 shadow-md hover:bg-[#f0ece1] transition-all duration-200 w-full"
    >
      <Icon size={36} strokeWidth={2} className="sm:w-12 sm:h-12" />
      <span>{label}</span>
    </Link>
  );
}

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#f0ece1] flex flex-col font-sans">
      <main className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-[#556B2F] text-white rounded-xl p-3">
              <FolderCog size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-[#556B2F]">Reports</h1>
              <p className="text-sm text-[#556B2F]/60 mt-0.5">Generate and view reports</p>
            </div>
          </div>
          <p className="text-center text-lg text-[#556B2F] mb-12">Select which type of report you would like to generate</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:flex lg:flex-row lg:justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-16 md:mt-24">
            {reportTiles.map(tile => (
              <ReportTile key={tile.label} {...tile} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
