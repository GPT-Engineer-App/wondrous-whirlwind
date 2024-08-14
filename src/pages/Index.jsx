import React from 'react';
import Dashboard from '../components/Dashboard';

const Index = () => {
  // Assuming we have a logged-in user with ID 1
  const userId = 1;

  return (
    <div className="min-h-screen bg-gray-900">
      <Dashboard userId={userId} />
    </div>
  );
};

export default Index;