"use client";

import { useState } from "react";
import { FloatingButton } from "../UI/FloatingButton.jsx";

export default function Calendar() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // EVENTS
  const events = {
    "2026-03-08": [
      { title: "Board Meeting", time: "10:00 AM" },
      { title: "Community Lunch", time: "12:30 PM" }
    ],
    "2026-03-12": [
      { title: "Volunteer Training", time: "6:00 PM" }
    ],
    "2026-03-21": [
      { title: "Fundraiser Event", time: "7:00 PM" }
    ]
  };

  // GET EVENTS FOR DAY
  const getEventsForDay = (day) => {
    if (!day) return [];

    const key = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    return events[key] || [];
  };

  // GENERATE CALENDAR GRID
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
  if (!week.every(d => d === null)) weeks.push(week);

  const prevMonth = () => {
    setMonth(m => {
      if (m === 0) {
        setYear(y => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const nextMonth = () => {
    setMonth(m => {
      if (m === 11) {
        setYear(y => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const currentMonth = () => {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
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
          className="grid grid-cols-7 gap-2 h-50"
          style={{ gridTemplateRows: `repeat(${weeks.length}, 1fr)` }}
        >
          {weeks.map((week,i) =>
            week.map((day,j) => {

              const dayEvents = getEventsForDay(day);

              return (
                <div key={`${i}-${j}`} className="flex flex-col items-center justify-center">

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

                      {/* EVENT DOT */}
                      {dayEvents.length > 0 && (
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1"></div>
                      )}
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
                            className="text-xs bg-blue-200 rounded px-2 py-1 truncate"
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

      </section>

    </div>
  );
}
