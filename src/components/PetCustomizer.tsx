import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export type PetType = {
  id: string;
  name: string;
  emoji: string;
  happyEmoji: string;
  sadEmoji: string;
  overfedEmoji: string;
  neutralEmoji: string;
};

const availablePets: PetType[] = [
  {
    id: "cat",
    name: "Cat",
    emoji: "🐱",
    happyEmoji: "😸",
    sadEmoji: "😿",
    overfedEmoji: "🤢",
    neutralEmoji: "🐱"
  },
  {
    id: "dog",
    name: "Dog", 
    emoji: "🐶",
    happyEmoji: "😄",
    sadEmoji: "😢",
    overfedEmoji: "🤮",
    neutralEmoji: "🐶"
  },
  {
    id: "rabbit",
    name: "Rabbit",
    emoji: "🐰",
    happyEmoji: "😊",
    sadEmoji: "😭",
    overfedEmoji: "🤒",
    neutralEmoji: "🐰"
  },
  {
    id: "bear",
    name: "Bear",
    emoji: "🐻",
    happyEmoji: "🤗",
    sadEmoji: "😞",
    overfedEmoji: "🤢",
    neutralEmoji: "🐻"
  },
  {
    id: "panda",
    name: "Panda",
    emoji: "🐼",
    happyEmoji: "😆",
    sadEmoji: "😥",
    overfedEmoji: "🤮",
    neutralEmoji: "🐼"
  },
  {
    id: "lion",
    name: "Lion",
    emoji: "🦁",
    happyEmoji: "😁",
    sadEmoji: "😟",
    overfedEmoji: "🤢",
    neutralEmoji: "🦁"
  },
  {
    id: "fox",
    name: "Fox",
    emoji: "🦊",
    happyEmoji: "😋",
    sadEmoji: "😔",
    overfedEmoji: "🤒",
    neutralEmoji: "🦊"
  },
  {
    id: "koala",
    name: "Koala",
    emoji: "🐨",
    happyEmoji: "😌",
    sadEmoji: "😣",
    overfedEmoji: "🤮",
    neutralEmoji: "🐨"
  }
];

interface PetCustomizerProps {
  selectedPet: PetType;
  onPetSelect: (pet: PetType) => void;
}

export const PetCustomizer = ({ selectedPet, onPetSelect }: PetCustomizerProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Choose Your Virtual Pet
        </h2>
        <p className="text-muted-foreground">
          Select your perfect companion! Each pet has unique personalities but shares the same emotions.
        </p>
      </div>

      {/* Current Selection Preview */}
      <div className="bg-gradient-card rounded-3xl p-8 mb-8 text-center shadow-medium">
        <div className="text-6xl mb-4 float-gentle">
          {selectedPet.emoji}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Your {selectedPet.name}
        </h3>
        <div className="flex justify-center gap-4 text-3xl">
          <span title="Happy">{selectedPet.happyEmoji}</span>
          <span title="Sad">{selectedPet.sadEmoji}</span>
          <span title="Overfed">{selectedPet.overfedEmoji}</span>
          <span title="Neutral">{selectedPet.neutralEmoji}</span>
        </div>
      </div>

      {/* Pet Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {availablePets.map((pet) => (
          <Button
            key={pet.id}
            variant="soft"
            size="lg"
            onClick={() => onPetSelect(pet)}
            className={`
              relative h-32 flex-col p-4 group
              ${selectedPet.id === pet.id 
                ? 'ring-2 ring-primary shadow-glow' 
                : 'hover:shadow-medium'
              }
              transition-all duration-300 hover:scale-105
            `}
          >
            {/* Selection Indicator */}
            {selectedPet.id === pet.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            
            {/* Pet Emoji */}
            <div className="text-4xl mb-2 transition-transform duration-200 group-hover:scale-110">
              {pet.emoji}
            </div>
            
            {/* Pet Name */}
            <span className="font-medium text-foreground">
              {pet.name}
            </span>
            
            {/* Emotion Preview */}
            <div className="flex gap-1 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>{pet.happyEmoji}</span>
              <span>{pet.sadEmoji}</span>
              <span>{pet.overfedEmoji}</span>
            </div>
          </Button>
        ))}
      </div>

      {/* Emotion Legend */}
      <div className="mt-8 p-6 bg-muted/30 rounded-2xl">
        <h4 className="font-semibold text-foreground mb-4 text-center">
          Pet Emotions Guide
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl">😊</span>
            <span className="text-sm text-muted-foreground">Happy</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl">😢</span>
            <span className="text-sm text-muted-foreground">Sad</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl">🤢</span>
            <span className="text-sm text-muted-foreground">Overfed</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl">😌</span>
            <span className="text-sm text-muted-foreground">Neutral</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { availablePets };