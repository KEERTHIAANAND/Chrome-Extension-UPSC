import React from 'react';

const Header = ({ quote, daysToExam, streak }) => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 gap-8">
            {/* Motivational Quote */}
            <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #ff9933, #ff6b00)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                </div>
                <div className="flex-1">
                    {quote.text ? (
                        <>
                            <p className="text-base font-medium italic text-gray-700 mb-2 leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>"{quote.text}"</p>
                            <div className="flex items-center gap-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-wider" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#16a34a' }}>
                                    <span className="text-sm">🌿</span>
                                    WISDOM
                                </span>
                                <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#1a3a6b' }}>— {quote.author}</span>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-gray-400 italic">Add a motivational quote to inspire your journey</p>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
                {/* Days Counter */}
                <div className="flex items-center gap-3 px-5 py-3 border rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ background: 'linear-gradient(135deg, rgba(26,58,107,0.05), rgba(26,58,107,0.02))', borderColor: 'rgba(26,58,107,0.1)' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white" style={{ background: '#1a3a6b' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#1a3a6b' }}>-{daysToExam} Days</span>
                        <span className="text-[0.6rem] font-semibold text-gray-500 tracking-wide uppercase">TO PRELIMS 2025</span>
                    </div>
                </div>

                {/* Streak Counter */}
                <div className="flex items-center gap-3 px-5 py-3 border rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.05), rgba(255,107,0,0.02))', borderColor: 'rgba(255,107,0,0.1)' }}>
                    <span className="text-2xl animate-pulse">🔥</span>
                    <div className="flex flex-col">
                        <span className="text-base font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#ff6b00' }}>{streak}</span>
                        <span className="text-[0.6rem] font-semibold text-gray-500 tracking-wide uppercase">DAY STREAK</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
