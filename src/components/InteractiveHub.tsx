import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { VirtualPet } from "./VirtualPet";
import { availablePets, type PetType } from "./PetCustomizer";
import { Heart, Gamepad2, Settings, BarChart3, Sparkles, Globe } from "lucide-react";

export const InteractiveHub = () => {
  const [selectedPet, setSelectedPet] = useState<PetType>(availablePets[0]);
  
  // Load saved pet from localStorage
  useEffect(() => {
    const savedPet = localStorage.getItem('selectedPet');
    if (savedPet) {
      try {
        const pet = JSON.parse(savedPet);
        setSelectedPet(pet);
      } catch (error) {
        console.error('Failed to load saved pet:', error);
      }
    }
  }, []);
  const hubSections = [
    {
      id: "pet",
      title: "Pet Care",
      icon: <Heart className="w-8 h-8" />,
      description: "Feed, play, and care for your virtual companion",
      position: "center",
      component: <VirtualPet />
    },
    {
      id: "activities",
      title: "Activities",
      icon: <Gamepad2 className="w-6 h-6" />,
      description: "Fun games and activities",
      position: "top-right",
      gradient: "bg-gradient-primary",
      onClick: () => window.location.href = '/activities'
    },
    {
      id: "stats",
      title: "Statistics",
      icon: <BarChart3 className="w-6 h-6" />,
      description: "Track your pet's progress",
      position: "bottom-right",
      gradient: "bg-gradient-accent"
    },
    {
      id: "world",
      title: "Explore",
      icon: <Globe className="w-6 h-6" />,
      description: "Discover new worlds",
      position: "bottom-left",
      gradient: "bg-gradient-primary"
    },
    {
      id: "customize",
      title: "Customize",
      icon: <Sparkles className="w-6 h-6" />,
      description: "Personalize your pet",
      position: "top-left",
      gradient: "bg-gradient-accent",
      onClick: () => window.location.href = '/customize'
    }
  ];

  const getPositionClasses = (position: string) => {
    switch (position) {
      case "center":
        return "col-span-2 row-span-2 md:col-start-2 md:row-start-2";
      case "top-left":
        return "md:col-start-1 md:row-start-1 float-gentle";
      case "top-right":
        return "md:col-start-4 md:row-start-1 float-delayed";
      case "bottom-left":
        return "md:col-start-1 md:row-start-4 float-delayed";
      case "bottom-right":
        return "md:col-start-4 md:row-start-4 float-gentle";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* 3D Interactive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 md:grid-rows-4 gap-6 min-h-[600px] md:min-h-[800px]">
        {hubSections.map((section) => (
          <div
            key={section.id}
            className={`${getPositionClasses(section.position)} ${
              section.position === "center" ? "" : "group"
            }`}
          >
            {section.position === "center" ? (
              // Central Pet Component
              <div className="h-full">
                <VirtualPet selectedPet={selectedPet} />
              </div>
            ) : (
              // Floating Interactive Cards
              <Button
                variant="soft"
                size="lg"
                onClick={section.onClick}
                className={`
                  h-full w-full flex-col justify-center p-6 
                  ${section.gradient || "bg-gradient-card"}
                  border-0 shadow-medium hover:shadow-glow 
                  transform-gpu transition-all duration-300
                  hover:scale-105 hover:-translate-y-2
                  group-hover:rotate-2
                `}
              >
                <div className="text-primary-foreground mb-3 transform group-hover:scale-110 transition-transform duration-200">
                  {section.icon}
                </div>
                <h3 className="font-semibold text-primary-foreground mb-2 text-center">
                  {section.title}
                </h3>
                <p className="text-xs text-primary-foreground/80 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {section.description}
                </p>
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Floating Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {hubSections.filter(s => s.position !== "center").map((section, index) => (
          <div
            key={section.id}
            className="w-3 h-3 rounded-full bg-primary/30 hover:bg-primary transition-colors duration-200 cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};