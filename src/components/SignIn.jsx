import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const SignIn = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-gray-800 border-gray-700"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-800 border-gray-700"
      />
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Sign In</Button>
    </form>
  );
};

export default SignIn;