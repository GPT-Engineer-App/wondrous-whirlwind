import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { FaLinkedin, FaDiscord, FaInstagram, FaGoogle } from 'react-icons/fa';

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="Username" className="bg-gray-800 border-gray-700" />
        <Input type="email" placeholder="Email" className="bg-gray-800 border-gray-700" />
        <Input type="password" placeholder="Password" className="bg-gray-800 border-gray-700" />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-4">Or sign up with:</p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="icon">
            <FaLinkedin className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <FaDiscord className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <FaInstagram className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <FaGoogle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;