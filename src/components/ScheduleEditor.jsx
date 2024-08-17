import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ScheduleEditor = ({ initialSchedule, onSave }) => {
  const [selectedDates, setSelectedDates] = useState(initialSchedule || []);

  const handleDateSelect = (date) => {
    const dateString = date.toISOString().split('T')[0];
    if (selectedDates.includes(dateString)) {
      setSelectedDates(selectedDates.filter(d => d !== dateString));
    } else {
      setSelectedDates([...selectedDates, dateString]);
    }
  };

  const handleSave = () => {
    onSave(selectedDates);
  };

  return (
    <Card className="w-full bg-gray-800 text-white">
      <CardHeader>
        <CardTitle>Your Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          selected={selectedDates.map(d => new Date(d))}
          onSelect={handleDateSelect}
          className="rounded-md border border-gray-700"
        />
        <Button onClick={handleSave} className="mt-4 w-full">Save Schedule</Button>
      </CardContent>
    </Card>
  );
};

export default ScheduleEditor;