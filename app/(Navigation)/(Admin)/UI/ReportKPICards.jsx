"use client";
import React from "react";

export default function ReportKPICards({ cards }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, delta, highlight }, i) => (
        <div
          key={i}
          className={`rounded-2xl border-2 px-6 py-5 flex flex-col gap-1 shadow-sm ${
            highlight
              ? "bg-[#4a5240] border-[#4a5240] text-white"
              : "bg-white border-[#556B2F] text-[#556B2F]"
          }`}
        >
          <span className="text-sm font-medium opacity-75">{label}</span>
          <span
            className="text-3xl font-bold mt-1 leading-tight break-words"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {value ?? "—"}
          </span>
          {delta && (
            <span className={`text-xs mt-1 ${highlight ? "text-white/70" : "text-[#556B2F]/60"}`}>
              {delta}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
