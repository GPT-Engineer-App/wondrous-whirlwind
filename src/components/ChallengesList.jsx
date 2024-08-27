import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const ChallengesList = ({ challenges, visibility }) => {
  if (!challenges || challenges.length === 0) {
    return <p>No challenges joined yet.</p>;
  }

  return (
    <div className="space-y-4">
      {challenges.map((challenge) => (
        <Card key={challenge.id} className="bg-gray-800">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{challenge.name}</span>
              <Badge>{challenge.status}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-2">{challenge.description}</p>
            <div className="flex justify-between items-center mb-2">
              <span>Progress</span>
              <span>{challenge.progress}%</span>
            </div>
            <Progress value={challenge.progress} className="w-full" />
            <p className="text-sm text-gray-400 mt-2">
              Visibility: {visibility}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChallengesList;