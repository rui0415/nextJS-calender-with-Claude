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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setUpdatedTitle(e.target.value)}
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
