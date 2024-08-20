import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Heart, MessageCircle, Users, Search, User, Moon, Sun } from 'lucide-react';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { useTheme } from '../components/ThemeProvider';

const WebNavigation = () => {
  const location = useLocation();
  const { session } = useSupabaseAuth();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Heart, label: 'Matches', path: '/matching' },
    { icon: MessageCircle, label: 'Messages', path: '/messaging' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Search, label: 'Search', path: '/search' },
  ];

  return (
    <div className="hidden md:flex justify-between items-center h-16 bg-gray-800 p-4 w-full">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-white mr-8">App Name</h1>
        <nav className="flex space-x-2">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link key={path} to={path}>
              <Button
                variant={location.pathname === path ? "secondary" : "ghost"}
                className="flex items-center"
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        <Link to="/profile">
          <Button variant="ghost" className="flex items-center">
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