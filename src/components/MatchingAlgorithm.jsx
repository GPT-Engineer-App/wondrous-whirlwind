import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchPotentialMatches = async (userId) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'Alice', interests: ['React', 'UI/UX', 'Hiking'] },
    { id: 2, name: 'Bob', interests: ['JavaScript', 'Node.js', 'Photography'] },
    { id: 3, name: 'Charlie', interests: ['React', 'Photography', 'Travel'] },
  ];
};

const MatchingAlgorithm = ({ userId }) => {
  const { data: potentialMatches, isLoading, error } = useQuery({
    queryKey: ['potentialMatches', userId],
    queryFn: () => fetchPotentialMatches(userId),
  });

  if (isLoading) return <div>Loading potential matches...</div>;
  if (error) return <div>Error fetching matches: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Potential Matches</h2>
      {potentialMatches.map(match => (
        <div key={match.id} className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-semibold">{match.name}</h3>
          <p>Shared Interests: {match.interests.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default MatchingAlgorithm;