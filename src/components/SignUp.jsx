import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" placeholder="Username" className="bg-gray-800 border-gray-700" />
      <Input type="email" placeholder="Email" className="bg-gray-800 border-gray-700" />
      <Input type="password" placeholder="Password" className="bg-gray-800 border-gray-700" />
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
    </form>
  );
};

export default SignUp;