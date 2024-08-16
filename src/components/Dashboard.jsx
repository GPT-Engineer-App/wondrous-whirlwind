import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MatchingAlgorithm from './MatchingAlgorithm';
import NotificationSystem from './NotificationSystem';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';

const fetchDashboardData = async (userId) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    tasks: [
      { id: 1, name: 'Complete project proposal', status: 'in-progress', image: 'https://source.unsplash.com/random/300x200?work', description: 'Finish the project proposal for the new client', tags: ['urgent', 'client', 'proposal', 'deadline', 'project'], community: 'Project Managers', friends: ['Alice', 'Bob'] },
      { id: 2, name: 'Review code changes', status: 'pending', image: 'https://source.unsplash.com/random/300x200?code', description: 'Review and approve the latest code changes', tags: ['code', 'review', 'collaboration', 'quality', 'teamwork'], community: 'Developers', friends: ['Charlie', 'Diana'] },
    ],
    events: [
      { id: 1, name: 'Team meeting', date: '2023-06-15', description: 'Weekly team sync-up', location: 'Conference Room A' },
      { id: 2, name: 'React Conference', date: '2023-07-01', description: 'Annual React developers conference', location: 'Convention Center' },
    ],
    communityActivity: [
      { id: 1, type: 'post', content: 'New discussion: Best practices for React hooks', community: 'React Developers' },
      { id: 2, type: 'comment', content: 'Your post received a new comment', community: 'UI/UX Designers' },
    ],
  };
};

const Dashboard = ({ userId }) => {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState({ name: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);

  const { data, isLoading, error } = useQuery({
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
        tasks: [...oldData.tasks, newTask],
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
        tasks: oldData.tasks.map(t => t.id === updatedTask.id ? updatedTask : t),
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
  if (error) return <div>Error loading dashboard: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <NotificationSystem userId={userId} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
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
        <Accordion type="single" collapsible className="w-full">
          {data.tasks.map((task) => (
            <AccordionItem value={`task-${task.id}`} key={task.id}>
              <AccordionTrigger>{task.name}</AccordionTrigger>
              <AccordionContent>
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
                  <div className="space-y-2">
                    <img src={task.image} alt={task.name} className="w-full h-32 object-cover rounded-md" />
                    <p>{task.description}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <p><strong>Community:</strong> {task.community}</p>
                    <p><strong>Friends:</strong> {task.friends.join(", ")}</p>
                    <Button onClick={() => handleEditTask(task)}>Edit</Button>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <Accordion type="single" collapsible className="w-full">
          {data.events.map((event) => (
            <AccordionItem value={`event-${event.id}`} key={event.id}>
              <AccordionTrigger>{event.name}</AccordionTrigger>
              <AccordionContent>
                <p><strong>Date:</strong> {event.date}</p>
                <p>{event.description}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Community Activities</h2>
        <Accordion type="single" collapsible className="w-full">
          {data.communityActivity.map((activity) => (
            <AccordionItem value={`activity-${activity.id}`} key={activity.id}>
              <AccordionTrigger>{activity.content}</AccordionTrigger>
              <AccordionContent>
                <p><strong>Type:</strong> {activity.type}</p>
                <p><strong>Community:</strong> {activity.community}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-6">
        <MatchingAlgorithm userId={userId} />
      </div>
    </div>
  );
};

export default Dashboard;