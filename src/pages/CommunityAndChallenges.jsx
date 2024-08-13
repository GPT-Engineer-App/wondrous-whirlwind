import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CommunityOverview from '../components/CommunityOverview';
import ChallengeHub from '../components/ChallengeHub';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";

const fetchCommunities = async () => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'Tech Enthusiasts', description: 'For all tech lovers', memberCount: 1500, image: 'https://source.unsplash.com/random/200x200?tech' },
    { id: 2, name: 'Fitness Fanatics', description: 'Get fit together', memberCount: 2000, image: 'https://source.unsplash.com/random/200x200?fitness' },
    { id: 3, name: 'Book Club', description: 'Share your love for reading', memberCount: 1000, image: 'https://source.unsplash.com/random/200x200?books' },
  ];
};

const fetchChallenges = async () => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: '30 Day Coding Challenge', startDate: '2023-06-01', endDate: '2023-06-30', participantCount: 500, progress: 60 },
    { id: 2, name: 'Summer Fitness Challenge', startDate: '2023-07-01', endDate: '2023-08-31', participantCount: 1000, progress: 30 },
    { id: 3, name: 'Reading Marathon', startDate: '2023-06-15', endDate: '2023-07-15', participantCount: 750, progress: 45 },
  ];
};

const CommunityAndChallenges = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: communities, isLoading: isLoadingCommunities } = useQuery(['communities'], fetchCommunities);
  const { data: challenges, isLoading: isLoadingChallenges } = useQuery(['challenges'], fetchChallenges);

  const filteredCommunities = communities?.filter(community => 
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChallenges = challenges?.filter(challenge => 
    challenge.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Community & Challenges</h1>
      <Input
        type="text"
        placeholder="Search communities or challenges..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 bg-gray-800 text-white"
      />
      <Tabs defaultValue="communities">
        <TabsList className="mb-4">
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        <TabsContent value="communities">
          <CommunityOverview communities={filteredCommunities} isLoading={isLoadingCommunities} />
        </TabsContent>
        <TabsContent value="challenges">
          <ChallengeHub challenges={filteredChallenges} isLoading={isLoadingChallenges} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityAndChallenges;