"use client";
import React, { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const PALETTE = ["#556B2F", "#8fa660", "#c5d68a", "#4a5240", "#d4a853", "#a8b89a"];

export default function ReportChart({ data = [], xKey, bars = [], pieData, title }) {
  const hasPie = Array.isArray(pieData) && pieData.length > 0;
  const [type, setType] = useState("Bar");
  const types = ["Bar", "Line", ...(hasPie ? ["Pie"] : [])];

  if (!data.length && !hasPie) {
    return (
      <div className="bg-white border-2 border-[#556B2F] rounded-2xl p-6 flex items-center justify-center h-48">
        <span className="text-[#556B2F]/50 text-sm">No chart data for this period</span>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-[#556B2F] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4 gap-4">
        <span className="text-[#556B2F] font-semibold">{title}</span>
        <div className="flex gap-1">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                type === t
                  ? "bg-[#556B2F] text-white border-[#556B2F]"
                  : "bg-white text-[#556B2F] border-[#556B2F]/40 hover:border-[#556B2F]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        {type === "Bar" ? (
          <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4d9" />
            <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#556B2F" }} />
            <YAxis tick={{ fontSize: 11, fill: "#556B2F" }} />
            <Tooltip />
            <Legend />
            {bars.map((b, i) => (
              <Bar key={b.key} dataKey={b.key} name={b.label} fill={PALETTE[i % PALETTE.length]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        ) : type === "Line" ? (
          <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4d9" />
            <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#556B2F" }} />
            <YAxis tick={{ fontSize: 11, fill: "#556B2F" }} />
            <Tooltip />
            <Legend />
            {bars.map((b, i) => (
              <Line
                key={b.key}
                type="monotone"
                dataKey={b.key}
                name={b.label}
                stroke={PALETTE[i % PALETTE.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        ) : (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {(pieData || []).map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
