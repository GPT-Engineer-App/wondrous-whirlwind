import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Settings, MessageSquare, Heart } from 'lucide-react';

const fetchDashboardData = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    people: [
      { id: 1, name: 'Alice', image: 'https://source.unsplash.com/random/100x100?face=1' },
      { id: 2, name: 'Bob', image: 'https://source.unsplash.com/random/100x100?face=2' },
      { id: 3, name: 'Charlie', image: 'https://source.unsplash.com/random/100x100?face=3' },
      { id: 4, name: 'Diana', image: 'https://source.unsplash.com/random/100x100?face=4' },
      { id: 5, name: 'Eve', image: 'https://source.unsplash.com/random/100x100?face=5' },
    ],
    communities: [
      { id: 1, name: 'Volleyball', members: 500, image: 'https://source.unsplash.com/random/300x200?volleyball' },
      { id: 2, name: 'Bird Watchers', members: 350, image: 'https://source.unsplash.com/random/300x200?bird' },
    ],
    posts: [
      { id: 1, user: 'John', content: 'Anyone want to play tennis this weekend?', responses: 12, likes: 24 },
      { id: 2, user: 'Sarah', content: 'Has anyone seen this new movie?', responses: 8, likes: 15 },
    ],
  };
};

const Index = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div className="p-4">Loading dashboard...</div>;
  if (isError) return <div className="p-4">Error loading dashboard</div>;

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-6 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">People</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400"
        />
      </div>

      <div className="flex overflow-x-auto space-x-4 mb-6">
        {data.people.map((person) => (
          <Avatar key={person.id} className="w-16 h-16 border-2 border-pink-500">
            <AvatarImage src={person.image} alt={person.name} />
            <AvatarFallback>{person.name[0]}</AvatarFallback>
          </Avatar>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Breadcrumbs</h2>
      <div className="space-y-4">
        {data.posts.map((post) => (
          <Card key={post.id} className="bg-gray-800">
            <CardContent className="p-4">
              <p className="mb-2">{post.content}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{post.responses} Responses</span>
                <span>{post.likes} Likes</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Communities</h2>
      <div className="grid grid-cols-2 gap-4">
        {data.communities.map((community) => (
          <Card key={community.id} className="bg-gray-800">
            <CardContent className="p-4">
              <img src={community.image} alt={community.name} className="w-full h-24 object-cover rounded-md mb-2" />
              <h3 className="font-semibold">{community.name}</h3>
              <p className="text-sm text-gray-400">{community.members} members</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;