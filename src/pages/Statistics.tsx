import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowLeft, TrendingUp, Heart, Gamepad2, Pizza, Calendar, Activity, Sparkles } from "lucide-react";
import { availablePets, type PetType } from "@/components/PetCustomizer";
import { petActivityTracker, type PetStats } from "@/utils/petActivityTracker";

export default function Statistics() {
  const [selectedPet, setSelectedPet] = useState<PetType>(availablePets[0]);
  const [petStats, setPetStats] = useState<PetStats | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [reactionData, setReactionData] = useState<any[]>([]);

  // Load saved pet and statistics data
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

    // Load real statistics data
    const stats = petActivityTracker.getWeeklyStats();
    setPetStats(stats);

    // Format data for charts
    const formattedChartData = stats.weeklyData.map((day, index) => {
      const date = new Date(day.date);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return {
        day: dayNames[date.getDay()],
        feeding: day.feeding,
        playing: day.playing,
        caring: day.caring,
        mood: day.mood,
      };
    });
    setChartData(formattedChartData);

    // Format reaction data for pie chart
    const reactionColors = {
      happy: "hsl(var(--primary))",
      excited: "hsl(var(--accent))",
      content: "hsl(var(--secondary))",
      sleepy: "hsl(var(--muted))",
      hungry: "hsl(var(--destructive))",
      sad: "hsl(var(--destructive))",
      overfed: "hsl(var(--warning))"
    };

    const formattedReactionData = Object.entries(stats.allTimeReactions)
      .filter(([_, count]) => count > 0)
      .map(([emotion, count]) => ({
        emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
        count,
        color: reactionColors[emotion as keyof typeof reactionColors] || "hsl(var(--muted))"
      }));
    setReactionData(formattedReactionData);
  }, []);

  const chartConfig = {
    feeding: {
      label: "Feeding",
      color: "hsl(var(--primary))",
    },
    playing: {
      label: "Playing", 
      color: "hsl(var(--accent))",
    },
    caring: {
      label: "Caring",
      color: "hsl(var(--secondary))",
    },
    mood: {
      label: "Mood",
      color: "hsl(var(--primary))",
    }
  };

  // Calculate total statistics
  useEffect(() => {
    if (petStats) {
      // Stats are already calculated in petStats
    }
  }, [petStats]);

  if (!petStats) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-muted-foreground">Loading your pet's statistics...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Feedings",
      value: petStats.totalFeedings,
      icon: <Pizza className="w-6 h-6" />,
      gradient: "bg-gradient-primary",
      description: "This week"
    },
    {
      title: "Play Sessions", 
      value: petStats.totalPlaying,
      icon: <Gamepad2 className="w-6 h-6" />,
      gradient: "bg-gradient-accent",
      description: "This week"
    },
    {
      title: "Care Actions",
      value: petStats.totalCaring,
      icon: <Heart className="w-6 h-6" />,
      gradient: "bg-gradient-secondary",
      description: "This week"
    },
    {
      title: "Average Mood",
      value: `${petStats.avgMood}%`,
      icon: <Sparkles className="w-6 h-6" />,
      gradient: "bg-gradient-primary",
      description: "Overall happiness"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="hover:bg-accent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Pet Statistics</h1>
                <p className="text-sm text-muted-foreground">
                  Track {selectedPet.name}'s activity and wellbeing
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-6xl animate-bounce">
                {selectedPet.emoji}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card 
              key={stat.title}
              className={`
                ${stat.gradient} border-0 text-primary-foreground 
                shadow-medium hover:shadow-glow transition-all duration-300
                hover:scale-105 hover:-translate-y-1 group
                animate-fade-in
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
                    {stat.icon}
                  </div>
                  <TrendingUp className="w-4 h-4 opacity-70" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm opacity-80">{stat.title}</p>
                  <p className="text-xs opacity-60">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Timeline */}
          <Card className="bg-card/60 backdrop-blur border-border/40 shadow-medium hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Weekly Activity</span>
              </CardTitle>
              <CardDescription>
                Daily interactions with your pet
              </CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="feeding" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="playing" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="feeding" stackId="1" stroke="hsl(var(--primary))" fill="url(#feeding)" />
                    <Area type="monotone" dataKey="playing" stackId="1" stroke="hsl(var(--accent))" fill="url(#playing)" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Pet Reactions */}
          <Card className="bg-card/60 backdrop-blur border-border/40 shadow-medium hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Pet Reactions</span>
              </CardTitle>
              <CardDescription>
                Emotional responses throughout the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reactionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {reactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-background border border-border/50 rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{data.emotion}</p>
                              <p className="text-sm text-muted-foreground">{data.count} times</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              {/* Reactions Legend */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {reactionData.map((reaction, index) => (
                  <div key={reaction.emotion} className="flex items-center space-x-2 text-sm">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: reaction.color }}
                    />
                    <span className="text-muted-foreground">{reaction.emotion}</span>
                    <span className="font-medium ml-auto">{reaction.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mood Timeline */}
        <Card className="bg-card/60 backdrop-blur border-border/40 shadow-medium hover:shadow-glow transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Mood Tracking</span>
            </CardTitle>
            <CardDescription>
              Your pet's happiness levels over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-6">
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <Heart className="w-4 h-4 mr-2" />
            Back to Pet
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/activities'}
            className="hover:bg-accent hover:shadow-medium transition-all duration-300"
          >
            <Gamepad2 className="w-4 h-4 mr-2" />
            Play Games
          </Button>
        </div>
      </div>
    </div>
  );
}