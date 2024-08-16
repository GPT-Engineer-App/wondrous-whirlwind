import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { Plus, Clock, Zap, Award, Users } from 'lucide-react';

const fetchDashboardData = async (userId) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    currentBook: {
      title: "War and Peace",
      progress: 543,
      totalPages: 1225,
      friends: [
        { id: 1, avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, avatar: "https://i.pravatar.cc/150?img=2" },
        { id: 3, avatar: "https://i.pravatar.cc/150?img=3" },
        { id: 4, avatar: "https://i.pravatar.cc/150?img=4" },
        { id: 5, avatar: "https://i.pravatar.cc/150?img=5" },
      ]
    },
    readingTime: {
      hours: 6,
      minutes: 24,
      percentage: 23
    },
    streak: 7,
    level: {
      current: 2,
      pointsToNextLevel: 143
    },
    badges: [
      { id: 1, icon: "🏆" },
      { id: 2, icon: "📚" },
      { id: 3, icon: "🌟" }
    ],
    leaderboard: [
      { id: 1, name: "Amy Winaar", points: 88242 },
      { id: 2, name: "CarsonP", points: 88230 },
      { id: 3, name: "Shawninthebest", points: 88205 }
    ],
    activities: [
      { id: 1, user: "Charlotte Parker", avatar: "https://i.pravatar.cc/150?img=6", message: "Anyone else really really love chapter 12?", time: "4h" },
      { id: 2, user: "Tonya Gray", avatar: "https://i.pravatar.cc/150?img=7", message: "I'm not there yet, wait for meeeee!", time: "4h" },
      { id: 3, user: "Amy Winaar", avatar: "https://i.pravatar.cc/150?img=8", message: "When they revealed who it was for 30min? The twist was so beautiful", time: "2h" },
      { id: 4, user: "Brittany Sullivan", avatar: "https://i.pravatar.cc/150?img=9", message: "Wait until you get to 14..... 😱", time: "3h" }
    ]
  };
};

const Dashboard = ({ userId }) => {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState({ name: '', description: '' });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardData', userId],
    queryFn: () => fetchDashboardData(userId),
  });

  if (isLoading) return <div>Loading dashboard...</div>;
  if (isError) return <div>Error loading dashboard: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {data.currentBook.title}
            </CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.currentBook.progress} <span className="text-xs font-normal">out of {data.currentBook.totalPages} pages</span></div>
            <p className="text-xs text-muted-foreground">
              {Math.round((data.currentBook.progress / data.currentBook.totalPages) * 100)}% among friends
            </p>
            <div className="flex mt-4 space-x-1">
              {data.currentBook.friends.map(friend => (
                <Avatar key={friend.id} className="w-6 h-6">
                  <img src={friend.avatar} alt="Friend avatar" />
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.readingTime.hours}:{data.readingTime.minutes.toString().padStart(2, '0')}</div>
              <p className="text-xs text-muted-foreground">
                {data.readingTime.percentage}% increase from last week
              </p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.streak}</div>
              <p className="text-xs text-muted-foreground">
                Day streak, keep it up!
              </p>
            </CardContent>
          </Card>
          <Card className="bg-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.level.current}</div>
              <p className="text-xs text-muted-foreground">
                {data.level.pointsToNextLevel} reader points to next level
              </p>
            </CardContent>
          </Card>
          <Card className="bg-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                {data.badges.map(badge => (
                  <Badge key={badge.id} variant="secondary">{badge.icon}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            {data.leaderboard.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <span className="font-bold mr-2">#{index + 1}</span>
                  <Avatar className="w-8 h-8 mr-2">
                    <img src={`https://i.pravatar.cc/150?img=${10 + index}`} alt={user.name} />
                  </Avatar>
                  <span>{user.name}</span>
                </div>
                <span>{user.points.toLocaleString()} points</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>All activity</CardTitle>
          </CardHeader>
          <CardContent>
            {data.activities.map(activity => (
              <div key={activity.id} className="flex items-start space-x-4 py-2">
                <Avatar className="w-10 h-10">
                  <img src={activity.avatar} alt={activity.user} />
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{activity.user}</p>
                  <p className="text-sm text-gray-400">{activity.message}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;