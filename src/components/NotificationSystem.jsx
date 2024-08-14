import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell } from 'lucide-react';

const fetchNotifications = async (userId) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, type: 'message', content: 'You have a new message', status: 'unread' },
    { id: 2, type: 'event', content: 'Upcoming event: React Meetup', status: 'read' },
    { id: 3, type: 'community', content: 'New post in your community', status: 'unread' },
  ];
};

const NotificationSystem = ({ userId }) => {
  const { data: notifications, isLoading, error } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => fetchNotifications(userId),
  });

  if (isLoading) return <Bell className="animate-pulse" />;
  if (error) return <Bell className="text-red-500" />;

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="relative">
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationSystem;