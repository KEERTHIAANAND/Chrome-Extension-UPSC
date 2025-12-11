import React from 'react';

const journeyStages = [
    { id: 1, name: 'Foundation', xp: '0 XP', icon: 'foundation', completed: true },
    { id: 2, name: 'NCERTs', xp: '1.5K XP', icon: 'ncert', completed: true },
    { id: 3, name: 'Prelims Ready', xp: '5K XP', icon: 'prelims', current: true },
    { id: 4, name: 'Mains Mastery', xp: '10K XP', icon: 'mains', completed: false },
    { id: 5, name: 'Interview', xp: '20K XP', icon: 'interview', completed: false },
    { id: 6, name: 'LBSNAA', xp: 'RANK 1', icon: 'lbsnaa', completed: false },
];

const StageIcon = ({ type }) => {
    const icons = {
        foundation: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
        ncert: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>,
        prelims: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" fill="currentColor" /></svg>,
        mains: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>,
        interview: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
        lbsnaa: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /></svg>,
    };
    return icons[type] || null;
};

const Journey = () => {
    const currentIndex = journeyStages.findIndex(s => s.current);
    const progressPercent = ((currentIndex + 0.5) / journeyStages.length) * 100;

    return (
        <div className="bg-white rounded-2xl p-5 shadow-lg">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>Your Journey</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Path to LBSNAA</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 bg-gray-800 text-white text-[0.7rem] font-semibold rounded-full tracking-wide">Current Level</span>
                    <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Progress Track */}
                <div className="absolute top-6 left-10 right-10 z-[1]">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, #10b981 0%, #10b981 40%, #1a3a6b 100%)' }}
                        ></div>
                    </div>
                </div>

                {/* Stages */}
                <div className="flex justify-between relative z-[2]">
                    {journeyStages.map((stage) => {
                        const getMarkerStyle = () => {
                            if (stage.completed) return { background: '#1a3a6b', borderColor: '#1a3a6b', color: 'white' };
                            if (stage.current) return { background: 'linear-gradient(135deg, #ff9933, #ff6b00)', borderColor: '#ff6b00', color: 'white', boxShadow: '0 0 0 4px rgba(255,153,51,0.25), 0 4px 12px rgba(255,107,0,0.3)' };
                            return { background: 'white', borderColor: '#e5e7eb', color: '#9ca3af' };
                        };

                        return (
                            <div key={stage.id} className="flex flex-col items-center flex-1 max-w-[100px]">
                                <div className="mb-3">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-[3px] transition-all" style={getMarkerStyle()}>
                                        <StageIcon type={stage.icon} />
                                    </div>
                                </div>
                                <span className={`text-[0.7rem] font-semibold mb-0.5 tracking-wide`} style={{ color: stage.completed ? '#1a3a6b' : stage.current ? '#ff6b00' : '#9ca3af' }}>{stage.xp}</span>
                                <span className="text-xs font-semibold text-center max-w-[80px]" style={{ color: stage.completed ? '#4b5563' : stage.current ? '#1a3a6b' : '#9ca3af' }}>{stage.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Journey;
