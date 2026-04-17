"use client";
import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

export default function ReportDataTable({ columns, rows = [], defaultSort }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(defaultSort || columns[0]?.key || "");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(0);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(q))
    );
  }, [rows, search, columns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="bg-white border-2 border-[#556B2F] rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-[#556B2F]/20 flex items-center gap-3 flex-wrap">
        <div className="relative max-w-xs w-full sm:w-auto">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556B2F]/50" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-9 pr-4 py-1.5 text-sm border border-[#556B2F]/30 rounded-lg text-[#556B2F] focus:outline-none focus:border-[#556B2F]"
          />
        </div>
        <span className="text-xs text-[#556B2F]/60 ml-auto">{filtered.length} records</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-[#f0ece1]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="px-4 py-3 text-[#556B2F] font-semibold cursor-pointer select-none whitespace-nowrap"
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key ? (
                      sortDir === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    ) : (
                      <span className="w-3.5" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-[#556B2F]/50">
                  No records found
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={i} className="border-t border-[#556B2F]/10 hover:bg-[#f0ece1]/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-[#2a2420]">
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-[#556B2F]/20 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-xs text-[#556B2F]/70">
          <span>Rows:</span>
          {[10, 25, 50].map((n) => (
            <button
              key={n}
              onClick={() => { setPageSize(n); setPage(0); }}
              className={`px-2 py-1 rounded border text-xs transition-colors ${
                pageSize === n
                  ? "bg-[#556B2F] text-white border-[#556B2F]"
                  : "border-[#556B2F]/30 text-[#556B2F] hover:border-[#556B2F]"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-[#556B2F]/70">
          <span>Page {page + 1} of {totalPages}</span>
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-2 py-1 rounded border border-[#556B2F]/30 text-[#556B2F] disabled:opacity-30 hover:border-[#556B2F] transition-colors"
          >
            ‹
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-2 py-1 rounded border border-[#556B2F]/30 text-[#556B2F] disabled:opacity-30 hover:border-[#556B2F] transition-colors"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
