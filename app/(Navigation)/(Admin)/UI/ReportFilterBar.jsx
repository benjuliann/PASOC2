"use client";
import React from "react";

function getPresetDates(preset) {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  if (preset === "month") {
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    return { startDate: first.toISOString().slice(0, 10), endDate: today };
  }
  if (preset === "quarter") {
    const q = Math.floor(now.getMonth() / 3);
    const first = new Date(now.getFullYear(), q * 3, 1);
    return { startDate: first.toISOString().slice(0, 10), endDate: today };
  }
  if (preset === "year") {
    return { startDate: `${now.getFullYear()}-01-01`, endDate: today };
  }
  return null;
}

const PRESETS = [
  { key: "month", label: "This Month" },
  { key: "quarter", label: "This Quarter" },
  { key: "year", label: "This Year" },
  { key: "custom", label: "Custom" },
];

export default function ReportFilterBar({ filters, onChange, onApply, onReset, extras = [] }) {
  function setPreset(preset) {
    const dates = getPresetDates(preset);
    if (dates) {
      onChange("startDate", dates.startDate);
      onChange("endDate", dates.endDate);
    }
    onChange("preset", preset);
  }

  return (
    <div className="bg-white border-2 border-[#556B2F] rounded-2xl p-4 flex flex-wrap gap-4 items-end">
      <div className="flex gap-2 flex-wrap">
        {PRESETS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setPreset(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              filters.preset === key
                ? "bg-[#556B2F] text-white border-[#556B2F]"
                : "bg-white text-[#556B2F] border-[#556B2F]/40 hover:border-[#556B2F]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="date"
          value={filters.startDate || ""}
          onChange={(e) => { onChange("startDate", e.target.value); onChange("preset", "custom"); }}
          className="border border-[#556B2F]/40 rounded-lg px-3 py-1.5 text-sm text-[#556B2F] focus:outline-none focus:border-[#556B2F]"
        />
        <span className="text-[#556B2F]/50 text-sm">to</span>
        <input
          type="date"
          value={filters.endDate || ""}
          onChange={(e) => { onChange("endDate", e.target.value); onChange("preset", "custom"); }}
          className="border border-[#556B2F]/40 rounded-lg px-3 py-1.5 text-sm text-[#556B2F] focus:outline-none focus:border-[#556B2F]"
        />
      </div>

      {extras.map(({ key, label, type, options }) => (
        <div key={key} className="flex flex-col gap-1">
          <label className="text-xs text-[#556B2F]/70 font-medium">{label}</label>
          {type === "select" && (
            <select
              value={filters[key] || ""}
              onChange={(e) => onChange(key, e.target.value)}
              className="border border-[#556B2F]/40 rounded-lg px-3 py-1.5 text-sm text-[#556B2F] focus:outline-none focus:border-[#556B2F]"
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          )}
        </div>
      ))}

      <div className="flex gap-3 items-center ml-auto">
        <button
          onClick={onApply}
          className="px-4 py-1.5 bg-[#556B2F] text-white text-sm font-semibold rounded-lg hover:bg-[#4a5240] transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={onReset}
          className="text-sm text-[#556B2F]/60 hover:text-[#556B2F] underline transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
