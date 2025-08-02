import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { availablePets, type PetType } from "@/components/PetCustomizer";
import { ArrowLeft, Send, MapPin, Clock, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ActivityType = "chat" | "walk" | null;

const Activities = () => {
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState<PetType>(availablePets[0]);
  const [currentActivity, setCurrentActivity] = useState<ActivityType>(null);
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'pet'}>>([]);
  const [userInput, setUserInput] = useState("");
  const [walkProgress, setWalkProgress] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [walkLocation, setWalkLocation] = useState("Park");

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

  const petResponses = {
    greetings: ["Hello there! 🌟", "Woof! Great to see you!", "Purr... I missed you!", "Ready for some fun!"],
    questions: ["That's interesting! Tell me more", "I love learning new things!", "Wow, really?", "You're so smart!"],
    compliments: ["You're the best! ❤️", "That makes me so happy!", "You always know what to say!", "I'm lucky to have you!"],
    activities: ["Let's play together!", "Adventures are the best!", "I'm ready for anything!", "This is going to be fun!"],
    default: ["Hmm... *tilts head*", "I'm listening!", "Go on...", "That sounds nice!"]
  };

  const walkLocations = ["Park", "Beach", "Forest", "City", "Mountains", "Lake"];

  const getRandomResponse = (category: keyof typeof petResponses) => {
    const responses = petResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getResponseCategory = (message: string): keyof typeof petResponses => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'greetings';
    }
    if (lowerMessage.includes('?')) {
      return 'questions';
    }
    if (lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('amazing') || lowerMessage.includes('love')) {
      return 'compliments';
    }
    if (lowerMessage.includes('play') || lowerMessage.includes('walk') || lowerMessage.includes('fun')) {
      return 'activities';
    }
    return 'default';
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage = { text: userInput, sender: 'user' as const };
    const category = getResponseCategory(userInput);
    const petResponse = { text: getRandomResponse(category), sender: 'pet' as const };

    setChatMessages(prev => [...prev, newUserMessage, petResponse]);
    setUserInput("");
  };

  const startWalk = () => {
    setIsWalking(true);
    setWalkProgress(0);
    
    const interval = setInterval(() => {
      setWalkProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsWalking(false);
          setChatMessages(prev => [...prev, { 
            text: `That was a great walk in the ${walkLocation}! I feel so refreshed! 🌟`, 
            sender: 'pet' 
          }]);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="soft" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
          <div className="flex items-center gap-3">
            <div className="text-4xl">{selectedPet.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Activities with {selectedPet.name}</h1>
              <p className="text-muted-foreground">Chat, walk, and have fun together!</p>
            </div>
          </div>
        </div>

        {/* Activity Selection */}
        {!currentActivity && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              variant="soft"
              size="lg"
              onClick={() => setCurrentActivity('chat')}
              className="h-32 flex-col bg-gradient-primary"
            >
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-lg font-semibold">Chat with {selectedPet.name}</h3>
              <p className="text-sm opacity-80">Have a conversation with your pet</p>
            </Button>

            <Button
              variant="soft"
              size="lg"
              onClick={() => setCurrentActivity('walk')}
              className="h-32 flex-col bg-gradient-accent"
            >
              <div className="text-4xl mb-3">🚶‍♂️</div>
              <h3 className="text-lg font-semibold">Take a Walk</h3>
              <p className="text-sm opacity-80">Explore different locations together</p>
            </Button>
          </div>
        )}

        {/* Chat Activity */}
        {currentActivity === 'chat' && (
          <div className="bg-background rounded-3xl p-6 shadow-medium">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Chat with {selectedPet.name}</h2>
              <Button variant="outline" size="sm" onClick={() => setCurrentActivity(null)}>
                Back to Activities
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="bg-muted/20 rounded-2xl p-4 h-64 overflow-y-auto mb-4 space-y-3">
              {chatMessages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <div className="text-3xl mb-2">{selectedPet.happyEmoji}</div>
                  <p>Start a conversation with {selectedPet.name}!</p>
                </div>
              )}
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'pet' && <div className="text-2xl">{selectedPet.emoji}</div>}
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background shadow-soft'
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.sender === 'user' && <div className="text-2xl">😊</div>}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-3">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Walk Activity */}
        {currentActivity === 'walk' && (
          <div className="bg-background rounded-3xl p-6 shadow-medium">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Walk with {selectedPet.name}</h2>
              <Button variant="outline" size="sm" onClick={() => setCurrentActivity(null)}>
                Back to Activities
              </Button>
            </div>

            {/* Location Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Choose Location
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {walkLocations.map((location) => (
                  <Button
                    key={location}
                    variant={walkLocation === location ? "default" : "outline"}
                    size="sm"
                    onClick={() => setWalkLocation(location)}
                    disabled={isWalking}
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>

            {/* Walk Progress */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 float-gentle">
                {isWalking ? "🚶‍♂️" : selectedPet.emoji}
              </div>
              
              {isWalking && (
                <div className="space-y-3">
                  <div className="bg-muted rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${walkProgress}%` }}
                    />
                  </div>
                  <p className="text-muted-foreground flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    Walking in the {walkLocation}... {Math.round(walkProgress)}%
                  </p>
                </div>
              )}
            </div>

            {/* Walk Button */}
            <div className="text-center">
              <Button
                onClick={startWalk}
                disabled={isWalking}
                size="lg"
                className="bg-gradient-primary"
              >
                <Heart className="w-4 h-4 mr-2" />
                {isWalking ? 'Walking...' : `Take ${selectedPet.name} for a Walk`}
              </Button>
            </div>

            {/* Recent Chat Messages */}
            {chatMessages.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">Recent Chats</h3>
                <div className="space-y-2">
                  {chatMessages.slice(-3).map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 text-sm ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.sender === 'pet' && <span>{selectedPet.emoji}</span>}
                      <span className="opacity-70">{message.text}</span>
                      {message.sender === 'user' && <span>😊</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;