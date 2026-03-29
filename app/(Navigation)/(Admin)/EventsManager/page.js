"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function formatDateStr(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
function dayName(y, m, d) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(y, m, d).getDay()];
}

// Convert DB row → local event object
function normalise(row) {
  const dt = row.startDatetime ? new Date(row.startDatetime) : null;
  return {
    id: row.eventId,
    title: row.title ?? "",
    startDatetime: row.startDatetime ?? "",
    description: row.description ?? "",
    location: row.location ?? "",
    // derived for calendar / display
    date: dt ? formatDateStr(dt.getFullYear(), dt.getMonth(), dt.getDate()) : "",
    time: dt ? `${String(dt.getHours()).padStart(2, "0")}:${String(dt.getMinutes()).padStart(2, "0")}` : "",
    timeDisplay: dt ? formatTimeDisplay(`${String(dt.getHours()).padStart(2, "0")}:${String(dt.getMinutes()).padStart(2, "0")}`) : "",
  };
}

// Build a datetime string from date (YYYY-MM-DD) + time (HH:MM from time input)
function toDatetimeLocal(date, time) {
  if (!date || !time) return "";
  return `${date}T${time}`;
}

// Format stored datetime back to HH:MM for the time input
function toTimeInput(startDatetime) {
  if (!startDatetime) return "";
  const dt = new Date(startDatetime);
  if (isNaN(dt)) return "";
  return `${String(dt.getHours()).padStart(2, "0")}:${String(dt.getMinutes()).padStart(2, "0")}`;
}

// Format HH:MM for display (e.g. "3:30 PM")
function formatTimeDisplay(hhmm) {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export default function EventManagerPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    formatDateStr(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    eventId: null,
    eventTitle: "",
  });

  // Clear form error when any field changes
  const updateField = (field, value) => {
    setFormError("");
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Form uses separate date + time inputs for usability, combined into startDatetime on submit
  const [formData, setFormData] = useState({
    title: "", date: "", time: "", description: "", location: "",
  });
  const [formError, setFormError] = useState("");

  // ── Load events from DB ──
  const loadEvents = useCallback(async () => {
    try {
      const res = await fetch("/api/Database/events", { cache: "no-store" });
      const json = await res.json();
      if (!json.success) { console.error("Load failed:", json.error); return; }
      setEvents(json.data.map(normalise));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadEvents(); }, [loadEvents]);

  // Calendar data
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const prevMonthDays = getDaysInMonth(viewYear, viewMonth === 0 ? 11 : viewMonth - 1);
  const prevFill = Array.from({ length: firstDay }, (_, i) => ({ day: prevMonthDays - firstDay + 1 + i, current: false }));
  const currDays = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, current: true }));
  const totalCells = prevFill.length + currDays.length;
  const nextFill = Array.from({ length: (7 - (totalCells % 7)) % 7 }, (_, i) => ({ day: i + 1, current: false }));
  const calendarCells = [...prevFill, ...currDays, ...nextFill];

  const eventDates = useMemo(() => {
    const set = new Set();
    events.forEach((ev) => {
      if (ev.date) {
        const d = new Date(ev.date + "T00:00:00");
        if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) set.add(d.getDate());
      }
    });
    return set;
  }, [events, viewYear, viewMonth]);

  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const selParts = selectedDate.split("-").map(Number);
  const selDayName = dayName(selParts[0], selParts[1] - 1, selParts[2]);
  const selMonthName = MONTHS[selParts[1] - 1];
  const selLabel = `${selDayName}, ${selMonthName} ${selParts[2]}`;

  const upcomingEvents = useMemo(() => {
    return events
      .filter((ev) => ev.date >= selectedDate)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events, selectedDate]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const openForm = (ev = null) => {
    if (ev) {
      // editing — split startDatetime back into date + time inputs
      setFormData({
        title: ev.title,
        date: ev.date,
        time: ev.time,   // already HH:MM from normalise()
        description: ev.description,
        location: ev.location,
      });
      setEditingEvent(ev);
    } else {
      setFormData({ title: "", date: selectedDate, time: "", description: "", location: "" });
      setEditingEvent(null);
    }
    setFormError("");
    setShowForm(true);
  };

  const handleModifyEvent = () => {
    if (upcomingEvents.length > 0) openForm(upcomingEvents[0]);
    else openForm();
  };

  // ── Validate form ──
  const getFormError = (data) => {
    if (!data.title.trim()) return "Event title is required.";
    if (!data.date) return "Date is required.";
    if (!data.time) return "Time is required.";
    if (!data.location.trim()) return "Location is required.";
    return "";
  };

  // ── Submit: POST (add) or PUT (edit) ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = getFormError(formData);
    if (error) { setFormError(error); return; }
    setFormError("");
    const startDatetime = toDatetimeLocal(formData.date, formData.time);
    const payload = {
      title: formData.title,
      startDatetime,
      description: formData.description,
      location: formData.location,
    };

    try {
      if (editingEvent) {
        const res = await fetch("/api/Database/events", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingEvent.id, ...payload }),
        });
        const json = await res.json();
        if (!json.success) { console.error("Update failed:", json.error); return; }
      } else {
        const res = await fetch("/api/Database/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.success) { console.error("Create failed:", json.error); return; }
      }
      setShowForm(false);
      loadEvents();
    } catch (err) {
      console.error(err);
    }
  };

  // ── Delete: open confirm first ──
  const handleDelete = () => {
    if (!editingEvent) return;
    setConfirmModal({ isOpen: true, eventId: editingEvent.id, eventTitle: editingEvent.title });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, eventId: null, eventTitle: "" });
  };

  const executeConfirmedDelete = async () => {
    try {
      const res = await fetch(`/api/Database/events?id=${confirmModal.eventId}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) { console.error("Delete failed:", json.error); return; }
      closeConfirmModal();
      setShowForm(false);
      loadEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0ece1] flex flex-col font-sans">
      <main className="flex-1 flex flex-col items-center py-10">
        {/* Page Header */}
        <div className="w-full max-w-4xl mx-auto mb-8 flex flex-col items-center">
          <div className="flex items-center w-full justify-between mb-2">
            <hr className="flex-1 border-t border-[#556B2F] mx-4" />
            <h1 className="text-3xl font-serif font-bold text-[#556B2F] tracking-wide">EVENT MANAGER</h1>
            <hr className="flex-1 border-t border-[#556B2F] mx-4" />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-4 px-4">
          {/* Left Side */}
          <div className="flex-1 flex flex-col">
            <div className="mb-4">
              <div className="inline-block border border-[#2a2420] rounded-full px-6 py-2">
                <span className="font-serif text-lg font-semibold text-[#2a2420]">{selLabel}</span>
              </div>
            </div>

            <div className="border border-[#2a2420] rounded-lg p-4 bg-white min-h-70">
              <h3 className="font-serif text-xl text-center underline underline-offset-4 font-semibold text-[#2a2420] mb-4">
                Upcoming Events
              </h3>
              {loading && <p className="text-sm text-[#888] text-center mt-8">Loading events...</p>}
              {!loading && upcomingEvents.length === 0 && (
                <p className="text-sm text-[#888] text-center mt-8">No upcoming events.</p>
              )}
              {!loading && upcomingEvents.map((ev) => {
                const d = new Date(ev.date + "T00:00:00");
                const monthName = MONTHS[d.getMonth()];
                return (
                  <div
                    key={ev.id}
                    className="border-b border-[#ccc] py-3 px-2 cursor-pointer hover:bg-[#f7f7d6] transition rounded"
                    onClick={() => openForm(ev)}
                  >
                    <div className="font-semibold text-[#2a2420]">{ev.title}</div>
                    <div className="text-sm text-[#2a2420]">
                      Date &amp; Time: {monthName} {String(d.getDate()).padStart(2, "0")}, {d.getFullYear()} {ev.timeDisplay}
                    </div>
                    <div className="text-sm text-[#2a2420]">Where: {ev.location}</div>
                    <div className="text-sm text-[#2a2420]">Description: {ev.description}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Calendar */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-3">
              <button onClick={prevMonth} className="text-[#556B2F] text-2xl font-bold hover:text-[#6b8e23] transition px-2">&lt;</button>
              <span className="font-serif text-3xl font-bold text-[#2a2420]">{MONTHS[viewMonth]} {viewYear}</span>
              <button onClick={nextMonth} className="text-[#556B2F] text-2xl font-bold hover:text-[#6b8e23] transition px-2">&gt;</button>
            </div>
            <div className="rounded-2xl bg-white p-3" style={{ width: 392 }}>
              <div className="grid grid-cols-7 bg-[#556B2F] rounded-full mb-2">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-xs font-bold py-2 text-white tracking-wider">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {calendarCells.map((cell, i) => {
                  const isToday = cell.current && cell.day === todayDay && viewMonth === todayMonth && viewYear === todayYear;
                  const dateStr = cell.current ? formatDateStr(viewYear, viewMonth, cell.day) : "";
                  const isSelected = cell.current && dateStr === selectedDate;
                  const hasEvent = cell.current && eventDates.has(cell.day);
                  return (
                    <div
                      key={i}
                      onClick={() => { if (cell.current) setSelectedDate(dateStr); }}
                      className={
                        "flex items-center justify-center text-base font-semibold rounded-lg cursor-pointer transition select-none " +
                        (!cell.current
                          ? "bg-[#d6d2c7] text-[#aaa] "
                          : isToday
                            ? "bg-[#556B2F] text-white font-bold shadow "
                            : isSelected && !isToday
                              ? "bg-[#6b8e23] text-white font-bold shadow "
                              : hasEvent
                                ? "bg-[#d3d3c0] border-2 border-[#556B2F] text-[#2a2420] "
                                : "bg-[#d3d3c0] text-[#2a2420] hover:bg-[#c5c2b3] ")
                      }
                      style={{ height: 44, width: "100%" }}
                    >
                      {cell.day}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-4 mt-4 w-full">
              <button
                className="bg-[#556B2F] hover:bg-[#6b8e23] text-white font-semibold px-6 py-3 rounded-lg shadow transition text-base flex-1"
                onClick={() => openForm()}
              >
                Add Event
              </button>
              <button
                className="bg-[#556B2F] hover:bg-[#6b8e23] text-white font-semibold px-6 py-3 rounded-lg shadow transition text-base flex-1"
                onClick={handleModifyEvent}
              >
                Modify Event
              </button>
            </div>
          </div>
        </div>

        {/* Event Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <form
              className="bg-white border-2 border-[#556B2F] rounded-xl shadow-lg p-8 flex flex-col gap-4 w-96"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-bold text-[#556B2F] mb-2">
                {editingEvent ? "Edit Event" : "Add Event"}
              </h2>
              {formError && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {formError}
                </p>
              )}
              <input
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                placeholder="Event Title"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
              <input
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                type="date"
                value={formData.date}
                onChange={(e) => updateField("date", e.target.value)}
                required
              />
              <input
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                type="time"
                value={formData.time}
                onChange={(e) => updateField("time", e.target.value)}
                required
              />
              <input
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                required
              />
              <textarea
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23] resize-none"
                placeholder="Description"
                rows={3}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="bg-[#556B2F] hover:bg-[#6b8e23] text-white font-semibold px-4 py-2 rounded transition flex-1"
                >
                  {editingEvent ? "Save" : "Add"}
                </button>
                {editingEvent && (
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  className="bg-[#f0ece1] border border-[#556B2F] text-[#556B2F] font-semibold px-4 py-2 rounded transition hover:bg-[#e6e2d3]"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800">
                Are you sure you want to delete &ldquo;{confirmModal.eventTitle}&rdquo;?
              </h3>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeConfirmModal}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={executeConfirmedDelete}
                  className="rounded-md bg-red-700 hover:bg-red-800 px-3 py-2 text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}