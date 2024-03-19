"use client";

import React, { useState } from "react";

interface EventProps {
  event: {
    id: number;
    title: string;
    date: Date;
  };
  onUpdate: (id: number, updatedEvent: { title: string; date: Date }) => void;
}

const Event: React.FC<EventProps> = ({ event, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(event.title);
  const [updatedDate, setUpdatedDate] = useState(event.date);

  const handleUpdate = () => {
    onUpdate(event.id, { title: updatedTitle, date: updatedDate });
    setIsEditing(false);
  };

  return isEditing ? (
    <div>
      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
      <input
        type="date"
        value={updatedDate.toISOString().split("T")[0]}
        onChange={(e) => setUpdatedDate(new Date(e.target.value))}
      />
      <button onClick={handleUpdate}>更新</button>
    </div>
  ) : (
    <div onClick={() => setIsEditing(true)}>
      {event.title} ({event.date.toLocaleDateString()})
    </div>
  );
};

export default Event;
