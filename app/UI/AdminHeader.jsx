"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User } from "lucide-react";

const adminNavLinks = [
  { label: "Dashboard", href: "/Pages/Admin/Dashboard-page" },
  { label: "Donations", href: "#" },
  { label: "Events", href: "#" },
  { label: "Members", href: "#" },
  { label: "Galleries", href: "#" },
  { label: "Sponsors", href: "#" },
  { label: "Reports", href: "#" },
  { label: "Edit Pages", href: "#" },
];

export function AdminHeader() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  return (
    <header className="bg-[#6b8642] border-b-2 border-black">
      <div className="max-w-7xl mx-auto flex items-center px-8 py-3 gap-4">
        <Image src="/pasoc_logo.png" alt="PASOC Logo" width={56} height={56} className="object-contain" />
        <span className="text-white text-2xl font-serif font-semibold tracking-wide">PASOC Admins</span>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#e6e6d6] focus-within:ring-2 focus-within:ring-[#556B2F] transition-all duration-300"
            style={{ width: searchOpen ? 180 : 44, border: 'none', cursor: 'pointer', overflow: 'hidden' }}
            onClick={() => setSearchOpen((o) => !o)}
          >
            <Search size={22} className="text-[#6b8642]" strokeWidth={2} />
            {searchOpen && (
              <input
                autoFocus
                placeholder="Search PASOC"
                className="bg-transparent outline-none text-sm text-black w-full"
              />
            )}
          </div>
          <Link href="/Pages/Login" className="text-white">
            <User size={32} />
          </Link>
        </div>
      </div>
      <nav className="flex justify-center gap-8 font-bold text-white text-[17px] pb-2">
        {adminNavLinks.map((link) => (
          <Link key={link.label} href={link.href} className="hover:underline hover:underline-offset-4 transition">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
