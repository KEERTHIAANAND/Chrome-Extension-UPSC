import React, { useState } from 'react';
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
  const [user] = useState({
    name: 'Rohan K.',
    batch: 'Aspirant Batch 2025',
    avatar: null,
    currentXP: 3450,
    targetXP: 5000,
    nextRank: 'District Magistrate',
    rank: {
      title: 'Sub-Divisional Magistrate',
      abbreviation: 'SDM'
    }
  });

  const [quote] = useState({
    text: 'Arise, awake, and stop not till the goal is reached.',
    author: 'SWAMI VIVEKANANDA'
  });

  const [stats] = useState({
    threatsBlocked: 3,
    focusBreaches: 7,
    disciplineScore: 71
  });

  const [missions, setMissions] = useState([]);

  const handleAddMission = (mission) => {
    setMissions([...missions, { ...mission, completed: false }]);
  };

  const handleSaveNotes = (notes) => {
    console.log('Notes saved:', notes);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header quote={quote} daysToExam={200} streak={7} />
        <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
          <Journey />
          <StatsCards stats={stats} />

          {/* Daily Missions and Streak Timer */}
          <div className="grid grid-cols-[1.5fr_1fr] gap-6">
            <DailyMissions missions={missions} onAddMission={handleAddMission} />
            <StreakTimer streak={7} initialMinutes={25} />
          </div>

          {/* Bookmarks and Quick Notes */}
          <div className="grid grid-cols-[1.5fr_1fr] gap-6">
            <Bookmarks />
            <QuickNotes onSave={handleSaveNotes} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
