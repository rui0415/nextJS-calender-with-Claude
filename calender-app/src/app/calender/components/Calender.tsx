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

  const addEvent = (title: string, date: Date) => {
    setEvents([...events, { id: events.length, title, date }]);
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
    <div>
      <h1>
        {month} {year}
      </h1>
      <button onClick={prevMonth}>Previous</button>
      <button onClick={nextMonth}>Next</button>
      <div>
        {grid.map((week, i) => (
          <div key={i}>
            {week.map((day, j) => (
              <div key={`${i}-${j}`}>
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
                    <Event
                      key={event.id}
                      event={event}
                      onUpdate={updateEvent}
                    />
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
