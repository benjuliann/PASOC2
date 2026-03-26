"use client";

import React from "react";

import { Landmark, CalendarDays, Users, Image, Handshake, FolderCog } from "lucide-react";

const stats = [
  { label: "Annual Donations", value: "$ 9999.99" },
  { label: "Active Members", value: "250" },
];

const managerTiles = [
  { label: "Donation Manager", Icon: Landmark },
  { label: "Event Manager", Icon: CalendarDays },
  { label: "Member/Guest\nManager", Icon: Users },
  { label: "Gallery Manager", Icon: Image },
  { label: "Sponsor Manager", Icon: Handshake },
  { label: "Reports", Icon: FolderCog },
];

function StatCard({ label, value }) {
  return (
    <div style={{
      flex: 1, minWidth: 180, maxWidth: 240,
      border: "2px solid #556B2F", borderRadius: 12,
      padding: "20px 32px", backgroundColor: "white",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
    }}>
      <span style={{ fontFamily: "Instrument Serif, serif", fontSize: 16, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3, color: "#1a1a1a" }}>
        {label}
      </span>
      <span style={{ fontFamily: "Instrument Serif, serif", fontSize: 30, fontWeight: 700, color: "#1a1a1a", marginTop: 4 }}>
        {value}
      </span>
    </div>
  );
}

function ManagerTile({ label, Icon }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href="#"
      onClick={e => e.preventDefault()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textDecoration: "none" }}
    >
      <div style={{
        width: 110, height: 110,
        border: "2px solid #556B2F", borderRadius: 16,
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: hovered ? "#556B2F" : "white",
        boxShadow: hovered ? "0 6px 20px rgba(85,107,47,0.3)" : "0 2px 8px rgba(0,0,0,0.07)",
        transition: "all 0.2s ease", cursor: "pointer",
      }}>
        <Icon size={48} strokeWidth={1.5} color={hovered ? "white" : "#556B2F"} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, textAlign: "center", color: "#2a2420", lineHeight: 1.4, whiteSpace: "pre-line" }}>
        {label}
      </span>
    </a>
  );
}

export default function AdminDashboard() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f0ece1", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
      {/* Stats */}
      <div style={{ maxWidth: 900, margin: "40px auto 0", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
          {stats.map(s => <StatCard key={s.label} label={s.label} value={s.value} />)}
        </div>
      </div>

      {/* Manager Tiles */}
      <div style={{ maxWidth: 900, margin: "48px auto 64px", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
          {managerTiles.map(t => <ManagerTile key={t.label} label={t.label} Icon={t.Icon} />)}
        </div>
      </div>
    </main>
  );
}