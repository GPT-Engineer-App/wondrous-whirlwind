import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ChallengeCard = ({ challenge, onJoin }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{challenge.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <Badge variant="secondary" className="mb-2">
        {challenge.community ? 'Community Challenge' : 'Global Challenge'}
      </Badge>
      {challenge.community && (
        <p className="text-sm text-gray-300 mb-2">Community: {challenge.community}</p>
      )}
      <p className="text-sm text-gray-300 mb-2">
        {challenge.startDate} - {challenge.endDate}
      </p>
      <Progress value={challenge.progress} className="mb-2" />
      <p className="text-sm text-gray-300 mb-4">{challenge.participants} participants</p>
      <Button onClick={() => onJoin(challenge.id)}>Join Challenge</Button>
    </CardContent>
  </Card>
);

export default ChallengeCard;