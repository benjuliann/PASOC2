"use client";
import React from "react";
import Link from "next/link";
import { Users, UserPlus, Pencil, Trash2 } from "lucide-react";

const memberTiles = [
  { label: "Manage Members", Icon: Users, href: "/Admin/MemberManager/Manage" },
  { label: "Add Member", Icon: UserPlus, href: "/Admin/MemberManager/Add" },
  { label: "Edit Member", Icon: Pencil, href: "/Admin/MemberManager/Edit" },
  { label: "Delete Member", Icon: Trash2, href: "/Admin/MemberManager/Delete" },
];

function MemberTile({ label, Icon, href }) {
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

export default function MemberManagerPage() {
  return (
    <div className="min-h-screen bg-[#f0ece1] flex flex-col font-sans">
      <main className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-6 mt-8 mb-8">
            <hr className="flex-1 border-[#556B2F] border-t-2" />
            <h2 className="text-3xl font-serif text-[#556B2F] text-center mx-4">MEMBERSHIP MANAGER</h2>
            <hr className="flex-1 border-[#556B2F] border-t-2" />
          </div>
          <div className="flex justify-center gap-12 mt-24">
            {memberTiles.map(tile => (
              <MemberTile key={tile.label} {...tile} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
