import React, { useState } from 'react';

// Rank definitions
const RANKS = [
    { title: 'Beginner', xp: 0, icon: '🔰' },
    { title: 'Learner', xp: 1500, icon: '📜' },
    { title: 'Focused', xp: 5000, icon: '🔥' },
    { title: 'Dedicated', xp: 15000, icon: '⚔️' },
    { title: 'Master', xp: 30000, icon: '👑' },
    { title: 'Champion', xp: 50000, icon: '🏆' },
];

const Sidebar = ({ user, onShare }) => {
    const xpPercentage = (user.currentXP / user.targetXP) * 100;
    const [showRules, setShowRules] = useState(false);

    // Get current rank based on XP
    const getCurrentRank = () => {
        for (let i = RANKS.length - 1; i >= 0; i--) {
            if (user.currentXP >= RANKS[i].xp) {
                return RANKS[i];
            }
        }
        return RANKS[0];
    };

    const currentRank = getCurrentRank();
    const nextRankIndex = RANKS.findIndex(r => r.xp > user.currentXP);
    const nextRank = nextRankIndex !== -1 ? RANKS[nextRankIndex] : null;

    return (
        <aside className="w-60 min-h-screen bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 flex flex-col p-4">
            {/* Header with Help */}
            <div className="flex items-center justify-end mb-2">
                {/* Help/Rules Icon - Clipboard with checkmarks */}
                <button
                    onClick={() => setShowRules(true)}
                    className="w-12 h-12 bg-orange-50 border-2 border-orange-200 rounded-xl flex items-center justify-center cursor-pointer text-orange-500 hover:bg-orange-100 hover:border-orange-300 transition-all shadow-sm"
                    title="Dashboard Rules"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                        <path d="M9 12l2 2 4-4" />
                        <path d="M9 17h6" />
                    </svg>
                </button>
            </div>

            {/* National Emblem & Branding */}
            <div className="flex flex-col items-center py-2 pb-5 border-b border-gray-200 mb-4">
                <div className="w-40 h-40 flex items-center justify-center mb-3">
                    <img src="/logo.png" alt="National Emblem" className="w-full h-full object-contain drop-shadow-md" />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold tracking-[4px]" style={{ fontFamily: 'Outfit, sans-serif', color: '#1a3a6b' }}>UPSC</h1>
                    <span className="block text-md font-bold tracking-[4px] mt-1 " style={{ fontFamily: 'Outfit, sans-serif', color: '#ff6b00' }}>CONTROL ROOM</span>
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-5 text-center shadow-lg mb-4">
                <div className="relative inline-block mb-3">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200">
                        <img src={user.avatar || '/default-avatar.svg'} alt="UPSC Aspirant" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-[3px] border-white rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#1a3a6b' }}>UPSC Aspirant</h3>
                <p className="text-xs text-gray-500">CSE 2026</p>
            </div>

            {/* Rank Card - Dynamic */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-4 text-center">
                <div className="mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold tracking-widest uppercase" style={{ color: '#ff6b00' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                        </svg>
                        CURRENT RANK
                    </span>
                </div>
                <div className="text-2xl mb-1">{currentRank.icon}</div>
                <h2 className="text-sm font-bold leading-tight" style={{ fontFamily: 'Outfit, sans-serif', color: '#1a3a6b' }}>{currentRank.title}</h2>
            </div>

            {/* XP Progress */}
            <div className="py-2 mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">⚡</span>
                    <span className="text-sm font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#1a3a6b' }}>{user.currentXP.toLocaleString()} XP</span>
                    <span className="text-[0.65rem] font-semibold text-gray-500 ml-auto tracking-wide">TARGET: {user.targetXP.toLocaleString()}</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${xpPercentage}%`,
                            background: 'linear-gradient(90deg, #ff6b00, #ff9933, #138808)'
                        }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                    {nextRank ? (
                        <>
                            Earn <strong style={{ color: '#ff6b00' }}>+{(nextRank.xp - user.currentXP).toLocaleString()} XP</strong> to unlock<br />
                            <span className="font-semibold" style={{ color: '#1a3a6b' }}>{nextRank.icon} {nextRank.title}</span> rank.
                        </>
                    ) : (
                        <span className="font-semibold" style={{ color: '#138808' }}>🏆 You've reached Champion rank!</span>
                    )}
                </p>
            </div>

            {/* Ranks Progression Section */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">🎖️</span>
                    <h3 className="text-xs font-bold uppercase tracking-wide" style={{ color: '#1a3a6b' }}>Rank Progression</h3>
                </div>
                <div className="space-y-1.5">
                    {RANKS.map((rank, index, arr) => {
                        const isUnlocked = user.currentXP >= rank.xp;
                        const isCurrent = isUnlocked && (index === arr.length - 1 || user.currentXP < arr[index + 1].xp);
                        return (
                            <div
                                key={rank.title}
                                className={`flex items-center gap-2 p-2 rounded-lg transition-all ${isCurrent
                                    ? 'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200'
                                    : isUnlocked
                                        ? 'bg-green-50 border border-green-100'
                                        : 'bg-gray-50 border border-gray-100 opacity-50'
                                    }`}
                            >
                                <span className={`text-lg ${!isUnlocked ? 'grayscale' : ''}`}>{rank.icon}</span>
                                <div className="flex-1">
                                    <span className={`text-[0.65rem] font-bold ${isCurrent ? 'text-orange-600' : isUnlocked ? 'text-green-600' : 'text-gray-400'}`}>
                                        {rank.title}
                                    </span>
                                    <span className="text-[0.5rem] text-gray-400 ml-1">({rank.xp.toLocaleString()} XP)</span>
                                </div>
                                {isCurrent && <span className="text-orange-500 text-xs">◀</span>}
                                {isUnlocked && !isCurrent && <span className="text-green-500 text-xs">✓</span>}
                                {!isUnlocked && <span className="text-gray-300 text-xs">🔒</span>}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Share Button */}
            <button
                onClick={onShare}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 text-white text-xs font-bold tracking-widest rounded-lg cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg mt-auto"
                style={{ fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(135deg, #1a3a6b, #0f2444)' }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                </svg>
                SHARE YOUR IMPACT
            </button>

            {/* Rules Modal */}
            {showRules && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15, 36, 68, 0.9)' }}>
                    <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style>{`.modal-scroll::-webkit-scrollbar { display: none; }`}</style>
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between z-10">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">📋</span>
                                <h2 className="text-lg font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#1a3a6b' }}>Dashboard Rules</h2>
                            </div>
                            <button
                                onClick={() => setShowRules(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-5 space-y-5">
                            {/* Points Section */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: '#ff6b00' }}>⚡ Points System</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                        <span className="text-sm text-gray-700">Complete a Mission</span>
                                        <span className="text-sm font-bold text-green-600">+50 XP</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                        <span className="text-sm text-gray-700">1 Hour of Focus</span>
                                        <span className="text-sm font-bold text-green-600">+50 XP</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                        <span className="text-sm text-gray-700">Complete Pomodoro (25 min)</span>
                                        <span className="text-sm font-bold text-green-600">+25 XP</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                        <span className="text-sm text-gray-700">Visit Blocked Site</span>
                                        <span className="text-sm font-bold text-red-500">-5 XP</span>
                                    </div>
                                </div>
                            </div>

                            {/* Discipline Section */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: '#ff6b00' }}>🛡️ Discipline Score</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                        <span className="text-sm text-gray-700">1 Hour of Focus</span>
                                        <span className="text-sm font-bold text-green-600">+0.5%</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                        <span className="text-sm text-gray-700">Blocked Site Attempt</span>
                                        <span className="text-sm font-bold text-red-500">-1%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Journey Section */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: '#ff6b00' }}>🚀 Journey Stages</h3>
                                <div className="text-xs text-gray-600 space-y-1.5">
                                    <div className="flex justify-between"><span>Foundation</span><span className="font-semibold">0 XP</span></div>
                                    <div className="flex justify-between"><span>NCERTs</span><span className="font-semibold">1,500 XP</span></div>
                                    <div className="flex justify-between"><span>Prelims Ready</span><span className="font-semibold">5,000 XP</span></div>
                                    <div className="flex justify-between"><span>Mains Mastery</span><span className="font-semibold">10,000 XP</span></div>
                                    <div className="flex justify-between"><span>Interview</span><span className="font-semibold">20,000 XP</span></div>
                                    <div className="flex justify-between"><span className="font-bold" style={{ color: '#1a3a6b' }}>LBSNAA 🏛️</span><span className="font-bold" style={{ color: '#ff6b00' }}>50,000 XP</span></div>
                                </div>
                            </div>

                            {/* Shortcuts */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: '#ff6b00' }}>⌨️ Shortcuts</h3>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-700">Quick Bookmark</span>
                                    <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono font-bold text-gray-700">Ctrl+Shift+S</kbd>
                                </div>
                            </div>

                            {/* Easter Egg - Hidden Message */}
                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-[0.6rem] text-center text-gray-300 leading-relaxed">
                                    Made with ❤️ for UPSC Aspirants<br />
                                    <span className="italic">"Your dedication today shapes the nation tomorrow"</span><br />
                                    <span className="font-semibold mt-1 block">— Keerthi Aanand</span>
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t border-gray-100 px-5 py-4">
                            <button
                                onClick={() => setShowRules(false)}
                                className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
                                style={{ background: 'linear-gradient(135deg, #1a3a6b, #0f2444)' }}
                            >
                                Got it!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
