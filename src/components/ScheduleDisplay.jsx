import React from 'react';
import { Calendar } from "@/components/ui/calendar";

const ScheduleDisplay = ({ schedule }) => {
  const today = new Date();
  
  // Check if schedule is undefined or not an array
  if (!Array.isArray(schedule)) {
    return <p>No schedule available</p>;
  }

  const availableDates = schedule.filter(date => new Date(date) >= today);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Availability</h3>
      {availableDates.length > 0 ? (
        <Calendar
          mode="multiple"
          selected={availableDates.map(date => new Date(date))}
          className="rounded-md border"
        />
      ) : (
        <p>No upcoming available dates</p>
      )}
    </div>
  );
};

export default ScheduleDisplay;