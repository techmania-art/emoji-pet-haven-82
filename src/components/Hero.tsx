import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Heart } from "lucide-react";

export const Hero = () => {
  const scrollToHub = () => {
    document.getElementById("interactive-hub")?.scrollIntoView({ 
      behavior: "smooth" 
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-glow/20 via-background to-accent/10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 text-4xl opacity-50 float-gentle">🌟</div>
      <div className="absolute top-40 right-32 text-3xl opacity-40 float-delayed">🎈</div>
      <div className="absolute bottom-40 left-16 text-3xl opacity-30 float-gentle">🦋</div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Main Heading */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-primary mr-3 animate-pulse" />
            <span className="text-lg font-medium text-primary">Welcome to PetSphere</span>
            <Sparkles className="w-8 h-8 text-primary ml-3 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your Virtual
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Companion
            </span>
            <span className="block text-3xl md:text-4xl font-medium text-muted-foreground mt-2">
              Awaits You
            </span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Experience the joy of caring for your virtual pet in an immersive 3D environment. 
          Feed, play, and watch them react with genuine emotions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button
            variant="floating"
            size="lg"
            onClick={scrollToHub}
            className="text-lg px-10 py-6 h-auto"
          >
            <Heart className="w-6 h-6 mr-2" />
            Meet Your Pet
          </Button>
          
          <Button
            variant="soft"
            size="lg"
            className="text-lg px-10 py-6 h-auto"
          >
            Learn More
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="cursor-pointer group transition-all duration-300 hover:scale-110"
          onClick={scrollToHub}
        >
          <div className="flex flex-col items-center text-muted-foreground">
            <span className="text-sm mb-2 group-hover:text-primary transition-colors">
              Start Your Journey
            </span>
            <ArrowDown className="w-6 h-6 animate-bounce group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
};