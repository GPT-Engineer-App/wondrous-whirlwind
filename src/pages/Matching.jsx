import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MessageCircle, Calendar } from 'lucide-react';
import ScheduleDisplay from '../components/ScheduleDisplay';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const fetchMatches = async (type) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const allMatches = [
    { id: 1, name: "Alice", age: 28, location: "New York", interests: ["React", "Hiking", "Photography"], preferences1: "Technology", preferences2: "Outdoors", schedule: ["2023-06-15", "2023-06-16", "2023-06-18"], type: "community" },
    { id: 2, name: "Bob", age: 32, location: "San Francisco", interests: ["JavaScript", "Cooking", "Travel"], preferences1: "Food", preferences2: "Adventure", schedule: ["2023-06-14", "2023-06-17", "2023-06-19"], type: "global" },
    { id: 3, name: "Charlie", age: 25, location: "London", interests: ["Python", "Music", "Fitness"], preferences1: "Technology", preferences2: "Health", schedule: ["2023-06-15", "2023-06-17", "2023-06-20"], type: "community" },
    { id: 4, name: "Diana", age: 30, location: "Berlin", interests: ["Design", "Yoga", "Reading"], preferences1: "Creativity", preferences2: "Wellness", schedule: ["2023-06-16", "2023-06-18", "2023-06-21"], type: "global" },
  ];
  return type === 'all' ? allMatches : allMatches.filter(match => match.type === type);
};

const fetchFriendList = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 5, name: "Eve", age: 27, location: "Paris" },
    { id: 6, name: "Frank", age: 31, location: "Tokyo" },
  ];
};

const MatchCard = ({ match, onLike, onPass, onMessage, onSchedule }) => (
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
      <ScheduleDisplay schedule={match.schedule} />
      <div className="flex justify-between mt-4">
        <Button variant="outline" size="icon" onClick={() => onPass(match.id)}>
          <X className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onMessage(match.id)}>
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onSchedule(match.id)}>
          <Calendar className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onLike(match.id)}>
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

import DetailedProfileView from '../components/DetailedProfileView';

const Matching = () => {
  const [ageRange, setAgeRange] = useState([20, 40]);
  const [location, setLocation] = useState("");
  const [interest, setInterest] = useState("");
  const [availableToday, setAvailableToday] = useState(false);
  const [matchType, setMatchType] = useState('all');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: matches, isLoading, error } = useQuery({
    queryKey: ['matches', matchType],
    queryFn: () => fetchMatches(matchType),
  });

  const { data: friendList } = useQuery({
    queryKey: ['friendList'],
    queryFn: fetchFriendList,
  });

  const addFriendMutation = useMutation({
    mutationFn: async (matchId) => {
      // Simulated API call to add friend
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.8) {  // 80% success rate
            resolve({ id: matchId, name: matches.find(m => m.id === matchId).name });
          } else {
            reject(new Error('Failed to add friend'));
          }
        }, 500);
      });
    },
    onSuccess: (newFriend) => {
      queryClient.setQueryData(['friendList'], (oldList) => [...(oldList || []), newFriend]);
      toast.success(`Added ${newFriend.name} to your friend list!`);
    },
    onError: (error) => {
      console.error('Error adding friend:', error);
      toast.error('Failed to add friend. Please try again.');
    },
  });

  const handleLike = (id) => {
    addFriendMutation.mutate(id);
  };

  const handlePass = (id) => {
    console.log(`Passed on user with id: ${id}`);
    toast.info('Passed on this match');
  };

  const handleMessage = (id) => {
    navigate(`/messaging?userId=${id}`);
  };

  const handleSchedule = (id) => {
    navigate(`/calendar?userId=${id}`);
  };

  const handleViewProfile = (id) => {
    setSelectedUserId(id);
  };

  const filteredMatches = matches?.filter(match => 
    match.age >= ageRange[0] && match.age <= ageRange[1] &&
    (location === "" || match.location.toLowerCase().includes(location.toLowerCase())) &&
    (interest === "" || match.interests.some(i => i.toLowerCase().includes(interest.toLowerCase()))) &&
    (!availableToday || (Array.isArray(match.schedule) && match.schedule.includes(new Date().toISOString().split('T')[0])))
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Find Your Match</h1>
      
      <div className="mb-8 space-y-4">
        <div className="flex space-x-4 mb-4">
          <Button
            onClick={() => setMatchType('all')}
            variant={matchType === 'all' ? 'default' : 'outline'}
          >
            All Matches
          </Button>
          <Button
            onClick={() => setMatchType('community')}
            variant={matchType === 'community' ? 'default' : 'outline'}
          >
            Community Matches
          </Button>
          <Button
            onClick={() => setMatchType('global')}
            variant={matchType === 'global' ? 'default' : 'outline'}
          >
            Global Matches
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Age Range</label>
          <div className="flex items-center space-x-4">
            <Slider
              value={ageRange}
              onValueChange={setAgeRange}
              max={100}
              step={1}
              className="flex-grow"
            />
            <span className="text-sm whitespace-nowrap w-20 text-right">
              {ageRange[0]} - {ageRange[1]}
            </span>
          </div>
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

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="availableToday"
            checked={availableToday}
            onChange={(e) => setAvailableToday(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <label htmlFor="availableToday" className="text-sm font-medium">Available Today</label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches?.map(match => (
          <MatchCard
            key={match.id}
            match={match}
            onLike={handleLike}
            onPass={handlePass}
            onMessage={handleMessage}
            onSchedule={handleSchedule}
          />
        ))}
      </div>
      
      {isLoading && <p className="text-center mt-8">Loading matches...</p>}
      {error && <p className="text-center mt-8 text-red-500">Error loading matches: {error.message}</p>}
      {filteredMatches?.length === 0 && (
        <p className="text-center mt-8">No matches found. Try adjusting your filters.</p>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Friend List</h2>
        {friendList?.map(friend => (
          <div key={friend.id} className="bg-gray-800 p-4 rounded-lg mb-2 flex justify-between items-center cursor-pointer" onClick={() => handleViewProfile(friend.id)}>
            <span>{friend.name}</span>
            <Badge>{friend.location}</Badge>
          </div>
        ))}
      </div>

      {selectedUserId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <DetailedProfileView userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
        </div>
      )}
    </div>
  );
};

export default Matching;