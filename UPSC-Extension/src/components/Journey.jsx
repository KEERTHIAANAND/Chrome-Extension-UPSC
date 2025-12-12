import React from 'react';

// XP thresholds for each stage
const XP_THRESHOLDS = [0, 1500, 5000, 10000, 20000, 50000];

const journeyStages = [
    { id: 1, name: 'Foundation', xpThreshold: 0, icon: 'foundation' },
    { id: 2, name: 'NCERTs', xpThreshold: 1500, icon: 'ncert' },
    { id: 3, name: 'Prelims Ready', xpThreshold: 5000, icon: 'prelims' },
    { id: 4, name: 'Mains Mastery', xpThreshold: 10000, icon: 'mains' },
    { id: 5, name: 'Interview', xpThreshold: 20000, icon: 'interview' },
    { id: 6, name: 'LBSNAA', xpThreshold: 50000, icon: 'lbsnaa' },
];

const formatXP = (xp) => {
    if (xp >= 1000) return `${(xp / 1000).toFixed(1)}K XP`;
    return `${xp} XP`;
};

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

const Journey = ({ currentXP = 0 }) => {
    // Calculate current stage based on XP
    const getCurrentStageIndex = () => {
        for (let i = journeyStages.length - 1; i >= 0; i--) {
            if (currentXP >= journeyStages[i].xpThreshold) {
                return i;
            }
        }
        return 0;
    };

    const currentStageIndex = getCurrentStageIndex();

    // Calculate precise progress percentage for the bar
    const calculateProgress = () => {
        if (currentXP === 0) return 0; // Explicit Zeroth Condition

        // Safe check for max stage
        if (currentStageIndex >= journeyStages.length - 1) return 100;

        const currentStage = journeyStages[currentStageIndex];
        const nextStage = journeyStages[currentStageIndex + 1];

        // XP range for this specific stage gap
        const stageRange = nextStage.xpThreshold - currentStage.xpThreshold;

        // XP earned within this stage
        const xpInStage = Math.max(0, currentXP - currentStage.xpThreshold);

        // Percentage completion of THIS stage (0 to 1)
        const stageProgress = stageRange > 0 ? xpInStage / stageRange : 0;

        // Map to total timeline width
        const segmentWidth = 100 / (journeyStages.length - 1);
        const baseProgress = currentStageIndex * segmentWidth;
        const addedProgress = stageProgress * segmentWidth;

        return Math.min(100, Math.max(0, baseProgress + addedProgress));
    };

    const progressPercent = calculateProgress();

    return (
        <div className="bg-white rounded-2xl p-5 shadow-lg">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>Your Journey</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Path to LBSNAA</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 bg-gray-800 text-white text-[0.7rem] font-semibold rounded-full tracking-wide">
                        {formatXP(currentXP)}
                    </span>
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
                    {journeyStages.map((stage, index) => {
                        const isCompleted = currentXP >= stage.xpThreshold && index < currentStageIndex;
                        const isCurrent = index === currentStageIndex;

                        const getMarkerStyle = () => {
                            if (isCompleted) return { background: '#1a3a6b', borderColor: '#1a3a6b', color: 'white' };
                            if (isCurrent) return { background: 'linear-gradient(135deg, #ff9933, #ff6b00)', borderColor: '#ff6b00', color: 'white', boxShadow: '0 0 0 4px rgba(255,153,51,0.25), 0 4px 12px rgba(255,107,0,0.3)' };
                            return { background: 'white', borderColor: '#e5e7eb', color: '#9ca3af' };
                        };

                        return (
                            <div key={stage.id} className="flex flex-col items-center flex-1 max-w-[100px]">
                                <div className="mb-3">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-[3px] transition-all" style={getMarkerStyle()}>
                                        <StageIcon type={stage.icon} />
                                    </div>
                                </div>
                                <span className="text-[0.7rem] font-semibold mb-0.5 tracking-wide" style={{ color: isCompleted ? '#1a3a6b' : isCurrent ? '#ff6b00' : '#9ca3af' }}>
                                    {formatXP(stage.xpThreshold)}
                                </span>
                                <span className="text-xs font-semibold text-center max-w-[80px]" style={{ color: isCompleted ? '#4b5563' : isCurrent ? '#1a3a6b' : '#9ca3af' }}>
                                    {stage.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Journey;
