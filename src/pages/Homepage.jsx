import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import TaskItem from '../components/TaskItem';
import EventItem from '../components/EventItem';
import CommunityActivityItem from '../components/CommunityActivityItem';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fetchHomepageData = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    tasks: [
      { id: 1, name: 'Complete project proposal', icon: 'FileText', description: 'Finish the proposal for the new client project', tags: ['Work', 'Urgent', 'Client', 'Proposal', 'Deadline'], community: 'Project Management', friends: ['Alice', 'Bob'] },
      { id: 2, name: 'Review code changes', icon: 'Code', description: 'Review and approve the latest pull requests', tags: ['Tech', 'Code Review', 'Collaboration', 'GitHub', 'Team'], community: 'Development Team', friends: ['Charlie', 'David'] },
    ],
    events: [
      { id: 1, name: 'Team meeting', date: '2023-06-15 14:00', description: 'Weekly team sync-up', location: 'Conference Room A' },
      { id: 2, name: 'React Conference', date: '2023-07-01 09:00', description: 'Annual React developers conference', location: 'Convention Center' },
    ],
    communityActivity: [
      { id: 1, type: 'MessageSquare', title: 'New discussion: Best practices for React hooks', timestamp: '2 hours ago', description: 'Join the conversation about effective use of React hooks', community: 'React Developers' },
      { id: 2, type: 'ThumbsUp', title: 'Your post received 10 likes', timestamp: '1 day ago', description: 'Your article on "Optimizing React Performance" is getting attention', community: 'Frontend Masters' },
    ],
  };
};

const Homepage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['homepageData'],
    queryFn: fetchHomepageData,
  });

  if (isLoading) return <div>Loading homepage...</div>;
  if (error) return <div>Error loading homepage: {error.message}</div>;

  const handleItemClick = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="activity">Community Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          {data.tasks.map(task => (
            <Button
              key={task.id}
              className="w-full mb-2 p-0 h-auto"
              variant="ghost"
              onClick={() => handleItemClick('task', task.id)}
            >
              <TaskItem task={task} />
            </Button>
          ))}
        </TabsContent>
        <TabsContent value="events">
          {data.events.map(event => (
            <Button
              key={event.id}
              className="w-full mb-2 p-0 h-auto"
              variant="ghost"
              onClick={() => handleItemClick('event', event.id)}
            >
              <EventItem event={event} />
            </Button>
          ))}
        </TabsContent>
        <TabsContent value="activity">
          {data.communityActivity.map(activity => (
            <Button
              key={activity.id}
              className="w-full mb-2 p-0 h-auto"
              variant="ghost"
              onClick={() => handleItemClick('activity', activity.id)}
            >
              <CommunityActivityItem activity={activity} />
            </Button>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Homepage;