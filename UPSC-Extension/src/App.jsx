import React, { useState, useEffect } from 'react';
import {
  Sidebar,
  Header,
  Journey,
  StatsCards,
  DailyMissions,
  StreakTimer,
  Bookmarks,
  QuickNotes,
  ShareModal
} from './components';

function App() {
  // UPSC CSE Prelims 2026 - Official Date (Same for all users)
  // Source: UPSC Official Calendar
  const UPSC_PRELIMS_2026 = new Date('2026-05-24');

  // User data - defaults
  const [user, setUser] = useState({
    name: 'UPSC Aspirant',
    batch: 'CSE 2026',
    avatar: null,
    currentXP: 0,
    targetXP: 50000,
    nextRank: 'Sub-Divisional Magistrate',
    rank: {
      title: 'Aspirant',
      abbreviation: 'ASP'
    }
  });

  // Inspirational quotes from Indian leaders - changes daily
  const INDIAN_QUOTES = [
    { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "In a gentle way, you can shake the world.", author: "Mahatma Gandhi" },
    { text: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi" },
    { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
    { text: "We are what our thoughts have made us; so take care about what you think.", author: "Swami Vivekananda" },
    { text: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda" },
    { text: "Take up one idea. Make that one idea your life.", author: "Swami Vivekananda" },
    { text: "All power is within you; you can do anything and everything.", author: "Swami Vivekananda" },
    { text: "You have to dream before your dreams can come true.", author: "Dr. A.P.J. Abdul Kalam" },
    { text: "Don't take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.", author: "Dr. A.P.J. Abdul Kalam" },
    { text: "Excellence is a continuous process and not an accident.", author: "Dr. A.P.J. Abdul Kalam" },
    { text: "If you want to shine like a sun, first burn like a sun.", author: "Dr. A.P.J. Abdul Kalam" },
    { text: "Freedom is not worth having if it does not include the freedom to make mistakes.", author: "Mahatma Gandhi" },
    { text: "Swaraj is my birthright, and I shall have it.", author: "Bal Gangadhar Tilak" },
    { text: "Give me blood, and I shall give you freedom.", author: "Subhas Chandra Bose" },
    { text: "One individual may die for an idea, but that idea will, after his death, incarnate itself in a thousand lives.", author: "Subhas Chandra Bose" },
    { text: "Inquilab Zindabad!", author: "Bhagat Singh" },
    { text: "They may kill me, but they cannot kill my ideas.", author: "Bhagat Singh" },
    { text: "The fragrance of flowers spreads only in the direction of the wind. But the goodness of a person spreads in all directions.", author: "Chanakya" },
    { text: "Education is the best friend. An educated person is respected everywhere.", author: "Chanakya" },
    { text: "A person should not be too honest. Straight trees are cut first.", author: "Chanakya" },
    { text: "The secret of success is to be ready when your opportunity comes.", author: "Benjamin Disraeli (via Sardar Patel)" },
    { text: "Every Indian should now forget that he is a Rajput, a Sikh or a Jat. He must remember that he is an Indian.", author: "Sardar Vallabhbhai Patel" },
    { text: "Faith is the bird that feels the light when the dawn is still dark.", author: "Rabindranath Tagore" },
    { text: "Where the mind is without fear and the head is held high.", author: "Rabindranath Tagore" },
    { text: "The highest education is that which does not merely give us information but makes our life in harmony with all existence.", author: "Rabindranath Tagore" },
    { text: "I measure the progress of a community by the degree of progress which women have achieved.", author: "Dr. B.R. Ambedkar" },
    { text: "Cultivation of mind should be the ultimate aim of human existence.", author: "Dr. B.R. Ambedkar" },
    { text: "Life should be great rather than long.", author: "Dr. B.R. Ambedkar" },
    { text: "A country's greatness lies in its undying ideals of love and sacrifice.", author: "Sarojini Naidu" },
    { text: "Self-confidence is the first requisite to great undertakings.", author: "Jawaharlal Nehru" }
  ];

  // Get quote for today - Day 1 = Quote 1, Day 12 = Quote 12, etc.
  const getDailyQuote = () => {
    const today = new Date();
    const dayOfMonth = today.getDate(); // 1-31
    // Array is 0-indexed, so day 1 = index 0, day 12 = index 11
    return INDIAN_QUOTES[dayOfMonth - 1] || INDIAN_QUOTES[0];
  };

  const [quote, setQuote] = useState(() => getDailyQuote());

  // Stats - empty defaults
  const [stats, setStats] = useState({
    threatsBlocked: 0,
    totalFocusMinutes: 0,
    disciplineScore: 0
  });

  // Streak
  const [streak, setStreak] = useState(0);

  // UPSC CSE Mains 2026 - Official Date (August 21, 2026)
  const UPSC_MAINS_2026 = new Date('2026-08-21');

  // Days to exam - calculated dynamically
  const calculateDays = (targetDate) => {
    const now = new Date();
    // Reset both dates to midnight for accurate day comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    const diff = target.getTime() - today.getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const [daysToExam, setDaysToExam] = useState(() => calculateDays(UPSC_PRELIMS_2026));
  const [daysToMains, setDaysToMains] = useState(() => calculateDays(UPSC_MAINS_2026));

  // Function to calculate days remaining (for interval updates)
  const calculateDaysRemaining = () => {
    setDaysToExam(calculateDays(UPSC_PRELIMS_2026));
    setDaysToMains(calculateDays(UPSC_MAINS_2026));
  };

  // Update countdown on mount and every hour
  useEffect(() => {
    // Calculate immediately
    calculateDaysRemaining();

    // Update every hour (in case user keeps extension open overnight)
    const interval = setInterval(calculateDaysRemaining, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Missions
  const [missions, setMissions] = useState([]);

  // Bookmarks
  const [bookmarks, setBookmarks] = useState([]);

  // Notes
  const [notes, setNotes] = useState('');

  // Load data from Chrome Storage on mount
  useEffect(() => {
    const loadData = () => {
      // Check if running as Chrome extension
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get([
          'user', 'stats', 'missions', 'bookmarks', 'notes'
        ], (data) => {
          if (data.user) {
            // Sync XP from stats if available
            const userWithXP = {
              ...data.user,
              currentXP: data.stats?.totalXP || data.user.currentXP || 0
            };
            setUser(userWithXP);
          }
          if (data.stats) {
            setStats(data.stats);
            setStreak(data.stats.currentStreak || 0);
          }
          if (data.missions) setMissions(data.missions);
          if (data.bookmarks) setBookmarks(data.bookmarks);
          if (data.notes) setNotes(data.notes);
        });
      }
    };

    // Load data initially
    loadData();

    // Auto-refresh stats every 30 seconds to keep dashboard updated
    const refreshInterval = setInterval(() => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get(['stats'], (data) => {
          if (data.stats) {
            setStats(data.stats);
            setStreak(data.stats.currentStreak || 0);
            setUser(prev => ({
              ...prev,
              currentXP: data.stats.totalXP || prev.currentXP
            }));
          }
        });
      }
    }, 30000);

    // Update days countdown at midnight
    const updateDaysAtMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const msUntilMidnight = tomorrow.getTime() - now.getTime();

      // Set timeout to update at midnight
      const midnightTimeout = setTimeout(() => {
        // Update days countdown
        const today = new Date();
        const diffTime = UPSC_PRELIMS_2026.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysToExam(diffDays > 0 ? diffDays : 0);

        // Update daily quote
        setQuote(getDailyQuote());

        // Set up next midnight update
        updateDaysAtMidnight();
      }, msUntilMidnight);

      return midnightTimeout;
    };

    const midnightTimeout = updateDaysAtMidnight();

    return () => {
      clearInterval(refreshInterval);
      clearTimeout(midnightTimeout);
    };
  }, []);

  // Save data to Chrome Storage using message passing
  const saveToStorage = (action, data) => {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      chrome.runtime.sendMessage({ action, ...data }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Storage error:', chrome.runtime.lastError.message);
        }
      });
    }
  };

  // Helper to add XP and update state/storage
  const addXP = (amount) => {
    setUser(prev => {
      const newXP = (prev.currentXP || 0) + amount;
      const newUser = { ...prev, currentXP: newXP };

      // Sync with storage
      saveToStorage('saveUser', { user: newUser });
      return newUser;
    });
  };

  const handleAddMission = (mission) => {
    const newMissions = [...missions, { ...mission, id: Date.now() }];
    setMissions(newMissions);
    saveToStorage('saveMissions', { missions: newMissions });
  };

  const handleCompleteTask = (id) => {
    // Remove the completed task from the list
    const newMissions = missions.filter(m => m.id !== id);
    setMissions(newMissions);
    saveToStorage('saveMissions', { missions: newMissions });

    // Award +50 XP
    addXP(50);
  };

  const handleTimerComplete = () => {
    // Award +25 XP for Pomodoro cycle
    addXP(25);
  };

  const handleAddBookmark = (bookmark) => {
    const newBookmarks = [...bookmarks, { ...bookmark, id: Date.now() }];
    setBookmarks(newBookmarks);
    saveToStorage('saveBookmarks', { bookmarks: newBookmarks });
  };

  const handleRemoveBookmark = (id) => {
    const newBookmarks = bookmarks.filter(b => b.id !== id);
    setBookmarks(newBookmarks);
    saveToStorage('saveBookmarks', { bookmarks: newBookmarks });
  };

  const handleSaveNotes = (newNotes) => {
    setNotes(newNotes);
    saveToStorage('saveNotes', { notes: newNotes });
  };

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} onShare={() => setIsShareModalOpen(true)} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header quote={quote} daysToExam={daysToExam} daysToMains={daysToMains} streak={streak} />
        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
          <Journey currentXP={user.currentXP} />
          <StatsCards stats={stats} />

          {/* Daily Missions and Streak Timer */}
          <div className="grid grid-cols-[1.5fr_1fr] gap-6">
            <DailyMissions
              missions={missions}
              onAddMission={handleAddMission}
              onCompleteTask={handleCompleteTask}
            />
            <StreakTimer
              streak={streak}
              initialMinutes={25}
              onTimerComplete={handleTimerComplete}
            />
          </div>

          {/* Bookmarks and Quick Notes */}
          <div className="grid grid-cols-[1.5fr_1fr] gap-6">
            <Bookmarks bookmarks={bookmarks} onAddBookmark={handleAddBookmark} onRemoveBookmark={handleRemoveBookmark} />
            <QuickNotes notes={notes} onSave={handleSaveNotes} />
          </div>
        </div>
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        user={user}
        stats={stats}
        streak={streak}
        quote={quote}
      />
    </div>
  );
}

export default App;
