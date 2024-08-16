import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const OnboardingStep = ({ title, description, image, onContinue }) => (
  <Card className="w-full max-w-md mx-auto">
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

const TaskAccordion = () => {
  const tasks = [
    {
      name: "Complete project proposal",
      image: "https://source.unsplash.com/random/300x200?work",
      description: "Finish the project proposal for the new client",
      tags: ["urgent", "client", "proposal", "deadline", "project"],
      community: "Project Managers",
      friends: ["Alice", "Bob"]
    },
    {
      name: "Prepare for presentation",
      image: "https://source.unsplash.com/random/300x200?presentation",
      description: "Get ready for the quarterly review presentation",
      tags: ["presentation", "quarterly", "review", "important", "team"],
      community: "Public Speakers",
      friends: ["Charlie", "Diana"]
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {tasks.map((task, index) => (
        <AccordionItem value={`task-${index}`} key={index}>
          <AccordionTrigger>{task.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <img src={task.image} alt={task.name} className="w-full h-32 object-cover rounded-md" />
              <p>{task.description}</p>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <p><strong>Community:</strong> {task.community}</p>
              <p><strong>Friends:</strong> {task.friends.join(", ")}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const EventAccordion = () => {
  const events = [
    {
      name: "Tech Conference 2023",
      date: "2023-09-15",
      description: "Annual technology conference featuring the latest innovations",
      location: "San Francisco, CA"
    },
    {
      name: "Team Building Workshop",
      date: "2023-08-20",
      description: "A day of team-building activities and exercises",
      location: "Central Park, NY"
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {events.map((event, index) => (
        <AccordionItem value={`event-${index}`} key={index}>
          <AccordionTrigger>{event.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p><strong>Date:</strong> {event.date}</p>
              <p>{event.description}</p>
              <p><strong>Location:</strong> {event.location}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const CommunityAccordion = () => {
  const activities = [
    {
      name: "New Discussion: React Best Practices",
      community: "React Developers",
      description: "Join the discussion on the latest React best practices and patterns."
    },
    {
      name: "Upcoming Webinar: Intro to Machine Learning",
      community: "AI Enthusiasts",
      description: "Don't miss our upcoming webinar on the basics of machine learning!"
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {activities.map((activity, index) => (
        <AccordionItem value={`activity-${index}`} key={index}>
          <AccordionTrigger>{activity.name}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p><strong>Community:</strong> {activity.community}</p>
              <p>{activity.description}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

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
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {step < steps.length ? (
        <OnboardingStep
          {...steps[step]}
          onContinue={handleContinue}
        />
      ) : (
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle>Welcome to Your Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-xl font-semibold">Your Tasks</h2>
            <TaskAccordion />
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <EventAccordion />
            <h2 className="text-xl font-semibold">Community Activities</h2>
            <CommunityAccordion />
            <Button onClick={() => navigate('/dashboard')} className="w-full">Go to Dashboard</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Onboarding;