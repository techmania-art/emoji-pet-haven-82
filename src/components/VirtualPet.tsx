import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Zap, Gift, TrendingUp } from "lucide-react";
import { type PetType } from "./PetCustomizer";

type PetMood = "happy" | "sad" | "neutral" | "overfed";

interface VirtualPetProps {
  selectedPet?: PetType;
}

export const VirtualPet = ({ selectedPet }: VirtualPetProps) => {
  const [petMood, setPetMood] = useState<PetMood>("neutral");
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [feedCount, setFeedCount] = useState(0);
  const [isIgnored, setIsIgnored] = useState(false);

  // Pet becomes sad if ignored for too long
  useEffect(() => {
    const checkIgnored = setInterval(() => {
      if (Date.now() - lastInteraction > 10000) { // 10 seconds
        setIsIgnored(true);
        setPetMood("sad");
      }
    }, 2000);

    return () => clearInterval(checkIgnored);
  }, [lastInteraction]);

  // Reset overfed status after time
  useEffect(() => {
    if (feedCount >= 3) {
      setPetMood("overfed");
      const timer = setTimeout(() => {
        setFeedCount(0);
        setPetMood("neutral");
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [feedCount]);

  const getPetDisplay = () => {
    if (!selectedPet) {
      // Default cat emotions
      switch (petMood) {
        case "happy":
          return "😸";
        case "sad":
          return "😿";
        case "overfed":
          return "🤢";
        default:
          return "🐱";
      }
    }
    
    // Use selected pet's emotions
    switch (petMood) {
      case "happy":
        return selectedPet.happyEmoji;
      case "sad":
        return selectedPet.sadEmoji;
      case "overfed":
        return selectedPet.overfedEmoji;
      default:
        return selectedPet.neutralEmoji;
    }
  };

  const getPetAnimation = () => {
    switch (petMood) {
      case "happy":
        return "pet-happy";
      case "sad":
        return "pet-sad";
      default:
        return "float-gentle";
    }
  };

  const handleFeed = () => {
    setLastInteraction(Date.now());
    setIsIgnored(false);
    setFeedCount(prev => prev + 1);
    
    if (feedCount >= 2) {
      setPetMood("overfed");
    } else {
      setPetMood("happy");
      setTimeout(() => setPetMood("neutral"), 3000);
    }
  };

  const handlePlay = () => {
    setLastInteraction(Date.now());
    setIsIgnored(false);
    setPetMood("happy");
    setFeedCount(0);
    setTimeout(() => setPetMood("neutral"), 4000);
  };

  const handleCare = () => {
    setLastInteraction(Date.now());
    setIsIgnored(false);
    setPetMood("happy");
    setTimeout(() => setPetMood("neutral"), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-card rounded-3xl p-8 shadow-medium">
      {/* Pet Display */}
      <div className="relative mb-8">
        <div className={`text-8xl ${getPetAnimation()} cursor-pointer select-none`}>
          {getPetDisplay()}
        </div>
        
        {/* Mood indicator */}
        <div className="absolute -top-2 -right-2 text-sm bg-white rounded-full p-2 shadow-soft">
          {petMood === "happy" && "💖"}
          {petMood === "sad" && "💧"}
          {petMood === "overfed" && "🤮"}
          {petMood === "neutral" && "😌"}
        </div>
      </div>

      {/* Status Messages */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {petMood === "happy" && "Your pet is happy! 🎉"}
          {petMood === "sad" && "Your pet feels ignored... 💔"}
          {petMood === "overfed" && "Your pet is too full! 🤒"}
          {petMood === "neutral" && "Your pet is waiting for you! ✨"}
        </h3>
        
        <p className="text-muted-foreground">
          {petMood === "overfed" && "Maybe skip the next meal..."}
          {petMood === "sad" && "Show some love to cheer them up!"}
          {petMood === "happy" && "Keep up the great care!"}
          {petMood === "neutral" && "What would you like to do?"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="floating"
          size="lg"
          onClick={handleFeed}
          disabled={petMood === "overfed"}
          className="flex-col h-20 w-20"
        >
          <Gift className="w-6 h-6" />
          <span className="text-xs">Feed</span>
        </Button>
        
        <Button
          variant="floating"
          size="lg"
          onClick={handlePlay}
          className="flex-col h-20 w-20"
        >
          <Zap className="w-6 h-6" />
          <span className="text-xs">Play</span>
        </Button>
        
        <Button
          variant="floating"
          size="lg"
          onClick={handleCare}
          className="flex-col h-20 w-20"
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs">Care</span>
        </Button>
        
        <Button
          variant="soft"
          size="lg"
          className="flex-col h-20 w-20"
        >
          <TrendingUp className="w-6 h-6" />
          <span className="text-xs">Stats</span>
        </Button>
      </div>

      {/* Feed Counter Warning */}
      {feedCount > 0 && (
        <div className="mt-4 text-center">
          <div className="text-sm text-muted-foreground">
            Fed: {feedCount}/3 {feedCount >= 2 && "⚠️"}
          </div>
        </div>
      )}
    </div>
  );
};