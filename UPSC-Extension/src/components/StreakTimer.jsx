import React, { useState, useEffect } from 'react';

const StreakTimer = ({ streak, initialMinutes = 25, breakMinutes = 5, onTimerComplete }) => {
    const [isBreakMode, setIsBreakMode] = useState(false);
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            if (!isBreakMode && onTimerComplete) {
                onTimerComplete();
                // Play a success sound or notification here could be nice, but keeping it simple
                alert("Focus Session Complete! +25 XP"); // Simple feedback
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, isBreakMode, onTimerComplete]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleMode = (breakMode) => {
        setIsBreakMode(breakMode);
        setTimeLeft(breakMode ? breakMinutes * 60 : initialMinutes * 60);
        setIsRunning(false);
    };

    const handleReset = () => {
        setTimeLeft(isBreakMode ? breakMinutes * 60 : initialMinutes * 60);
        setIsRunning(false);
    };

    // Generate 24 spokes for Ashoka Chakra
    const spokes = Array.from({ length: 24 }, (_, i) => i);

    return (
        <div className="bg-white rounded-2xl p-5 shadow-lg h-full flex flex-col">
            {/* Header */}
            <div className="mb-2">
                <h3 className="text-base font-bold text-[#ff6b00] m-0 mb-1 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {streak} Day Streak <span className="text-xl">🔥</span>
                </h3>
                <p className="text-xs text-gray-500 m-0 leading-snug">
                    Consistency is the key to cracking the exam.
                </p>
            </div>

            {/* Mode Toggle Buttons */}
            <div className="flex justify-center gap-2 mb-3">
                <button
                    onClick={() => toggleMode(false)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${!isBreakMode
                        ? 'bg-[#1a3a6b] text-white shadow-md'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                >
                    Focus (25 min)
                </button>
                <button
                    onClick={() => toggleMode(true)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${isBreakMode
                        ? 'bg-[#10b981] text-white shadow-md'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                >
                    Break (5 min)
                </button>
            </div>

            {/* Timer Container */}
            <div className="flex justify-center items-center flex-1">
                <div className="relative w-[280px] h-[280px]">
                    {/* SVG for circles and spokes */}
                    <svg
                        className="absolute top-0 left-0 w-full h-full"
                        viewBox="0 0 280 280"
                    >
                        {/* Outer dashed circle */}
                        <circle
                            cx="140" cy="140" r="136"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                            strokeDasharray="6 4"
                        />

                        {/* Middle ring */}
                        <circle
                            cx="140" cy="140" r="118"
                            fill="none"
                            stroke="#f3f4f6"
                            strokeWidth="2"
                        />

                        {/* Ashoka Chakra spokes */}
                        {spokes.map((_, index) => {
                            const angle = (index * 15) * (Math.PI / 180);
                            const x1 = 140 + Math.sin(angle) * 92;
                            const y1 = 140 - Math.cos(angle) * 92;
                            const x2 = 140 + Math.sin(angle) * 120;
                            const y2 = 140 - Math.cos(angle) * 120;
                            return (
                                <line
                                    key={index}
                                    x1={x1} y1={y1} x2={x2} y2={y2}
                                    stroke="#d1d5db"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                />
                            );
                        })}

                        {/* Inner ring around spokes */}
                        <circle
                            cx="140" cy="140" r="90"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                        />
                    </svg>

                    {/* Center content */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10 bg-white w-[160px] h-[160px] rounded-full justify-center">
                        <span className="text-4xl font-semibold text-gray-700 tracking-wider" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {formatTime(timeLeft)}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsRunning(!isRunning)}
                                className={`w-10 h-10 rounded-full border-none text-white flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-110 ${isRunning ? 'bg-[#ff6b00]' : isBreakMode ? 'bg-[#10b981]' : 'bg-[#1a3a6b]'}`}
                            >
                                {isRunning ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="6" y="4" width="4" height="16" rx="1" />
                                        <rect x="14" y="4" width="4" height="16" rx="1" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>
                            <button
                                onClick={handleReset}
                                className="w-8 h-8 rounded-full bg-transparent border-2 border-gray-300 text-gray-400 flex items-center justify-center cursor-pointer transition-all hover:border-gray-400 hover:text-gray-500"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M23 4v6h-6M1 20v-6h6" />
                                    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                                </svg>
                            </button>
                        </div>
                        <span className="text-[0.65rem] font-semibold tracking-widest mt-1 text-gray-400">
                            {isBreakMode ? 'BREAK TIME' : 'READY TO SERVE'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreakTimer;
