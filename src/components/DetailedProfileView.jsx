import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { MessageSquare, UserPlus, Calendar as CalendarIcon } from 'lucide-react';

const fetchUserProfile = async (userId) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    id: userId,
    name: `User ${userId}`,
    avatar: `https://source.unsplash.com/random/100x100?face=${userId}`,
    bio: "Passionate about technology and innovation.",
    interests: ["React", "AI", "Hiking", "Photography"],
    occupation: "Software Developer",
    location: "San Francisco, CA",
    availability: [new Date(2023, 5, 15), new Date(2023, 5, 18), new Date(2023, 5, 20)],
  };
};

const DetailedProfileView = ({ userId, onClose }) => {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId),
  });

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile: {error.message}</div>;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{profile.name}</CardTitle>
            <p className="text-gray-400">{profile.occupation}</p>
          </div>
        </div>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Bio</h3>
          <p>{profile.bio}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <Badge key={index} variant="secondary">{interest}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Location</h3>
          <p>{profile.location}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Availability</h3>
          <Calendar
            mode="multiple"
            selected={profile.availability}
            className="rounded-md border"
          />
        </div>
        <div className="flex justify-between">
          <Button className="w-1/2 mr-2">
            <MessageSquare className="mr-2 h-4 w-4" /> Message
          </Button>
          <Button className="w-1/2 ml-2">
            <UserPlus className="mr-2 h-4 w-4" /> Add Friend
          </Button>
        </div>
        <Button className="w-full">
          <CalendarIcon className="mr-2 h-4 w-4" /> Schedule Meeting
        </Button>
      </CardContent>
    </Card>
  );
};

export default DetailedProfileView;