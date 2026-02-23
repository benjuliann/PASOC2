"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "PASOC in Motion", href: "#" },
  { label: "News", href: "#" },
  { label: "Events", href: "/Pages/Events" },
  { label: "About Us", href: "/Pages/AboutUs" },
  { label: "Donate", href: "/Pages/Donate/" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [hoveredNav, setHoveredNav] = React.useState(null);
  const [visible, setVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Show when scrolling up or near top, hide when scrolling down
      if (currentY < 10 || currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 5) {
        setVisible(false);
        setMenuOpen(false); // close mobile menu when hiding
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50
        bg-[#f5f5f4]
        shadow-[0_4px_10px_rgba(0,0,0,0.2)]
        border-b-4 border-[#556B2F]
        transition-transform duration-300 ease-in-out
        ${visible ? "translate-y-0" : "-translate-y-[110%]"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

        {/* Brand: logo + title */}
        <Link
          href="/"
          className="flex items-center gap-3 no-underline flex-1 min-w-0 justify-center md:justify-start"
        >
          <Image
            src="/pasoc_logo.png"
            alt="PASOC Logo"
            width={100}
            height={100}
            className="object-contain shrink-0"
          />
          <span
            className="text-black leading-snug break-words"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1rem, 2.5vw, 1.75rem)",
            }}
          >
            Pangasinan Society of Calgary
          </span>
        </Link>

        {/* Right-side actions */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Search — desktop only, expands on click */}
          <div
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-zinc-600 bg-gray-200 cursor-pointer overflow-hidden transition-all duration-300"
            style={{ width: searchOpen ? 280 : 44 }}
            onClick={() => setSearchOpen((o) => !o)}
          >
            <Search size={22} className="text-zinc-500 shrink-0" strokeWidth={2} />
            {searchOpen && (
              <input
                autoFocus
                placeholder="Search PASOC…"
                className="bg-transparent outline-none text-sm text-black w-full"
              />
            )}
          </div>

          <Link
            href="/Pages/Login"
            title="Login"
            className="flex items-center p-1 rounded-lg text-zinc-500 no-underline transition-transform duration-200 hover:scale-110"
          >
            <User size={36} strokeWidth={2} />
          </Link>

          {/* Hamburger for mobile */}
          <button
            className="flex md:hidden items-center justify-center p-1 text-[#556B2F] bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Desktop nav - constrained to max-w-7xl*/}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <nav className="hidden md:flex w-full text-lg font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex-1 py-2.5 text-center whitespace-nowrap no-underline transition-all duration-200"
              style={{
                backgroundColor: hoveredNav === link.label ? "#556B2F" : "transparent",
                color: hoveredNav === link.label ? "#ffffff" : "#556B2F",
              }}
              onMouseEnter={() => setHoveredNav(link.label)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav className="flex md:hidden flex-col border-t-2 border-[#556B2F] bg-[#f5f5f4]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-6 py-3.5 no-underline font-bold text-[17px] text-[#556B2F] border-b border-stone-300 transition-colors duration-150 hover:bg-[#556B2F] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}