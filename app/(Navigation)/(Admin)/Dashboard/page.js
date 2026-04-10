import React from "react";
import { StatCard } from "../UI/StatCard";
import { ManagerTile } from "../UI/ManagerTile";
import pool from "@/lib/db";

const managerTiles = [
  { label: "Member Manager", icon: "Users", href: "/MembersManager" },
  { label: "Donation Manager", icon: "Landmark", href: "/DonationsManager" },
  { label: "Event Manager", icon: "CalendarDays", href: "/EventsManager" },
  { label: "Gallery Manager", icon: "Image", href: "/GalleryManager" },
  { label: "Sponsor Manager", icon: "Handshake", href: "/SponsorsManager" },
  { label: "Reports", icon: "FolderCog", href: "/Reports" },
];

export default async function AdminDashboard() {
  let activeMembers = "N/A";
  let totalDonations = "N/A";

  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS count FROM MemberInfo");
    activeMembers = rows?.[0]?.count ?? 0;
  } catch (err) {
    console.error("[AdminDashboard] Failed to fetch active members count", err);
  }

  try {
    const [rows] = await pool.query(
      `SELECT SUM(donationAmount) AS total
			FROM Donations
			WHERE confirmation = 1
			AND YEAR(donationDate) = YEAR(CURDATE())`,
    );
    totalDonations = rows?.[0]?.total ?? 0;
  } catch (err) {
    console.error("[AdminDashboard] Failed to fetch total donations", err);
  }

  const stats = [
    {
      label: "Annual Donations",
      value: `$ ${Number(totalDonations).toFixed(2)}`,
    },
    { label: "Active Members", value: activeMembers },
  ];

  return (
    <main className="flex-1 flex flex-col items-center px-6 py-12">
      {/* Stats row */}
      <section className="w-full max-w-3xl">
        <div className="flex flex-wrap gap-6 justify-center">
          {stats.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      </section>

      {/* Manager tiles */}
      <section className="w-full max-w-4xl mt-16 mb-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {managerTiles.map((t) => (
            <ManagerTile key={t.label} variant="compact" {...t} />
          ))}
        </div>
      </section>
    </main>
  );
}
