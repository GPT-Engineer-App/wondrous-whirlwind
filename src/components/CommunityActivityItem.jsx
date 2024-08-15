import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

const CommunityActivityItem = ({ activity }) => {
  const IconComponent = Icons[activity.type] || Icons.default;

  return (
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center space-x-4">
        <IconComponent className="h-6 w-6" />
        <div>
          <CardTitle>{activity.title}</CardTitle>
          <CardDescription>{activity.timestamp}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{activity.description}</p>
        <p className="text-sm text-gray-500 mt-2">Community: {activity.community}</p>
      </CardContent>
    </Card>
  );
};

export default CommunityActivityItem;