import React from 'react';

const StatsCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {/* Threats Blocked */}
            <div className="bg-white rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #ef4444, #f87171)' }}></div>
                <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="M12 8v4M12 16h.01" />
                        </svg>
                    </div>
                </div>
                <span className="text-4xl font-bold text-gray-800 block mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{stats.threatsBlocked}</span>
                <span className="text-sm font-medium text-gray-600">Threats Blocked</span>
                <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.65rem] font-semibold tracking-wide uppercase" style={{ background: 'rgba(16,185,129,0.1)', color: '#16a34a' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        DISTRACTIONS NEUTRALIZED
                    </span>
                </div>
            </div>

            {/* Focus Breaches */}
            <div className="bg-white rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}></div>
                <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                        </svg>
                    </div>
                </div>
                <span className="text-4xl font-bold block mb-1" style={{ fontFamily: 'Outfit, sans-serif', color: '#f59e0b' }}>{stats.focusBreaches}</span>
                <span className="text-sm font-medium text-gray-600">Focus Breaches</span>
                <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.65rem] font-semibold tracking-wide uppercase" style={{ background: 'rgba(245,158,11,0.1)', color: '#d97706' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        TAB SWITCHES DETECTED
                    </span>
                </div>
            </div>

            {/* Discipline Score */}
            <div className="bg-white rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #1a3a6b, #2d5aa0)' }}></div>
                <div className="flex justify-between items-start mb-4">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'rgba(26,58,107,0.1)', color: '#1a3a6b' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.7rem] font-semibold" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                        Live
                    </span>
                </div>
                <span className="text-4xl font-bold block mb-1" style={{ fontFamily: 'Outfit, sans-serif', color: '#1a3a6b' }}>{stats.disciplineScore}%</span>
                <span className="text-sm font-medium text-gray-600">Discipline Score</span>
                <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[0.65rem] font-semibold tracking-wide uppercase" style={{ background: 'rgba(26,58,107,0.1)', color: '#6b7280' }}>
                        REAL-TIME EFFICIENCY
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
