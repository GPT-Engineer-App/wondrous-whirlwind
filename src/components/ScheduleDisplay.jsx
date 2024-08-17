import React from 'react';
import { Calendar } from "@/components/ui/calendar";

const ScheduleDisplay = ({ schedule }) => {
  const today = new Date();
  const availableDates = schedule.filter(date => new Date(date) >= today);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Availability</h3>
      <Calendar
        mode="multiple"
        selected={availableDates.map(date => new Date(date))}
        className="rounded-md border"
      />
    </div>
  );
};

export default ScheduleDisplay;