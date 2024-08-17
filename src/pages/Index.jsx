import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ThumbsUp, MessageSquare, Share2, Trophy, Users, Activity } from 'lucide-react';

const fetchDashboardData = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    events: [
      { id: 1, name: 'Team meeting', date: '2023-06-15', description: 'Weekly team sync-up' },
      { id: 2, name: 'React Conference', date: '2023-07-01', description: 'Annual React developers conference' },
    ],
    communityActivity: [
      { id: 1, type: 'post', content: 'New discussion: React hooks', community: 'React Devs', user: 'John Doe', likes: 15, comments: 7 },
      { id: 2, type: 'challenge', content: '30-day coding challenge', community: 'Full Stack Devs', user: 'Jane Smith', likes: 32, comments: 12 },
    ],
    recentActivity: [
      { id: 1, user: 'Charlotte Parker', content: 'Completed Chapter 12', time: '4h' },
      { id: 2, user: 'Tonya Gray', content: "Started new project", time: '2h' },
    ],
    challenges: [
      { id: 1, name: 'Coding Sprint', participants: 1500, daysLeft: 20 },
      { id: 2, name: 'UI/UX Challenge', participants: 800, daysLeft: 5 },
    ],
  };
};

const DashboardCard = ({ title, icon: Icon, children }) => (
  <Card className="bg-gray-800 h-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const Index = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div className="p-4 text-center">Loading dashboard...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Error loading dashboard</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Home Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <DashboardCard title="Upcoming Events" icon={CalendarIcon}>
          <ul className="space-y-2">
            {data.events.slice(0, 2).map((event) => (
              <li key={event.id} className="text-sm">
                <div className="font-semibold">{event.name}</div>
                <div className="text-gray-400">{event.date}</div>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard title="Community Activity" icon={Users}>
          <ul className="space-y-2">
            {data.communityActivity.slice(0, 2).map((activity) => (
              <li key={activity.id} className="text-sm">
                <div className="font-semibold">{activity.content}</div>
                <div className="text-gray-400">{activity.community}</div>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard title="Active Challenges" icon={Trophy}>
          <ul className="space-y-2">
            {data.challenges.map((challenge) => (
              <li key={challenge.id} className="text-sm">
                <div className="font-semibold">{challenge.name}</div>
                <div className="text-gray-400">
                  {challenge.participants} participants | {challenge.daysLeft} days left
                </div>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard title="Recent Activity" icon={Activity}>
          <ul className="space-y-2">
            {data.recentActivity.map((activity) => (
              <li key={activity.id} className="text-sm flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={`https://source.unsplash.com/random/100x100?face=${activity.id}`} />
                  <AvatarFallback>{activity.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-semibold">{activity.user}</span>
                  <span className="text-gray-400 ml-1">{activity.content}</span>
                </div>
              </li>
            ))}
          </ul>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Index;