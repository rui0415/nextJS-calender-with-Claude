"use client";

import React, { useState } from "react";
import Event from "./Event";

interface Event {
  id: number;
  title: string;
  date: Date;
}

export default function Calender() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState(new Date());

  const addEvent = () => {
    if (newTitle.trim() === "") {
      alert("タイトルを入力してください");
      return;
    }
    setEvents([
      ...events,
      { id: events.length, title: newTitle, date: newDate },
    ]);
    setNewTitle("");
    setShowAddForm(false);
  };

  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  // 現在の月の最初の日を取得
  const startDate = new Date(year, date.getMonth(), 1);
  // 最初の日の曜日を取得 (0: 日曜日, 1: 月曜日, ..., 6: 土曜日)
  const startDay = startDate.getDay();

  // 現在の月の最後の日を取得
  const endDate = new Date(year, date.getMonth() + 1, 0);
  // 最後の日の日付を取得
  const endDay = endDate.getDate();

  // 日付のグリッドを生成
  const grid = [];
  let day = 1;
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        // 最初の週の空白部分
        week.push("");
      } else if (day > endDay) {
        // 最後の週の空白部分
        week.push("");
      } else {
        week.push(day);
        day++;
      }
    }
    grid.push(week);
  }

  const updateEvent = (
    id: number,
    updatedEvent: { title: string; date: Date }
  ) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-cyan-400">
          {month} {year}
        </h1>
        <div>
          <button
            onClick={prevMonth}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Previous
          </button>
          <button
            onClick={nextMonth}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {grid.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, j) => (
              <div
                key={`${i}-${j}`}
                className="p-2 bg-gray-200 rounded-lg text-center text-gray-400"
              >
                {day}
                {events
                  .filter((event) => {
                    const eventDate = new Date(
                      year,
                      date.getMonth(),
                      parseInt(day as string)
                    );
                    return (
                      day !== "" &&
                      event.date.toDateString() === eventDate.toDateString()
                    );
                  })
                  .map((event) => (
                    <div
                      key={event.id}
                      className="bg-blue-500 text-white rounded-md p-1 mt-1"
                    >
                      <Event event={event} onUpdate={updateEvent} />
                    </div>
                  ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div>
        {!showAddForm ? (
          <div className="flex justify-center py-4">
            <button
              className="bg-green-400 text-white px-4 py-2 rounded-md duration-300 hover:bg-green-500"
              onClick={() => setShowAddForm(true)}
            >
              予定を追加
            </button>
          </div>
        ) : (
          <div className="justify-center mt-3">
            <input
              type="text"
              placeholder="予定のタイトル"
              value={newTitle}
              className="appearance-none block w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md dark:bg-gray-200 dark:text-gray dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="date"
              value={newDate.toISOString().split("T")[0]}
              className="appearance-non block w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md dark:bg-gray-200 dark:text-gray dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 my-1"
              onChange={(e) => setNewDate(new Date(e.target.value))}
            />
            <div className="flex justify-between">
              <button
                className="bg-green-400 text-white px-4 py-2 rounded-md duration-300 hover:bg-green-500"
                onClick={addEvent}
              >
                追加
              </button>
              <button
                className="bg-red-300 text-white px-4 py-2 rounded-md duration-300 hover:bg-red-400"
                onClick={() => setShowAddForm(false)}
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
