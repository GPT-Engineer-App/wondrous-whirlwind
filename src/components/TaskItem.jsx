import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TaskItem = ({ task }) => {
  // Placeholder function for icons
  const getIcon = (iconName) => {
    // This function now returns a simple placeholder
    return <span className="w-6 h-6 inline-block bg-gray-300 rounded-full mr-2"></span>;
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center space-x-4">
        {getIcon(task.icon)}
        <div>
          <CardTitle>{task.name}</CardTitle>
          <CardDescription>{task.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          {task.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <p className="text-sm text-gray-500">Community: {task.community}</p>
        <p className="text-sm text-gray-500">Friends: {task.friends.join(', ')}</p>
      </CardContent>
    </Card>
  );
};

export default TaskItem;