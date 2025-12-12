import React, { useState, useEffect } from 'react';
import {
  Sidebar,
  Header,
  Journey,
  StatsCards,
  DailyMissions,
  StreakTimer,
  Bookmarks,
  QuickNotes
} from './components';

function App() {
  // User data - empty defaults
  const [user, setUser] = useState({
    name: '',
    batch: '',
    avatar: null,
    currentXP: 0,
    targetXP: 5000,
    nextRank: 'Sub-Divisional Magistrate',
    rank: {
      title: 'Aspirant',
      abbreviation: 'ASP'
    }
  });

  // Quote - can be fetched from API later
  const [quote] = useState({
    text: '',
    author: ''
  });

  // Stats - empty defaults
  const [stats, setStats] = useState({
    threatsBlocked: 0,
    totalFocusMinutes: 0,
    disciplineScore: 0
  });

  // Streak
  const [streak, setStreak] = useState(0);

  // Days to exam - empty default
  const [daysToExam, setDaysToExam] = useState(0);

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
          'user', 'stats', 'missions', 'bookmarks', 'notes', 'examDate'
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

          // Calculate days to exam
          if (data.examDate) {
            const examDate = new Date(data.examDate);
            const today = new Date();
            const diffTime = examDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysToExam(diffDays > 0 ? diffDays : 0);
          }
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

    return () => clearInterval(refreshInterval);
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

  const handleAddMission = (mission) => {
    const newMissions = [...missions, { ...mission, id: Date.now(), completed: false }];
    setMissions(newMissions);
    saveToStorage('saveMissions', { missions: newMissions });
  };

  const handleToggleMission = (id) => {
    const newMissions = missions.map(m =>
      m.id === id ? { ...m, completed: !m.completed } : m
    );
    setMissions(newMissions);
    saveToStorage('saveMissions', { missions: newMissions });
  };

  const handleAddBookmark = (bookmark) => {
    const newBookmarks = [...bookmarks, { ...bookmark, id: Date.now() }];
    setBookmarks(newBookmarks);
    saveToStorage('saveBookmarks', { bookmarks: newBookmarks });
  };

  const handleSaveNotes = (newNotes) => {
    setNotes(newNotes);
    saveToStorage('saveNotes', { notes: newNotes });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header quote={quote} daysToExam={daysToExam} streak={streak} />
        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
          <Journey currentXP={user.currentXP} />
          <StatsCards stats={stats} />

          {/* Daily Missions and Streak Timer */}
          <div className="grid grid-cols-[1.5fr_1fr] gap-6">
            <DailyMissions
              missions={missions}
              onAddMission={handleAddMission}
              onToggleMission={handleToggleMission}
            />
            <StreakTimer streak={streak} initialMinutes={25} />
          </div>

          {/* Bookmarks and Quick Notes */}
          <div className="grid grid-cols-[1.5fr_1fr] gap-6">
            <Bookmarks bookmarks={bookmarks} onAddBookmark={handleAddBookmark} />
            <QuickNotes notes={notes} onSave={handleSaveNotes} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
