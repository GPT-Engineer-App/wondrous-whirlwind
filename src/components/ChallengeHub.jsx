import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";

const ChallengeHub = ({ challenges, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="bg-gray-800">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Active Challenges</h2>
      <div className="space-y-4">
        {challenges?.map((challenge) => (
          <Card key={challenge.id} className="bg-gray-800">
            <CardHeader>
              <CardTitle>{challenge.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Start Date: {challenge.startDate}</p>
              <p>End Date: {challenge.endDate}</p>
              <p>Participants: {challenge.participantCount}</p>
              <div className="mt-2">
                <Progress value={challenge.progress} className="w-full" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Join Challenge</Button>
              <Button variant="outline">View Leaderboard</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChallengeHub;