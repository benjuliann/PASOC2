import React from "react";

const stats = [
  { label: "Annual Donations", value: "$ 9999.99" },
  { label: "Active Members", value: "250" },
];

export function DashboardStats() {
  return (
    <div className="flex justify-center gap-8 mt-[-60px] mb-10 flex-wrap">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border-2 border-[#b7c99c] rounded-xl px-10 py-6 min-w-[220px] max-w-[260px] text-center shadow-md flex-1"
        >
          <div className="text-2xl font-serif border-b-2 border-[#b7c99c] mb-2">{s.label}</div>
          <div className="text-3xl font-bold tracking-wider">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
