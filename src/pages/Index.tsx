import { Hero } from "@/components/Hero";
import { InteractiveHub } from "@/components/InteractiveHub";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />
      
      {/* Interactive 3D Hub */}
      <section id="interactive-hub" className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Interactive Pet Hub
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Click on any area to explore different aspects of pet care. Your virtual companion is waiting in the center!
          </p>
        </div>
        
        <InteractiveHub />
      </section>
    </div>
  );
};

export default Index;
