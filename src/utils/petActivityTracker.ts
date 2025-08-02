export interface ActivityData {
  date: string; // YYYY-MM-DD format
  feeding: number;
  playing: number;
  caring: number;
  mood: number; // percentage
  reactions: {
    [emotion: string]: number;
  };
}

export interface PetStats {
  totalFeedings: number;
  totalPlaying: number;
  totalCaring: number;
  avgMood: number;
  weeklyData: ActivityData[];
  allTimeReactions: { [emotion: string]: number };
}

class PetActivityTracker {
  private storageKey = 'petActivityData';

  private getTodayKey(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getStoredData(): { [date: string]: ActivityData } {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  private saveData(data: { [date: string]: ActivityData }): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private initTodayData(): ActivityData {
    return {
      date: this.getTodayKey(),
      feeding: 0,
      playing: 0,
      caring: 0,
      mood: 50,
      reactions: {
        happy: 0,
        excited: 0,
        content: 0,
        sleepy: 0,
        hungry: 0,
        sad: 0,
        overfed: 0
      }
    };
  }

  private getTodayData(): ActivityData {
    const allData = this.getStoredData();
    const today = this.getTodayKey();
    
    if (!allData[today]) {
      allData[today] = this.initTodayData();
      this.saveData(allData);
    }
    
    return allData[today];
  }

  trackFeeding(): void {
    const allData = this.getStoredData();
    const today = this.getTodayKey();
    
    if (!allData[today]) {
      allData[today] = this.initTodayData();
    }
    
    allData[today].feeding += 1;
    allData[today].reactions.hungry = (allData[today].reactions.hungry || 0) + 1;
    
    // Update mood based on feeding (increase happiness)
    allData[today].mood = Math.min(100, allData[today].mood + 5);
    
    this.saveData(allData);
  }

  trackPlaying(): void {
    const allData = this.getStoredData();
    const today = this.getTodayKey();
    
    if (!allData[today]) {
      allData[today] = this.initTodayData();
    }
    
    allData[today].playing += 1;
    allData[today].reactions.excited = (allData[today].reactions.excited || 0) + 1;
    
    // Update mood based on playing (significant happiness boost)
    allData[today].mood = Math.min(100, allData[today].mood + 10);
    
    this.saveData(allData);
  }

  trackCaring(): void {
    const allData = this.getStoredData();
    const today = this.getTodayKey();
    
    if (!allData[today]) {
      allData[today] = this.initTodayData();
    }
    
    allData[today].caring += 1;
    allData[today].reactions.content = (allData[today].reactions.content || 0) + 1;
    
    // Update mood based on caring (moderate happiness boost)
    allData[today].mood = Math.min(100, allData[today].mood + 7);
    
    this.saveData(allData);
  }

  trackMoodChange(mood: 'happy' | 'sad' | 'neutral' | 'overfed'): void {
    const allData = this.getStoredData();
    const today = this.getTodayKey();
    
    if (!allData[today]) {
      allData[today] = this.initTodayData();
    }
    
    // Map moods to reaction types
    const moodToReaction: { [key: string]: string } = {
      happy: 'happy',
      sad: 'sad',
      neutral: 'content',
      overfed: 'overfed'
    };
    
    const reactionType = moodToReaction[mood];
    if (reactionType) {
      allData[today].reactions[reactionType] = (allData[today].reactions[reactionType] || 0) + 1;
    }
    
    // Adjust mood percentage based on emotion
    if (mood === 'sad') {
      allData[today].mood = Math.max(0, allData[today].mood - 5);
    } else if (mood === 'overfed') {
      allData[today].mood = Math.max(0, allData[today].mood - 3);
    } else if (mood === 'happy') {
      allData[today].mood = Math.min(100, allData[today].mood + 2);
    }
    
    this.saveData(allData);
  }

  trackIgnore(): void {
    const allData = this.getStoredData();
    const today = this.getTodayKey();
    
    if (!allData[today]) {
      allData[today] = this.initTodayData();
    }
    
    allData[today].reactions.sleepy = (allData[today].reactions.sleepy || 0) + 1;
    allData[today].mood = Math.max(0, allData[today].mood - 2);
    
    this.saveData(allData);
  }

  getWeeklyStats(): PetStats {
    const allData = this.getStoredData();
    const today = new Date();
    const weeklyData: ActivityData[] = [];
    
    // Get last 7 days of data
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      if (allData[dateKey]) {
        weeklyData.push(allData[dateKey]);
      } else {
        weeklyData.push({
          date: dateKey,
          feeding: 0,
          playing: 0,
          caring: 0,
          mood: 50,
          reactions: {
            happy: 0,
            excited: 0,
            content: 0,
            sleepy: 0,
            hungry: 0,
            sad: 0,
            overfed: 0
          }
        });
      }
    }

    // Calculate totals
    const totals = weeklyData.reduce(
      (acc, day) => ({
        totalFeedings: acc.totalFeedings + day.feeding,
        totalPlaying: acc.totalPlaying + day.playing,
        totalCaring: acc.totalCaring + day.caring,
        avgMood: acc.avgMood + day.mood,
      }),
      { totalFeedings: 0, totalPlaying: 0, totalCaring: 0, avgMood: 0 }
    );

    // Calculate all-time reactions
    const allTimeReactions: { [emotion: string]: number } = {};
    weeklyData.forEach(day => {
      Object.entries(day.reactions).forEach(([emotion, count]) => {
        allTimeReactions[emotion] = (allTimeReactions[emotion] || 0) + count;
      });
    });

    return {
      totalFeedings: totals.totalFeedings,
      totalPlaying: totals.totalPlaying,
      totalCaring: totals.totalCaring,
      avgMood: Math.round(totals.avgMood / weeklyData.length),
      weeklyData,
      allTimeReactions
    };
  }

  getTodayMood(): number {
    const todayData = this.getTodayData();
    return todayData.mood;
  }
}

export const petActivityTracker = new PetActivityTracker();