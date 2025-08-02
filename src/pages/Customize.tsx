import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PetCustomizer, availablePets, type PetType } from "@/components/PetCustomizer";
import { VirtualPet } from "@/components/VirtualPet";

const Customize = () => {
  const [selectedPet, setSelectedPet] = useState<PetType>(availablePets[0]);
  const [showPreview, setShowPreview] = useState(false);

  const handlePetSelect = (pet: PetType) => {
    setSelectedPet(pet);
  };

  const handleSaveAndPlay = () => {
    // In a real app, you would save this to localStorage or a database
    localStorage.setItem('selectedPet', JSON.stringify(selectedPet));
    setShowPreview(true);
  };

  const handleBackToCustomize = () => {
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-foreground">
              Pet Customization
            </h1>
          </div>
          
          {!showPreview && (
            <Button
              variant="floating"
              onClick={handleSaveAndPlay}
              className="px-6"
            >
              Play with {selectedPet.name}
            </Button>
          )}
          
          {showPreview && (
            <Button
              variant="soft"
              onClick={handleBackToCustomize}
              className="px-6"
            >
              Choose Different Pet
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        {!showPreview ? (
          <PetCustomizer 
            selectedPet={selectedPet}
            onPetSelect={handlePetSelect}
          />
        ) : (
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Meet Your {selectedPet.name}!
              </h2>
              <p className="text-muted-foreground">
                Your new companion is ready to play. Try feeding, playing, and caring for them!
              </p>
            </div>
            
            <VirtualPet selectedPet={selectedPet} />
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Your pet selection has been saved! You can always come back to choose a different companion.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Customize;