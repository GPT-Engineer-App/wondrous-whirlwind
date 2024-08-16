import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

const fetchDashboardData = async (userId) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    tasks: [
      { id: 1, name: 'Complete project proposal', status: 'in-progress', description: 'Finish the project proposal for the new client', tags: ['urgent', 'client', 'proposal'], community: 'Project Managers', friends: ['Alice', 'Bob'] },
      { id: 2, name: 'Review code changes', status: 'pending', description: 'Review and approve the latest code changes', tags: ['code', 'review', 'collaboration'], community: 'Developers', friends: ['Charlie', 'Diana'] },
    ],
    events: [
      { id: 1, name: 'Team meeting', date: '2023-06-15', description: 'Weekly team sync-up', location: 'Conference Room A' },
      { id: 2, name: 'React Conference', date: '2023-07-01', description: 'Annual React developers conference', location: 'Convention Center' },
    ],
    communityActivity: [
      { id: 1, type: 'post', content: 'New discussion: Best practices for React hooks', community: 'React Developers' },
      { id: 2, type: 'comment', content: 'Your post received a new comment', community: 'UI/UX Designers' },
    ],
    stats: {
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
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="bg-yellow-500 text-black">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.stats.progress}</p>
            <p>Out of {data.stats.totalPages} pages</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-500">
          <CardHeader>
            <CardTitle>Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.stats.timeSpent}</p>
            <p>Total time spent reading</p>
          </CardContent>
        </Card>

        <Card className="bg-green-500">
          <CardHeader>
            <CardTitle>Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.stats.streak}</p>
            <p>Day streak</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-500">
          <CardHeader>
            <CardTitle>Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.stats.level}</p>
            <p>Current level</p>
          </CardContent>
        </Card>

        <Card className="bg-pink-500">
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          {data.leaderboard.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between mb-2">
              <span>{index + 1}. {user.name}</span>
              <span>{user.points} points</span>
            </div>
          ))}
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTask} className="mb-4">
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
            <Button type="submit">Add Task</Button>
          </form>
          {data.tasks.map((task) => (
            <div key={task.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
              {editingTask && editingTask.id === task.id ? (
                <form onSubmit={handleSaveEdit}>
                  <Input
                    type="text"
                    value={editingTask.name}
                    onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                    className="mb-2"
                  />
                  <Textarea
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    className="mb-2"
                  />
                  <Button type="submit">Save</Button>
                  <Button type="button" onClick={() => setEditingTask(null)}>Cancel</Button>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-2">{task.name}</h3>
                  <p className="mb-2">{task.description}</p>
                  <p><strong>Status:</strong> {task.status}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <p><strong>Community:</strong> {task.community}</p>
                  <p><strong>Friends:</strong> {task.friends.join(", ")}</p>
                  <Button onClick={() => handleEditTask(task)} className="mt-2">Edit</Button>
                </>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          {data.events.map((event) => (
            <div key={event.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{event.name}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p>{event.description}</p>
              <p><strong>Location:</strong> {event.location}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {data.communityActivity.map((activity) => (
            <div key={activity.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <p><strong>Type:</strong> {activity.type}</p>
              <p>{activity.content}</p>
              <p><strong>Community:</strong> {activity.community}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;