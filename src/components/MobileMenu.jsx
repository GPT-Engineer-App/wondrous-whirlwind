import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, MessageCircle, User } from 'lucide-react';
import { cn } from "@/lib/utils";

const MobileMenu = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Map, label: 'Nearby', path: '/nearby' },
    { icon: MessageCircle, label: 'Chat', path: '/messaging' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black p-4 flex justify-around items-center md:hidden">
      {menuItems.map(({ icon: Icon, label, path }) => (
        <Link
          key={path}
          to={path}
          className={cn(
            "flex flex-col items-center text-gray-400 hover:text-pink-500 transition-colors",
            location.pathname === path && "text-pink-500"
          )}
        >
          <Icon className="h-6 w-6 mb-1" />
          <span className="text-xs">{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default MobileMenu;