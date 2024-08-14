import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MessageCircle } from 'lucide-react';

const fetchMatches = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: "Alice", age: 28, location: "New York", interests: ["React", "Hiking", "Photography"], preferences1: "Technology", preferences2: "Outdoors" },
    { id: 2, name: "Bob", age: 32, location: "San Francisco", interests: ["JavaScript", "Cooking", "Travel"], preferences1: "Food", preferences2: "Adventure" },
    { id: 3, name: "Charlie", age: 25, location: "London", interests: ["Python", "Music", "Fitness"], preferences1: "Technology", preferences2: "Health" },
    { id: 4, name: "Diana", age: 30, location: "Berlin", interests: ["Design", "Yoga", "Reading"], preferences1: "Creativity", preferences2: "Wellness" },
  ];
};

const MatchCard = ({ match, onLike, onPass, onMessage }) => (
  <Card className="w-full max-w-sm mx-auto">
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>{match.name}, {match.age}</span>
        <Badge>{match.location}</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Avatar className="w-32 h-32 mx-auto mb-4" />
      <div className="space-y-2">
        <p><strong>Interests:</strong> {match.interests.join(", ")}</p>
        <p><strong>Preferences:</strong> {match.preferences1}, {match.preferences2}</p>
      </div>
      <div className="flex justify-between mt-4">
        <Button variant="outline" size="icon" onClick={() => onPass(match.id)}>
          <X className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onMessage(match.id)}>
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onLike(match.id)}>
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const Matching = () => {
  const [ageRange, setAgeRange] = useState([20, 40]);
  const [location, setLocation] = useState("");
  const [interest, setInterest] = useState("");

  const { data: matches, isLoading, error } = useQuery({
    queryKey: ['matches'],
    queryFn: fetchMatches,
  });

  const handleLike = (id) => {
    console.log(`Liked user with id: ${id}`);
    // Implement like functionality
  };

  const handlePass = (id) => {
    console.log(`Passed on user with id: ${id}`);
    // Implement pass functionality
  };

  const handleMessage = (id) => {
    console.log(`Messaging user with id: ${id}`);
    // Implement messaging functionality
  };

  const filteredMatches = matches?.filter(match => 
    match.age >= ageRange[0] && match.age <= ageRange[1] &&
    (location === "" || match.location.toLowerCase().includes(location.toLowerCase())) &&
    (interest === "" || match.interests.some(i => i.toLowerCase().includes(interest.toLowerCase())))
  );

  if (isLoading) return <div className="text-center mt-8">Loading matches...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error loading matches: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Find Your Match</h1>
      
      <div className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Age Range</label>
          <Slider
            value={ageRange}
            onValueChange={setAgeRange}
            max={100}
            step={1}
            className="max-w-sm"
          />
          <p className="text-sm mt-1">Age: {ageRange[0]} - {ageRange[1]}</p>
        </div>
        
        <Input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="max-w-sm"
        />
        
        <Input
          type="text"
          placeholder="Filter by interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches?.map(match => (
          <MatchCard
            key={match.id}
            match={match}
            onLike={handleLike}
            onPass={handlePass}
            onMessage={handleMessage}
          />
        ))}
      </div>
      
      {filteredMatches?.length === 0 && (
        <p className="text-center mt-8">No matches found. Try adjusting your filters.</p>
      )}
    </div>
  );
};

export default Matching;