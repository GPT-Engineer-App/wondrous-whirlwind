import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Settings } from 'lucide-react';

const NearbyPeople = () => {
  const people = [
    { id: 1, name: 'Alice', image: 'https://source.unsplash.com/random/100x100?face=1' },
    { id: 2, name: 'Bob', image: 'https://source.unsplash.com/random/100x100?face=2' },
    { id: 3, name: 'Charlie', image: 'https://source.unsplash.com/random/100x100?face=3' },
    { id: 4, name: 'Diana', image: 'https://source.unsplash.com/random/100x100?face=4' },
    { id: 5, name: 'Eve', image: 'https://source.unsplash.com/random/100x100?face=5' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">People nearby</h1>
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
      <div className="relative h-[calc(100vh-200px)]">
        {people.map((person, index) => (
          <div
            key={person.id}
            className="absolute"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
            }}
          >
            <Avatar className="w-12 h-12 border-2 border-pink-500">
              <AvatarImage src={person.image} alt={person.name} />
              <AvatarFallback>{person.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyPeople;