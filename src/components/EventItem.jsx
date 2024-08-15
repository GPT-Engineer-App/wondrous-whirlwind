import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from 'lucide-react';

const EventItem = ({ event }) => {
  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Calendar className="h-6 w-6" />
        <div>
          <CardTitle>{event.name}</CardTitle>
          <CardDescription>{event.date}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{event.description}</p>
        <p className="text-sm text-gray-500 mt-2">Location: {event.location}</p>
      </CardContent>
    </Card>
  );
};

export default EventItem;