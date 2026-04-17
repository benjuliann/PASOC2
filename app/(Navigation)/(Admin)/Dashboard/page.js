import React from "react";
import Link from "next/link";
import { MapPin, LayoutDashboard } from "lucide-react";
import { StatCard } from "../UI/StatCard";
import { ManagerTile } from "../UI/ManagerTile";
import pool from "@/lib/db";

const managerTiles = [
  { label: "Member Manager", icon: "Users", href: "/MembersManager" },
  { label: "Donation Manager", icon: "Landmark", href: "/DonationsManager" },
  { label: "Event Manager", icon: "CalendarDays", href: "/EventsManager" },
  { label: "Sponsor Manager", icon: "Handshake", href: "/SponsorsManager" },
  { label: "Bulletins Manager", icon: "Newspaper", href: "/BulletinsManager" },
  { label: "Reports", icon: "FolderCog", href: "/Reports" },
];

async function safeQuery(fn) {
  try {
    const [rows] = await fn();
    return rows;
  } catch {
    return null;
  }
}

function formatRelativeDate(date) {
  if (!date) return "";
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });
}

function ActivityDot({ type }) {
  const configs = {
    member: { bg: "bg-[#556B2F]", label: "M" },
    donation: { bg: "bg-amber-500", label: "$" },
    bulletin: { bg: "bg-blue-500", label: "B" },
  };
  const { bg, label } = configs[type] ?? { bg: "bg-gray-400", label: "?" };
  return (
    <span
      className={`${bg} text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5`}
    >
      {label}
    </span>
  );
}

export default async function AdminDashboard() {
  const [
    memberRows,
    donationRows,
    upcomingCountRows,
    bulletinCountRows,
    upcomingEventRows,
    recentMemberRows,
    recentDonationRows,
    recentBulletinRows,
  ] = await Promise.all([
    safeQuery(() => pool.query("SELECT COUNT(*) AS count FROM MemberInfo")),
    safeQuery(() =>
      pool.query(
        `SELECT COALESCE(SUM(donationAmount), 0) AS total
         FROM Donations
         WHERE confirmation = 1
         AND YEAR(donationDate) = YEAR(CURDATE())`
      )
    ),
    safeQuery(() =>
      pool.query("SELECT COUNT(*) AS count FROM Events WHERE startDatetime > NOW()")
    ),
    safeQuery(() =>
      pool.query("SELECT COUNT(*) AS count FROM BulletinList WHERE isPublished = 1")
    ),
    safeQuery(() =>
      pool.query(
        `SELECT eventId, title, startDatetime, location
         FROM Events
         WHERE startDatetime > NOW()
         ORDER BY startDatetime ASC
         LIMIT 3`
      )
    ),
    safeQuery(() =>
      pool.query(
        `SELECT name, applicationDate
         FROM MemberInfo
         WHERE applicationDate IS NOT NULL
         ORDER BY applicationDate DESC
         LIMIT 4`
      )
    ),
    safeQuery(() =>
      pool.query(
        `SELECT donationAmount, donationDate
         FROM Donations
         WHERE confirmation = 1
         ORDER BY donationDate DESC
         LIMIT 4`
      )
    ),
    safeQuery(() =>
      pool.query(
        `SELECT title, createdAt
         FROM BulletinList
         WHERE isPublished = 1
         ORDER BY createdAt DESC
         LIMIT 4`
      )
    ),
  ]);

  const totalMembers = memberRows?.[0]?.count ?? "N/A";
  const annualDonations = donationRows?.[0]?.total ?? null;
  const upcomingCount = upcomingCountRows?.[0]?.count ?? "N/A";
  const bulletinCount = bulletinCountRows?.[0]?.count ?? "N/A";
  const upcomingEvents = upcomingEventRows ?? [];

  const donationFormatted =
    annualDonations !== null
      ? `$${Number(annualDonations).toLocaleString("en-CA", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "N/A";

  // Build unified activity feed
  const activityItems = [
    ...(recentMemberRows ?? []).map((r) => ({
      type: "member",
      label: `New member: ${r.name}`,
      date: r.applicationDate ? new Date(r.applicationDate) : null,
    })),
    ...(recentDonationRows ?? []).map((r) => ({
      type: "donation",
      label: `Donation received: $${Number(r.donationAmount).toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      date: r.donationDate ? new Date(r.donationDate) : null,
    })),
    ...(recentBulletinRows ?? []).map((r) => ({
      type: "bulletin",
      label: `Bulletin published: ${r.title}`,
      date: r.createdAt ? new Date(r.createdAt) : null,
    })),
  ]
    .filter((item) => item.date)
    .sort((a, b) => b.date - a.date)
    .slice(0, 6);

  const stats = [
    {
      label: "Annual Donations",
      value: donationFormatted,
      linkTo: "/DonationsManager",
    },
    {
      label: "Total Members",
      value: totalMembers,
      linkTo: "/MembersManager",
    },
    {
      label: "Upcoming Events",
      value: upcomingCount,
      linkTo: "/EventsManager",
    },
    {
      label: "Published Bulletins",
      value: bulletinCount,
      linkTo: "/BulletinsManager",
    },
  ];

  return (
    <main className="flex-1 flex flex-col items-center px-6 py-10 bg-[#f0ece1] min-h-screen">
      {/* Page header */}
      <div className="w-full max-w-7xl mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-[#556B2F] text-white rounded-xl p-3">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-[#556B2F]">Overview</h1>
            <p className="text-sm text-[#556B2F]/60 mt-0.5">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <section className="w-full max-w-7xl mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              linkTo={s.linkTo}
            />
          ))}
        </div>
      </section>

      {/* Activity feed + Upcoming Events */}
      <section className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Recent Activity */}
        <div className="bg-white border border-[#556B2F]/10 rounded-2xl p-6 shadow-sm">
          <h2
            className="text-lg font-semibold text-[#556B2F] mb-5"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Recent Activity
          </h2>
          {activityItems.length === 0 ? (
            <p className="text-sm text-[#999]">No recent activity.</p>
          ) : (
            <ul className="space-y-3">
              {activityItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm border-b border-[#f0ece1] pb-3 last:border-0 last:pb-0"
                >
                  <ActivityDot type={item.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#2c2c2c] leading-snug truncate">
                      {item.label}
                    </p>
                    <p className="text-xs text-[#7a7a6e] mt-0.5">
                      {formatRelativeDate(item.date)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Upcoming Events Preview */}
        <div className="bg-white border border-[#556B2F]/10 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-lg font-semibold text-[#556B2F]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Upcoming Events
            </h2>
            <Link
              href="/EventsManager"
              className="text-xs text-[#556B2F]/60 hover:text-[#556B2F] underline underline-offset-2"
            >
              View all
            </Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-[#999]">No upcoming events.</p>
          ) : (
            <ul className="space-y-3">
              {upcomingEvents.map((ev) => {
                const dt = ev.startDatetime ? new Date(ev.startDatetime) : null;
                return (
                  <li
                    key={ev.eventId}
                    className="border-b border-[#f0ece1] pb-3 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-semibold text-[#2c2c2c]">
                      {ev.title}
                    </p>
                    {dt && (
                      <p className="text-xs text-[#7a7a6e] mt-0.5">
                        {dt.toLocaleDateString("en-CA", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                        {" · "}
                        {dt.toLocaleTimeString("en-CA", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                    {ev.location && (
                      <p className="text-xs text-[#7a7a6e] flex items-center gap-1 mt-0.5">
                        <MapPin size={10} />
                        {ev.location}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* Manager Tiles */}
      <section className="w-full max-w-7xl">
        <p className="text-xs font-semibold text-[#556B2F]/50 uppercase tracking-widest mb-4">
          Manager Tools
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {managerTiles.map((t) => (
            <ManagerTile key={t.label} variant="compact" {...t} />
          ))}
        </div>
      </section>
    </main>
  );
}
