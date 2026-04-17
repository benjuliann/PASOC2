"use client";
import React from "react";
import { Download, Printer } from "lucide-react";

function exportCSV(data, columns, filename) {
  const header = columns.map((c) => c.label).join(",");
  const rowLines = data.map((row) =>
    columns
      .map((c) => {
        const val = String(row[c.key] ?? "");
        return val.includes(",") || val.includes('"') || val.includes("\n")
          ? `"${val.replace(/"/g, '""')}"`
          : val;
      })
      .join(",")
  );
  const csv = [header, ...rowLines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportExportBar({ data = [], columns = [], filename = "report" }) {
  return (
    <div className="flex gap-3 justify-end print:hidden">
      <button
        onClick={() => exportCSV(data, columns, filename)}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#556B2F] text-[#556B2F] text-sm font-semibold rounded-xl hover:bg-[#f0ece1] transition-colors"
      >
        <Download size={16} />
        Export CSV
      </button>
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 px-4 py-2 bg-[#556B2F] text-white text-sm font-semibold rounded-xl hover:bg-[#4a5240] transition-colors"
      >
        <Printer size={16} />
        Export PDF
      </button>
    </div>
  );
}
