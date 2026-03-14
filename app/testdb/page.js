"use client";

import { useState } from "react";

export default function TestDBPage() {
  const [getResult, setGetResult] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [setupResult, setSetupResult] = useState(null);
  const [loading, setLoading] = useState({});
  const [form, setForm] = useState({ name: "", email: "" });

  const setLoad = (key, val) =>
    setLoading((prev) => ({ ...prev, [key]: val }));

  async function runSetup() {
    setLoad("setup", true);
    setSetupResult(null);
    try {
      const res = await fetch("/api/testdb/setup");
      const data = await res.json();
      setSetupResult({ ok: res.ok, data });
    } catch (err) {
      setSetupResult({ ok: false, data: { error: err.message } });
    }
    setLoad("setup", false);
  }

  async function runGet() {
    setLoad("get", true);
    setGetResult(null);
    try {
      const res = await fetch("/api/testdb");
      const data = await res.json();
      setGetResult({ ok: res.ok, data });
    } catch (err) {
      setGetResult({ ok: false, data: { error: err.message } });
    }
    setLoad("get", false);
  }

  async function runPost() {
    setLoad("post", true);
    setPostResult(null);
    try {
      const res = await fetch("/api/testdb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setPostResult({ ok: res.ok, data });
    } catch (err) {
      setPostResult({ ok: false, data: { error: err.message } });
    }
    setLoad("post", false);
  }

  const boxStyle = (ok) => ({
    background: ok ? "#f0fdf4" : "#fef2f2",
    border: `1px solid ${ok ? "#86efac" : "#fca5a5"}`,
    borderRadius: 8,
    padding: "1rem",
    marginTop: "0.75rem",
    fontFamily: "monospace",
    fontSize: 13,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  });

  const btnStyle = (color) => ({
    background: color,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "0.5rem 1.25rem",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  });

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: "0 1rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
        🛢 DB Connection Tester
      </h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem", fontSize: 14 }}>
        PASOC · Hostinger VPS · Dokploy MySQL
      </p>

      {/* SETUP */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>1. Setup / Health Check</h2>
        <p style={{ fontSize: 13, color: "#6b7280" }}>
          Tests connection, shows active DB, creates <code>GuestUsers</code> table if missing, and seeds one row.
        </p>
        <button
          style={btnStyle("#6366f1")}
          onClick={runSetup}
          disabled={loading.setup}
        >
          {loading.setup ? "Running…" : "Run Setup →"}
        </button>
        {setupResult && (
          <div style={boxStyle(setupResult.ok)}>
            {JSON.stringify(setupResult.data, null, 2)}
          </div>
        )}
      </section>

      {/* GET */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>2. GET /api/testdb</h2>
        <p style={{ fontSize: 13, color: "#6b7280" }}>
          Fetches all rows from <code>GuestUsers</code>.
        </p>
        <button
          style={btnStyle("#0ea5e9")}
          onClick={runGet}
          disabled={loading.get}
        >
          {loading.get ? "Loading…" : "Send GET →"}
        </button>
        {getResult && (
          <div style={boxStyle(getResult.ok)}>
            {JSON.stringify(getResult.data, null, 2)}
          </div>
        )}
      </section>

      {/* POST */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: 16, fontWeight: 600 }}>3. POST /api/testdb</h2>
        <p style={{ fontSize: 13, color: "#6b7280" }}>
          Inserts a new guest user into <code>GuestUsers</code>.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            style={{
              padding: "0.4rem 0.75rem",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              fontSize: 14,
              flex: 1,
              minWidth: 120,
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            style={{
              padding: "0.4rem 0.75rem",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              fontSize: 14,
              flex: 1,
              minWidth: 160,
            }}
          />
        </div>
        <button
          style={btnStyle("#10b981")}
          onClick={runPost}
          disabled={loading.post || !form.name || !form.email}
        >
          {loading.post ? "Posting…" : "Send POST →"}
        </button>
        {postResult && (
          <div style={boxStyle(postResult.ok)}>
            {JSON.stringify(postResult.data, null, 2)}
          </div>
        )}
      </section>

      <p style={{ fontSize: 12, color: "#9ca3af" }}>
        After confirming everything works, remove this page and the /setup route before deploying to production.
      </p>
    </div>
  );
}