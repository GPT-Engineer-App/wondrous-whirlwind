import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";

const TaskItem = ({ task }) => {
  const IconComponent = Icons[task.icon] || Icons.default;

  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center space-x-4">
        <IconComponent className="h-6 w-6" />
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