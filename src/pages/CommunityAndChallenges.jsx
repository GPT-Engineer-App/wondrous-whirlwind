import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Plus } from 'lucide-react';
import ChallengeCard from '../components/ChallengeCard';

const fetchCommunities = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'Fitness Enthusiasts', image: 'https://source.unsplash.com/random/300x200?fitness', description: 'A community for fitness lovers' },
    { id: 2, name: 'Book Club', image: 'https://source.unsplash.com/random/300x200?books', description: 'Discuss your favorite books' },
    { id: 3, name: 'Tech Innovators', image: 'https://source.unsplash.com/random/300x200?technology', description: 'Explore the latest in tech' },
  ];
};

const fetchChallenges = async () => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: '30-Day Fitness Challenge', startDate: '2023-06-01', endDate: '2023-06-30', progress: 60, participants: 1500, community: 'Fitness Enthusiasts' },
    { id: 2, name: 'Summer Reading Challenge', startDate: '2023-07-01', endDate: '2023-08-31', progress: 30, participants: 800, community: 'Book Club' },
    { id: 3, name: 'Coding Marathon', startDate: '2023-08-15', endDate: '2023-08-17', progress: 0, participants: 300, community: 'Tech Innovators' },
    { id: 4, name: 'Global Fitness Challenge', startDate: '2023-09-01', endDate: '2023-09-30', progress: 10, participants: 5000 },
    { id: 5, name: 'Worldwide Book Reading', startDate: '2023-10-01', endDate: '2023-10-31', progress: 5, participants: 2000 },
  ];
};

const CommunityCard = ({ community, onJoin }) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{community.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={community.image} alt={community.name} className="w-full h-40 object-cover mb-4 rounded-md" />
        <p className="text-sm text-gray-300 mb-4">{community.description}</p>
        <div className="flex justify-between">
          <Button onClick={() => navigate(`/community/${community.id}`)}>View Community</Button>
          <Button onClick={() => onJoin(community.id)} variant="outline">Join Community</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CommunityAndChallenges = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('communities');
  const [challengeType, setChallengeType] = useState('all');

  const { data: communities, isLoading: isLoadingCommunities } = useQuery({
    queryKey: ['communities'],
    queryFn: fetchCommunities,
  });

  const { data: challenges, isLoading: isLoadingChallenges } = useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallenges,
  });

  const handleJoinCommunity = (communityId) => {
    console.log(`Joined community ${communityId}`);
    // Implement join community logic here
  };

  const handleJoinChallenge = (challengeId) => {
    console.log(`Joined challenge ${challengeId}`);
    // Implement join challenge logic here
  };

  const handleCreateCommunity = () => {
    console.log('Create community clicked');
    // Implement create community logic here
  };

  const filteredCommunities = communities?.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChallenges = challenges?.filter(challenge =>
    (challenge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (challenge.community && challenge.community.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (challengeType === 'all' || 
     (challengeType === 'community' && challenge.community) ||
     (challengeType === 'collective' && !challenge.community))
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Community & Challenges</h1>
      <div className="mb-6 flex items-center">
        <Input
          type="text"
          placeholder="Search communities or challenges..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-4"
        />
        <Button onClick={handleCreateCommunity}>
          <Plus className="mr-2 h-4 w-4" /> Create Community
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        <TabsContent value="communities">
          {isLoadingCommunities ? (
            <p>Loading communities...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities?.map(community => (
                <CommunityCard key={community.id} community={community} onJoin={handleJoinCommunity} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="challenges">
          <div className="mb-4">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setChallengeType('all')}>All Challenges</TabsTrigger>
              <TabsTrigger value="community" onClick={() => setChallengeType('community')}>Community Challenges</TabsTrigger>
              <TabsTrigger value="collective" onClick={() => setChallengeType('collective')}>Collective Challenges</TabsTrigger>
            </TabsList>
          </div>
          {isLoadingChallenges ? (
            <p>Loading challenges...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges?.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} onJoin={handleJoinChallenge} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityAndChallenges;