import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OnboardingStep = ({ title, description, image, onContinue }) => (
  <Card className="w-full max-w-md mx-auto bg-gray-800 text-white">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p>{description}</p>
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
      <Button onClick={onContinue} className="w-full">Continue</Button>
    </CardContent>
  </Card>
);

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Welcome to Our App",
      description: "Connect with like-minded individuals and grow together.",
      image: "https://source.unsplash.com/random/400x300?welcome"
    },
    {
      title: "Discover Opportunities",
      description: "Find events, challenges, and communities that match your interests.",
      image: "https://source.unsplash.com/random/400x300?opportunity"
    },
    {
      title: "Collaborate and Learn",
      description: "Engage in meaningful conversations and expand your knowledge.",
      image: "https://source.unsplash.com/random/400x300?collaboration"
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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <OnboardingStep
        {...steps[step]}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default Onboarding;