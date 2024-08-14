import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, MessageCircle, User, Users } from 'lucide-react';
import { cn } from "@/lib/utils";

const MobileMenu = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Heart, label: 'Matches', path: '/matching' },
    { icon: MessageCircle, label: 'Messages', path: '/messaging' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Users, label: 'Community', path: '/community' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-2 flex justify-around items-center md:hidden">
      {menuItems.map(({ icon: Icon, label, path }) => (
        <Link
          key={path}
          to={path}
          className={cn(
            "flex flex-col items-center text-gray-400 hover:text-white transition-colors",
            location.pathname === path && "text-white"
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