import React, { useState } from 'react';

const DailyMissions = ({ missions, onAddMission }) => {
    const [newTask, setNewTask] = useState('');
    const [duration, setDuration] = useState('30 MIN');
    const completedCount = missions.filter(m => m.completed).length;

    const handleAddTask = () => {
        if (newTask.trim()) {
            onAddMission({ task: newTask, duration, completed: false });
            setNewTask('');
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg min-h-[280px] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>Daily Missions</h3>
                </div>
                <span className="text-[0.7rem] font-semibold text-gray-500 tracking-wide bg-gray-100 px-3 py-1.5 rounded-full">
                    {completedCount}/{missions.length} COMPLETED
                </span>
            </div>

            {/* Add Task Row */}
            <div className="flex items-center justify-between py-3 border-b border-gray-200 mb-4">
                <div className="flex items-center gap-3 flex-1">
                    <span className="text-gray-400 text-xl font-light">+</span>
                    <input
                        type="text"
                        className="flex-1 border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                        placeholder="Add a new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="appearance-none px-3 py-1.5 border-none bg-transparent text-sm font-medium text-gray-500 cursor-pointer outline-none"
                    >
                        <option value="15 MIN">15 MIN</option>
                        <option value="30 MIN">30 MIN</option>
                        <option value="45 MIN">45 MIN</option>
                        <option value="60 MIN">60 MIN</option>
                    </select>
                    <button
                        onClick={handleAddTask}
                        className="w-7 h-7 border-none rounded text-white text-xl font-light cursor-pointer flex items-center justify-center hover:scale-105 transition-all"
                        style={{ background: '#ff6b00' }}
                    >+</button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                {missions.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 py-8">
                        <svg className="text-gray-300" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                        </svg>
                        <span className="text-xs font-semibold text-gray-400 tracking-widest">NO MISSIONS ACTIVE</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {missions.map((mission, index) => (
                            <div key={index} className={`flex items-center gap-3 p-3 bg-gray-100 rounded-lg transition-all hover:bg-gray-200 ${mission.completed ? 'opacity-60' : ''}`}>
                                <div className="w-5 h-5 flex items-center justify-center text-green-500">
                                    {mission.completed ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                    ) : (
                                        <div className="w-[18px] h-[18px] border-2 border-gray-300 rounded-full"></div>
                                    )}
                                </div>
                                <span className={`flex-1 text-sm text-gray-700 ${mission.completed ? 'line-through' : ''}`}>{mission.task}</span>
                                <span className="text-xs font-semibold text-gray-500">{mission.duration}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyMissions;
