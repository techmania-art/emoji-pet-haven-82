import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Heart, Zap, Shield, Star, Bitcoin, DollarSign, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Supplement {
  id: string;
  name: string;
  description: string;
  effect: string;
  price: number;
  cryptoPrice: number;
  icon: React.ReactNode;
  rarity: "common" | "rare" | "epic" | "legendary";
  benefits: string[];
  stats: {
    health: number;
    energy: number;
    happiness: number;
  };
}

const supplements: Supplement[] = [
  {
    id: "health-boost",
    name: "Vita-Pet Health Boost",
    description: "Premium health supplement that keeps your virtual pet in perfect condition",
    effect: "Increases pet health regeneration by 50%",
    price: 4.99,
    cryptoPrice: 0.00012,
    icon: <Heart className="w-8 h-8 text-red-400" />,
    rarity: "common",
    benefits: ["Faster health recovery", "Immunity boost", "Longer pet lifespan"],
    stats: { health: 25, energy: 5, happiness: 10 }
  },
  {
    id: "energy-crystal",
    name: "Energy Crystal Food",
    description: "Crystallized energy that supercharges your pet's activities",
    effect: "Unlimited energy for 24 hours",
    price: 7.99,
    cryptoPrice: 0.00019,
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    rarity: "rare",
    benefits: ["24h unlimited energy", "Enhanced performance", "Glowing aura effect"],
    stats: { health: 10, energy: 50, happiness: 15 }
  },
  {
    id: "shield-supplement",
    name: "Guardian Shield Mix",
    description: "Protective supplement that shields your pet from all negative effects",
    effect: "Complete immunity to sickness for 7 days",
    price: 12.99,
    cryptoPrice: 0.00031,
    icon: <Shield className="w-8 h-8 text-blue-400" />,
    rarity: "epic",
    benefits: ["7-day immunity", "Damage resistance", "Protective barrier visual"],
    stats: { health: 40, energy: 20, happiness: 25 }
  },
  {
    id: "legendary-feast",
    name: "Legendary Rainbow Feast",
    description: "The ultimate pet supplement that maxes out all stats permanently",
    effect: "Permanently increases all stats by 100%",
    price: 49.99,
    cryptoPrice: 0.00120,
    icon: <Star className="w-8 h-8 text-purple-400" />,
    rarity: "legendary",
    benefits: ["Permanent stat boost", "Rainbow particle effects", "Exclusive pet title"],
    stats: { health: 100, energy: 100, happiness: 100 }
  }
];

const PaymentDialog = ({ supplement }: { supplement: Supplement }) => {
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "fiat">("crypto");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert(`Successfully purchased ${supplement.name}!`);
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {supplement.icon}
          Purchase {supplement.name}
        </DialogTitle>
        <DialogDescription>
          Choose your preferred payment method
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button 
            variant={paymentMethod === "crypto" ? "default" : "outline"}
            onClick={() => setPaymentMethod("crypto")}
            className="flex-1"
          >
            <Bitcoin className="w-4 h-4 mr-2" />
            Crypto
          </Button>
          <Button 
            variant={paymentMethod === "fiat" ? "default" : "outline"}
            onClick={() => setPaymentMethod("fiat")}
            className="flex-1"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            USD
          </Button>
        </div>
        
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span className="text-lg font-bold">
                {paymentMethod === "crypto" 
                  ? `${supplement.cryptoPrice} BTC` 
                  : `$${supplement.price}`
                }
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          onClick={handlePurchase} 
          disabled={isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? "Processing..." : `Pay ${paymentMethod === "crypto" ? "with Bitcoin" : "with USD"}`}
        </Button>
      </div>
    </DialogContent>
  );
};

const SupplementCard = ({ supplement }: { supplement: Supplement }) => {
  const rarityColors = {
    common: "bg-gray-100 text-gray-700",
    rare: "bg-blue-100 text-blue-700",
    epic: "bg-purple-100 text-purple-700",
    legendary: "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700"
  };

  return (
    <Card className="bg-gradient-card hover:shadow-glow transition-all duration-300 hover:scale-105 transform cursor-pointer group">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-primary/10 group-hover:scale-110 transition-transform duration-300">
          {supplement.icon}
        </div>
        <Badge className={rarityColors[supplement.rarity]} variant="outline">
          {supplement.rarity}
        </Badge>
        <CardTitle className="text-xl">{supplement.name}</CardTitle>
        <CardDescription>{supplement.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">{supplement.effect}</p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-400" />
              +{supplement.stats.health}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              +{supplement.stats.energy}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-purple-400" />
              +{supplement.stats.happiness}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold text-center">Benefits:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {supplement.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-lg font-bold">${supplement.price}</p>
            <p className="text-xs text-muted-foreground">{supplement.cryptoPrice} BTC</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="floating" size="sm">
                Buy Now
              </Button>
            </DialogTrigger>
            <PaymentDialog supplement={supplement} />
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

const Supplements = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const categories = [
    { id: "all", name: "All Supplements", count: supplements.length },
    { id: "health", name: "Health Boosters", count: 2 },
    { id: "energy", name: "Energy Sources", count: 1 },
    { id: "premium", name: "Premium Items", count: 2 }
  ];

  const filteredSupplements = selectedCategory === "all" 
    ? supplements 
    : supplements.filter(s => {
        if (selectedCategory === "health") return s.stats.health > 20;
        if (selectedCategory === "energy") return s.stats.energy > 30;
        if (selectedCategory === "premium") return s.rarity === "epic" || s.rarity === "legendary";
        return true;
      });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-4">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Bitcoin className="w-4 h-4 mr-2" />
                    BTC: $45,230
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <p className="text-sm">Current Bitcoin price for crypto payments</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-background via-muted/30 to-accent/20">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Pet Supplements Store
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Power up your virtual pet with premium supplements. Pay with cryptocurrency or traditional currency.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Badge variant="outline" className="px-4 py-2">
                <Bitcoin className="w-4 h-4 mr-2" />
                Crypto Payments
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Instant Delivery
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Secure Transactions
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Supplements Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSupplements.map((supplement, index) => (
              <div key={supplement.id} className="float-gentle" style={{ animationDelay: `${index * 0.1}s` }}>
                <SupplementCard supplement={supplement} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Boost Your Pet?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of pet owners who trust our premium supplements
          </p>
          <Link to="/customize">
            <Button variant="secondary" size="lg" className="btn-3d">
              Customize Your Pet
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Supplements;