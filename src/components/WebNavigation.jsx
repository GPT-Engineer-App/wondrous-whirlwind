import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Heart, MessageCircle, Users, Search, User } from 'lucide-react';
import { useSupabaseAuth } from '../integrations/supabase/auth';

const WebNavigation = () => {
  const location = useLocation();
  const { session } = useSupabaseAuth();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Heart, label: 'Matches', path: '/matching' },
    { icon: MessageCircle, label: 'Messages', path: '/messaging' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Search, label: 'Search', path: '/search' },
  ];

  return (
    <div className="hidden md:flex flex-col justify-between h-screen bg-gray-800 p-4 w-64">
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">App Name</h1>
        <nav className="space-y-2">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link key={path} to={path}>
              <Button
                variant={location.pathname === path ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto">
        <Link to="/profile">
          <Button variant="ghost" className="w-full justify-start">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={session?.user?.user_metadata?.avatar_url} />
              <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
            </Avatar>
            Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WebNavigation;