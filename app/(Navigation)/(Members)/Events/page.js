"use client";

import { useState, useEffect, useMemo } from "react";
import { FloatingButton } from "../UI/FloatingButton.jsx";
import { EventInformation } from "../UI/EventInformation.jsx";

async function getEvents() {
    try {

        const baseURL =
            process.env.NEXT_PUBLIC_BASE_URL ||
            "http://localhost:3000";
        const res = await fetch(
            `${baseURL}/api/Database/events`,
            {
                cache:"no-store"
            }
        );
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
}

export default function Events() {
  const today = new Date();

  // single source of truth for viewed month
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();
  const [testEvents, setTestEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // Fetch events on mount and whenever month/year changes
  useEffect(() => {
    async function loadEvents() {
      const eventsFromApi = await getEvents();
      setTestEvents(eventsFromApi);
    }

    loadEvents();
  }, []);

  // Data structure transformation: group events by date for easy lookup
  const events = useMemo(() => {
    const grouped = {};

    for (const event of testEvents) {
      if (!event.startDatetime) continue;

      const key = new Date(event.startDatetime).toISOString().split("T")[0];

      if (!grouped[key]) grouped[key] = [];

      grouped[key].push({
        title: event.title,
        time: new Date(event.startDatetime).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
        description: event.description,
        location: event.location,
      });
    }

    return grouped;
  }, [testEvents]);

  // Get events for a specific day
  const getEventsForDay = (day) => {
    if (!day) return [];

    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events[key] || [];
  };

  const handleEventsClick = (event) => {
    setSelectedEvent(event);
  };
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let weeks = [];
  let week = new Array(firstDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  while (week.length < 7) week.push(null);
  if (!week.every((d) => d === null)) weeks.push(week);

  // Handles calender changes (next and prev month)
  const prevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  const currentMonth = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-10 py-10 mx-5 text-gray-800">

      <FloatingButton />

      {/* MINI CALENDAR */}
      <section className="w-full md:w-auto max-w-md">
        <div className="flex justify-between items-center mb-4">
          <p>{monthNames[month]} {year}</p>
          <button
            className="w-min px-5 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
            onClick={currentMonth}
          >
            Today
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2">
          <div>S</div><div>M</div><div>T</div><div>W</div>
          <div>T</div><div>F</div><div>S</div>
        </div>

        <div
          className="grid grid-cols-7 gap-2"
          style={{ gridTemplateRows: `repeat(${weeks.length}, 1fr)` }}
        >
          {weeks.map((week, i) =>
            week.map((day, j) => {
              const dayEvents = getEventsForDay(day);

              return (
                <div
                  key={`${i}-${j}`}
                  className="h-12 flex flex-col items-center justify-start"
                >
                  {day && (
                    <>
                      <span
                        className={`text-lg ${
                          day === today.getDate() &&
                          month === today.getMonth() &&
                          year === today.getFullYear()
                            ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                            : "w-8 h-8 flex items-center justify-center"
                        }`}
                      >
                        {day}
                      </span>

                      {/* reserve dot space for every day */}
                      <div className="h-2 mt-1 flex items-center justify-center">
                        {dayEvents.length > 0 && (
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>


      {/* FULL CALENDAR */}
      <section className="p-6 w-full md:w-4/5 shadow-lg rounded-lg">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {monthNames[month]} {year}
          </h2>

          <div>
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 mx-2"
              onClick={prevMonth}
            >
              Prev
            </button>

            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 mx-2"
              onClick={nextMonth}
            >
              Next
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2">
          <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
          <div>Thu</div><div>Fri</div><div>Sat</div>
        </div>

        <div className="grid grid-cols-7 gap-2"
          style={{ gridTemplateRows: `repeat(${weeks.length}, 1fr)` }}
        >
          {weeks.map((week,i) =>
            week.map((day,j) => {

              const dayEvents = getEventsForDay(day);

              return (
                <div
                  key={`${i}-${j}`}
                  className="border border-gray-300 bg-gray-50 p-2 flex flex-col items-center justify-start h-32 overflow-hidden"
                >
                  {/* DAY NUMBER AND EVENTS */}
                  {day && (
                    <>
                      <span
                        className={`font-semibold ${
                          day === today.getDate() &&
                          month === today.getMonth() &&
                          year === today.getFullYear()
                            ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                            : ""
                        }`}
                      >
                        {day}
                      </span>

                      {/* EVENTS */}
                      <div className="mt-2 flex flex-col gap-1">
                        {dayEvents.map((event, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleEventsClick(event)}
                            className="text-xs bg-blue-200 rounded px-2 py-1 truncate cursor-pointer hover:bg-blue-300"
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                </div>
              );
            })
          )}
        </div>

        {selectedEvent && (
          <EventInformation
            title={selectedEvent.title}
            time={selectedEvent.time}
            description={selectedEvent.description}
            location={selectedEvent.location}
            onClose={() => setSelectedEvent(null)}
          />
        )}

      </section>

    </div>
  );
}
