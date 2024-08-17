import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CheckCircle, Clock, AlertTriangle, Calendar as CalendarIcon, Plus, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

const fetchDashboardData = async (userId) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    tasks: [
      { id: 1, name: 'Complete project proposal', status: 'pending', description: 'Finish the project proposal for the new client', tags: ['urgent', 'client', 'proposal'], community: 'Project Managers', friends: ['Alice', 'Bob'] },
      { id: 2, name: 'Review code changes', status: 'completed', description: 'Review and approve the latest code changes', tags: ['code', 'review', 'collaboration'], community: 'Developers', friends: ['Charlie', 'Diana'] },
      { id: 3, name: 'Prepare presentation', status: 'overdue', description: 'Prepare slides for the upcoming conference', tags: ['presentation', 'conference'], community: 'Public Speakers', friends: ['Eve', 'Frank'] },
    ],
    events: [
      { id: 1, name: 'Team meeting', date: '2023-06-15', description: 'Weekly team sync-up', location: 'Conference Room A' },
      { id: 2, name: 'React Conference', date: '2023-07-01', description: 'Annual React developers conference', location: 'Convention Center' },
      { id: 3, name: 'Project Deadline', date: '2023-06-30', description: 'Final submission for the client project', location: 'Online' },
    ],
    communityActivity: [
      { id: 1, type: 'post', content: 'New discussion: Best practices for React hooks', community: 'React Developers', user: 'John Doe', likes: 15, comments: 7 },
      { id: 2, type: 'challenge', content: '30-day coding challenge: Build a full-stack app', community: 'Full Stack Developers', user: 'Jane Smith', likes: 32, comments: 12 },
      { id: 3, type: 'discussion', content: 'How to optimize database queries for large datasets?', community: 'Database Experts', user: 'Mike Johnson', likes: 8, comments: 5 },
    ],
    stats: {
      tasksCompleted: 25,
      tasksPending: 10,
      tasksOverdue: 3,
      progress: 543,
      totalPages: 1235,
      timeSpent: '6:24',
      streak: 7,
      level: 2,
      badges: ['badge1', 'badge2', 'badge3'],
    },
    leaderboard: [
      { id: 1, name: 'Amy Winnar', points: 88242 },
      { id: 2, name: 'CarsonP', points: 88230 },
      { id: 3, name: 'Shamansthebest', points: 88205 },
    ],
    recentActivity: [
      { id: 1, user: 'Charlotte Parker', content: 'Anyone else really really love chapter 12?', time: '4h' },
      { id: 2, user: 'Tonya Gray', content: "I'm not there yet, wait for meeeee!", time: '4h' },
      { id: 3, user: 'Amy Winnar', content: 'When they revealed who Luna was at 30:00? The twist was so beautiful', time: '2h' },
    ],
  };
};

const Dashboard = ({ userId }) => {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState({ name: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardData', userId],
    queryFn: () => fetchDashboardData(userId),
  });

  const addTaskMutation = useMutation({
    mutationFn: async (task) => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...task, id: Date.now(), status: 'pending' };
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData(['dashboardData', userId], (oldData) => ({
        ...oldData,
        tasks: [...(oldData?.tasks || []), newTask],
      }));
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: async (task) => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return task;
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(['dashboardData', userId], (oldData) => ({
        ...oldData,
        tasks: oldData?.tasks?.map(t => t.id === updatedTask.id ? updatedTask : t) || [],
      }));
      setEditingTask(null);
    },
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    addTaskMutation.mutate(newTask);
    setNewTask({ name: '', description: '' });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    editTaskMutation.mutate(editingTask);
  };

  if (isLoading) return <div>Loading dashboard...</div>;
  if (isError) return <div>Error loading dashboard: {error.message}</div>;

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Home Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="bg-blue-600">
          <CardHeader>
            <CardTitle>Tasks Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle className="mr-2" />
                <span>Completed: {data.stats.tasksCompleted}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span>Pending: {data.stats.tasksPending}</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="mr-2" />
                <span>Overdue: {data.stats.tasksOverdue}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-600">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.stats.progress}</p>
            <p>Out of {data.stats.totalPages} pages</p>
            <div className="w-full bg-green-300 rounded-full h-2.5 mt-2">
              <div className="bg-green-800 h-2.5 rounded-full" style={{ width: `${(data.stats.progress / data.stats.totalPages) * 100}%` }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-600">
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            {data.stats.badges.map((badge, index) => (
              <Badge key={index} variant="secondary">{badge}</Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border mb-4"
            />
            {data.events.slice(0, 3).map((event) => (
              <div key={event.id} className="mb-2 p-2 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{event.name}</h3>
                  <span className="text-sm">{event.date}</span>
                </div>
                <p className="text-sm text-gray-400">{event.description}</p>
              </div>
            ))}
            <Button className="w-full mt-2">
              <CalendarIcon className="mr-2 h-4 w-4" /> View All Events
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {data.communityActivity.map((activity) => (
              <div key={activity.id} className="mb-4 p-3 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{activity.user}</span>
                  <Badge>{activity.community}</Badge>
                </div>
                <p className="text-sm mb-2">{activity.content}</p>
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
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              {data.tasks.filter(task => task.status === 'pending').map((task) => (
                <div key={task.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{task.name}</h3>
                  <p className="mb-2">{task.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <Button onClick={() => handleEditTask(task)} className="mt-2">Edit</Button>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="completed">
              {data.tasks.filter(task => task.status === 'completed').map((task) => (
                <div key={task.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{task.name}</h3>
                  <p className="mb-2">{task.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="overdue">
              {data.tasks.filter(task => task.status === 'overdue').map((task) => (
                <div key={task.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{task.name}</h3>
                  <p className="mb-2">{task.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <Button onClick={() => handleEditTask(task)} className="mt-2">Edit</Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>
          <form onSubmit={handleAddTask} className="mt-4">
            <Input
              type="text"
              placeholder="New task name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="mb-2"
            />
            <Textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="mb-2"
            />
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {data.recentActivity.map((activity) => (
            <div key={activity.id} className="mb-4">
              <div className="flex items-center mb-2">
                <Avatar className="mr-2">
                  <AvatarImage src={`https://source.unsplash.com/random/100x100?face=${activity.id}`} />
                  <AvatarFallback>{activity.user[0]}</AvatarFallback>
                </Avatar>
                <span className="font-bold">{activity.user}</span>
                <span className="ml-auto text-sm text-gray-400">{activity.time}</span>
              </div>
              <p>{activity.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;