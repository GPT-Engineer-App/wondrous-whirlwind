import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const CommunityOverview = ({ communities, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="bg-gray-800">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Communities</h2>
        <Button>Create a Community</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities?.map((community) => (
          <Card key={community.id} className="bg-gray-800">
            <CardHeader>
              <CardTitle>{community.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={community.image} alt={community.name} className="w-full h-40 object-cover mb-2 rounded" />
              <p>{community.description}</p>
              <p className="text-sm text-gray-400 mt-2">{community.memberCount} members</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Join Community</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityOverview;