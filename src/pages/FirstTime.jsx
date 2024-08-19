import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OnboardingStep = ({ title, description, image, onNext, onSkip, isLastStep }) => (
  <Card className="w-full max-w-sm mx-auto bg-indigo-900 text-white">
    <CardContent className="p-6 space-y-4">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm">{description}</p>
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onSkip} className="text-white">
          Skip
        </Button>
        <Button onClick={onNext} className="bg-white text-indigo-900">
          {isLastStep ? "Get Started" : "Next"}
        </Button>
      </div>
    </CardContent>
  </Card>
);

const FirstTime = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      title: "Connect people around the world",
      description: "Join our global community and connect with people from all walks of life.",
      image: "https://source.unsplash.com/random/400x300?community"
    },
    {
      title: "Live your life smarter with us!",
      description: "Discover new ways to enhance your daily life and achieve your goals.",
      image: "https://source.unsplash.com/random/400x300?smart-living"
    },
    {
      title: "Get a new experience of imagination",
      description: "Explore creative ideas and innovative solutions to everyday challenges.",
      image: "https://source.unsplash.com/random/400x300?imagination"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-indigo-800 flex items-center justify-center p-4">
      <OnboardingStep
        {...steps[step]}
        onNext={handleNext}
        onSkip={handleSkip}
        isLastStep={step === steps.length - 1}
      />
    </div>
  );
};

export default FirstTime;