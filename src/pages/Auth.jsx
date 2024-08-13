import React, { useState } from 'react';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import GradientHeading from '../components/GradientHeading';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <GradientHeading text={isSignUp ? "Join the Network" : "Welcome Back"} />
      <div className="w-full max-w-md">
        {isSignUp ? <SignUp /> : <SignIn />}
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