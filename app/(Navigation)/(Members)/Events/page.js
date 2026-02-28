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

  // Generate calendar grid
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

  if (!week.every(day => day === null)) {
    weeks.push(week);
  }

  const prevMonth = () => {
    setMonth(m => {
      if (m === 0) {
        setYear(year - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const currentMonth = () => {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  }

  const nextMonth = () => {
    setMonth(m => {
      if (m === 11) {
        setYear(year + 1);
        return 0;
      }
      return m + 1;
    });
  };
 
  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-10 py-10 mx-5 text-gray-800">
        <FloatingButton />
        <div className="w-full md:w-auto max-w-md">
            <div className="flex justify-between items-center mb-4">
                <p>{monthNames[month]} {year}</p>
                <button className="w-min px-5 bg-blue-500 text-white rounded-2xl hover:bg-blue-600" onClick={currentMonth}>Today</button>
            </div>

            <div className="w-full">
                <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2 ">
                    <div>S</div><div>M</div><div>T</div><div>W</div>
                    <div>T</div><div>F</div><div>S</div>
                </div>
                <div
                className="grid grid-cols-7 h-50 gap-2"
                style={{
                    gridTemplateRows: `repeat(${weeks.length}, 1fr)`
                }}
                >
                {weeks.map((week, i) =>
                    week.map((day, j) => (
                    <div
                        key={`${i}-${j}`}
                        className="flex items-center justify-center"
                    >
                        {day && (
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
                        )}
                    </div>
                    ))
                )}
                </div>
            </div>
        </div>
        <div className="p-6 w-full md:w-4/5 h-auto shadow-lg rounded-lg text-grey-500 ">

            {/* HEADER */}
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

            {/* DAYS OF WEEK HEADER */}
            <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
                <div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            {/* CALENDAR GRID */}
            <div className="h-150">
                <div
                className="grid grid-cols-7 h-full"
                style={{
                    gridTemplateRows: `repeat(${weeks.length}, 1fr)`
                }}
                >
                {weeks.map((week, i) =>
                    week.map((day, j) => (
                    <div
                        key={`${i}-${j}`}
                        className="flex justify-center border border-gray-300 bg-gray-50"
                    >
                        {day && (
                        <span
                            className={`text-lg ${
                            day === today.getDate() &&
                            month === today.getMonth() &&
                            year === today.getFullYear()
                                ? "bg-blue-500 text-white font-bold rounded-4xl h-8 w-8 flex items-center justify-center"
                                : ""
                            }`}
                        >
                            {day}
                        </span>
                        )}
                    </div>
                    ))
                )}
                </div>
            </div>
        </div>
    </div>
  );
}
