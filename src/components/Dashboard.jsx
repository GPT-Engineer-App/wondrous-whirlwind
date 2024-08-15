import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import MatchingAlgorithm from './MatchingAlgorithm';
import NotificationSystem from './NotificationSystem';
import { Button } from './ui/button';

const fetchHomepageData = async (userId) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    tasks: [
      { id: 1, title: 'Complete project proposal', status: 'in-progress' },
      { id: 2, title: 'Review code changes', status: 'pending' },
    ],
    events: [
      { id: 1, title: 'Team meeting', date: '2023-06-15' },
      { id: 2, title: 'React Conference', date: '2023-07-01' },
    ],
    communityActivity: [
      { id: 1, type: 'post', content: 'New discussion: Best practices for React hooks' },
      { id: 2, type: 'comment', content: 'Your post received a new comment' },
    ],
  };
};

const Homepage = ({ userId }) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['homepageData', userId],
    queryFn: () => fetchHomepageData(userId),
  });

  if (isLoading) return <div>Loading homepage...</div>;
  if (error) return <div>Error loading homepage: {error.message}</div>;

  const handleItemClick = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Homepage</h1>
        <NotificationSystem userId={userId} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
          {data.tasks.map(task => (
            <Button
              key={task.id}
              className="w-full mb-2 bg-gray-800 hover:bg-gray-700 justify-start"
              onClick={() => handleItemClick('task', task.id)}
            >
              <div className="text-left">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-400">Status: {task.status}</p>
              </div>
            </Button>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          {data.events.map(event => (
            <Button
              key={event.id}
              className="w-full mb-2 bg-gray-800 hover:bg-gray-700 justify-start"
              onClick={() => handleItemClick('event', event.id)}
            >
              <div className="text-left">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-400">Date: {event.date}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Community Activity</h2>
        {data.communityActivity.map(activity => (
          <Button
            key={activity.id}
            className="w-full mb-2 bg-gray-800 hover:bg-gray-700 justify-start"
            onClick={() => handleItemClick('activity', activity.id)}
          >
            <p>{activity.content}</p>
          </Button>
        ))}
      </div>
      <div className="mt-6">
        <MatchingAlgorithm userId={userId} />
      </div>
    </div>
  );
};

export default Homepage;