import { Home, UserPlus, User, Users, MessageCircle, Heart, Search } from "lucide-react";
import Index from "./pages/Index.jsx";
import Auth from "./pages/Auth.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import CommunityAndChallenges from "./pages/CommunityAndChallenges.jsx";
import Messaging from "./pages/Messaging.jsx";
import Matching from "./pages/Matching.jsx";
import Search from "./pages/Search.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Auth",
    to: "/auth",
    icon: <UserPlus className="h-4 w-4" />,
    page: <Auth />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: <User className="h-4 w-4" />,
    page: <UserProfile />,
  },
  {
    title: "Community & Challenges",
    to: "/community",
    icon: <Users className="h-4 w-4" />,
    page: <CommunityAndChallenges />,
  },
  {
    title: "Messaging",
    to: "/messaging",
    icon: <MessageCircle className="h-4 w-4" />,
    page: <Messaging />,
  },
  {
    title: "Matching",
    to: "/matching",
    icon: <Heart className="h-4 w-4" />,
    page: <Matching />,
  },
  {
    title: "Search",
    to: "/search",
    icon: <Search className="h-4 w-4" />,
    page: <Search />,
  },
];