import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ThumbsUp, MessageSquare, Share2, Trophy } from 'lucide-react';

const fetchDashboardData = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    events: [
      { id: 1, name: 'Team meeting', date: '2023-06-15', description: 'Weekly team sync-up' },
      { id: 2, name: 'React Conference', date: '2023-07-01', description: 'Annual React developers conference' },
    ],
    communityActivity: [
      { id: 1, type: 'post', content: 'New discussion: Best practices for React hooks', community: 'React Developers', user: 'John Doe', likes: 15, comments: 7 },
      { id: 2, type: 'challenge', content: '30-day coding challenge: Build a full-stack app', community: 'Full Stack Developers', user: 'Jane Smith', likes: 32, comments: 12 },
    ],
    recentActivity: [
      { id: 1, user: 'Charlotte Parker', content: 'Anyone else really love chapter 12?', time: '4h' },
      { id: 2, user: 'Tonya Gray', content: "I'm not there yet, wait for meeeee!", time: '4h' },
    ],
    challenges: [
      { id: 1, name: '30-Day Coding Sprint', participants: 1500, daysLeft: 20 },
      { id: 2, name: 'UI/UX Design Challenge', participants: 800, daysLeft: 5 },
      { id: 3, name: 'Data Science Hackathon', participants: 1200, daysLeft: 15 },
    ],
  };
};

const Index = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div className="p-4">Loading dashboard...</div>;
  if (isError) return <div className="p-4">Error loading dashboard</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 space-y-6 pb-16 md:pb-0">
      <h1 className="text-3xl font-bold mb-6">Home Dashboard</h1>

      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.events.map((event) => (
            <div key={event.id} className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{event.name}</h3>
                <p className="text-sm text-gray-400">{event.description}</p>
              </div>
              <Badge variant="secondary">
                <CalendarIcon className="mr-1 h-3 w-3" />
                {event.date}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Community Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.communityActivity.map((activity) => (
            <div key={activity.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{activity.user}</span>
                <Badge>{activity.community}</Badge>
              </div>
              <p className="text-sm">{activity.content}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" /> {activity.likes}
                </span>
                <span className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" /> {activity.comments}
                </span>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Active Challenges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.challenges.map((challenge) => (
            <div key={challenge.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{challenge.name}</h3>
                <p className="text-sm text-gray-400">{challenge.participants} participants</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-1">
                  <Trophy className="mr-1 h-3 w-3" />
                  {challenge.daysLeft} days left
                </Badge>
                <Button size="sm">Join</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {data.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 mb-4">
              <Avatar>
                <AvatarImage src={`https://source.unsplash.com/random/100x100?face=${activity.id}`} />
                <AvatarFallback>{activity.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="font-semibold">{activity.user}</p>
                <p className="text-sm text-gray-400">{activity.content}</p>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;