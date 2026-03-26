"use client";
import React, { useState, useMemo } from "react";


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

export default function EventManagerPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    formatDateStr(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const [events, setEvents] = useState([
    { id: 1, name: "Picnic Event", date: "2026-08-05", time: "3:30pm", where: "XXXXX, Calgary", sponsor: "________" },
    { id: 2, name: "Zumba Night", date: "2026-08-28", time: "3:30pm", where: "XXXXX, Calgary", sponsor: "_____" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({ name: "", date: "", time: "", where: "", sponsor: "" });

  // Calendar data
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  // Previous month fill
  const prevMonthDays = getDaysInMonth(viewYear, viewMonth === 0 ? 11 : viewMonth - 1);
  const prevFill = Array.from({ length: firstDay }, (_, i) => ({
    day: prevMonthDays - firstDay + 1 + i,
    current: false,
  }));
  // Current month
  const currDays = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    current: true,
  }));
  // Next month fill
  const totalCells = prevFill.length + currDays.length;
  const nextFill = Array.from({ length: (7 - (totalCells % 7)) % 7 }, (_, i) => ({
    day: i + 1,
    current: false,
  }));
  const calendarCells = [...prevFill, ...currDays, ...nextFill];

  // Event dates for highlighting on calendar
  const eventDates = useMemo(() => {
    const set = new Set();
    events.forEach(ev => {
      const d = new Date(ev.date);
      if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
        set.add(d.getDate());
      }
    });
    return set;
  }, [events, viewYear, viewMonth]);

  // Today info
  const todayStr = formatDateStr(today.getFullYear(), today.getMonth(), today.getDate());
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Selected date info
  const selParts = selectedDate.split("-").map(Number);
  const selDayName = dayName(selParts[0], selParts[1] - 1, selParts[2]);
  const selMonthName = MONTHS[selParts[1] - 1];
  const selLabel = `${selDayName}, ${selMonthName} ${selParts[2]}`;

  // Upcoming events (from selected date on, sorted)
  const upcomingEvents = useMemo(() => {
    return events
      .filter(ev => ev.date >= selectedDate)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events, selectedDate]);

  // Navigate months
  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  // Add Event
  const handleAddEvent = () => {
    setFormData({ name: "", date: selectedDate, time: "", where: "", sponsor: "" });
    setEditingEvent(null);
    setShowForm(true);
  };

  // Modify Event — pick the first upcoming event or open blank
  const handleModifyEvent = () => {
    if (upcomingEvents.length > 0) {
      const ev = upcomingEvents[0];
      setFormData({ name: ev.name, date: ev.date, time: ev.time, where: ev.where, sponsor: ev.sponsor });
      setEditingEvent(ev);
      setShowForm(true);
    } else {
      handleAddEvent();
    }
  };

  const handleEditEvent = (ev) => {
    setFormData({ name: ev.name, date: ev.date, time: ev.time, where: ev.where, sponsor: ev.sponsor });
    setEditingEvent(ev);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(events.map(ev => ev.id === editingEvent.id ? { ...editingEvent, ...formData } : ev));
    } else {
      setEvents([...events, { id: Date.now(), ...formData }]);
    }
    setShowForm(false);
  };

  const handleDelete = () => {
    if (editingEvent) {
      setEvents(events.filter(ev => ev.id !== editingEvent.id));
    }
    setShowForm(false);
  };

  const handleCancel = () => setShowForm(false);

  return (
    <div className="min-h-screen bg-[#f0ece1] flex flex-col font-sans">
      <main className="flex-1 flex flex-col items-center py-10">
        {/* Section Header */}
        <div className="w-full max-w-5xl mx-auto mb-4 flex flex-col items-center">
          <div className="flex items-center w-full justify-between mb-1">
            <hr className="flex-1 border-t border-[#556B2F] mx-4" />
            <span className="text-3xl font-serif font-bold italic text-[#556B2F] tracking-wide underline underline-offset-4">EVENTS MANAGER</span>
            <hr className="flex-1 border-t border-[#556B2F] mx-4" />
          </div>
          <span className="text-sm text-[#2a2420] mt-2 cursor-pointer hover:underline">Access All Events</span>
        </div>

        {/* Main Content: Left (events) + Right (calendar) */}
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-4 px-4">
          {/* Left Side */}
          <div className="flex-1 flex flex-col">
            {/* Selected Date label */}
            <div className="mb-4">
              <div className="inline-block border border-[#2a2420] rounded-full px-6 py-2">
                <span className="font-serif text-lg font-semibold text-[#2a2420]">{selLabel}</span>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="border border-[#2a2420] rounded-lg p-4 bg-white min-h-[280px]">
              <h3 className="font-serif text-xl text-center underline underline-offset-4 font-semibold text-[#2a2420] mb-4">Upcoming Events</h3>
              {upcomingEvents.length === 0 && (
                <p className="text-sm text-[#888] text-center mt-8">No upcoming events.</p>
              )}
              {upcomingEvents.map(ev => {
                const d = new Date(ev.date + "T00:00:00");
                const monthName = MONTHS[d.getMonth()];
                return (
                  <div
                    key={ev.id}
                    className="border-b border-[#ccc] py-3 px-2 cursor-pointer hover:bg-[#f7f7d6] transition rounded"
                    onClick={() => handleEditEvent(ev)}
                  >
                    <div className="font-semibold text-[#2a2420]">{ev.name}</div>
                    <div className="text-sm text-[#2a2420]">
                      Date &amp; Time: {monthName} {String(d.getDate()).padStart(2, "0")}, {d.getFullYear()} {ev.time}
                    </div>
                    <div className="text-sm text-[#2a2420]">Where: {ev.where}</div>
                    <div className="text-sm text-[#2a2420]">Sponsored by: {ev.sponsor}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Calendar */}
          <div className="flex flex-col items-center">
            {/* Month/Year header with nav */}
            <div className="flex items-center gap-4 mb-3">
              <button onClick={prevMonth} className="text-[#556B2F] text-2xl font-bold hover:text-[#6b8e23] transition px-2">&lt;</button>
              <span className="font-serif text-3xl font-bold text-[#2a2420]">{MONTHS[viewMonth]} {viewYear}</span>
              <button onClick={nextMonth} className="text-[#556B2F] text-2xl font-bold hover:text-[#6b8e23] transition px-2">&gt;</button>
            </div>
            {/* Calendar Grid */}
            <div className="rounded-2xl bg-white p-3" style={{ width: 392 }}>
              {/* Day headers */}
              <div className="grid grid-cols-7 bg-[#556B2F] rounded-full mb-2">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-xs font-bold py-2 text-white tracking-wider">{d}</div>
                ))}
              </div>
              {/* Calendar rows */}
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
                                : "bg-[#d3d3c0] text-[#2a2420] hover:bg-[#c5c2b3] "
                        )
                      }
                      style={{ height: 44, width: "100%" }}
                    >
                      {cell.day}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Add / Modify Buttons under calendar */}
            <div className="flex gap-4 mt-4 w-full">
              <button
                className="bg-[#556B2F] hover:bg-[#6b8e23] text-white font-semibold px-6 py-3 rounded-lg shadow transition text-base flex-1"
                onClick={handleAddEvent}
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
            <form className="bg-white border-2 border-[#556B2F] rounded-xl shadow-lg p-8 flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold text-[#556B2F] mb-2">{editingEvent ? "Edit Event" : "Add Event"}</h2>
              <input
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                placeholder="Event Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                type="date"
                placeholder="Date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                required
              />
              <input
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                placeholder="Time (e.g. 3:30pm)"
                value={formData.time}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
                required
              />
              <input
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                placeholder="Where"
                value={formData.where}
                onChange={e => setFormData({ ...formData, where: e.target.value })}
                required
              />
              <input
                className="border border-[#556B2F] rounded px-3 py-2 text-[#2a2420] focus:outline-none focus:border-[#6b8e23]"
                placeholder="Sponsored by"
                value={formData.sponsor}
                onChange={e => setFormData({ ...formData, sponsor: e.target.value })}
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
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
