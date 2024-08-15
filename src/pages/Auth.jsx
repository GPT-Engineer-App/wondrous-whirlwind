import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import GradientHeading from '../components/GradientHeading';
import { login } from '../utils/auth';
import { toast } from 'sonner';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const success = await login(username, password);
      if (success) {
        toast.success('Logged in successfully');
        navigate('/');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <GradientHeading text={isSignUp ? "Join the Network" : "Welcome Back"} />
      <div className="w-full max-w-md">
        {isSignUp ? <SignUp /> : <SignIn onLogin={handleLogin} />}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-400 hover:underline"
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;