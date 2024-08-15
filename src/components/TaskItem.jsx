import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Code, AlertCircle } from 'lucide-react';

const TaskItem = ({ task }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="h-6 w-6" />;
      case 'Code':
        return <Code className="h-6 w-6" />;
      default:
        return <AlertCircle className="h-6 w-6" />;
    }
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