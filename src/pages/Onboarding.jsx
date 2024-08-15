import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const OnboardingStep = ({ title, description, image, onContinue }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="flex flex-col items-center justify-between h-screen p-6 bg-gray-900 text-white"
  >
    <div className="mt-12 text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-8">{description}</p>
    </div>
    <img src={image} alt={title} className="w-64 h-64 mb-8 rounded-lg shadow-lg" />
    <Button onClick={onContinue} className="w-full mb-8 bg-blue-600 hover:bg-blue-700">Continue</Button>
  </motion.div>
);

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Welcome to Our App",
      description: "Connect with like-minded individuals and grow together.",
      image: "https://source.unsplash.com/random/400x400?community"
    },
    {
      title: "Discover Opportunities",
      description: "Find events, challenges, and communities that match your interests.",
      image: "https://source.unsplash.com/random/400x400?opportunity"
    },
    {
      title: "Collaborate and Learn",
      description: "Engage in meaningful conversations and expand your knowledge.",
      image: "https://source.unsplash.com/random/400x400?collaboration"
    }
  ];

  const handleContinue = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/auth');
    }
  };

  return (
    <OnboardingStep
      {...steps[step]}
      onContinue={handleContinue}
    />
  );
};

export default Onboarding;