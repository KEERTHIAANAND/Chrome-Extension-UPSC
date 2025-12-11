import React from 'react';

const Sidebar = ({ user }) => {
    const xpPercentage = (user.currentXP / user.targetXP) * 100;

    return (
        <aside className="w-60 min-h-screen bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 flex flex-col p-4">
            {/* Header Toggle */}
            <div className="flex items-center mb-2">
                <button className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 transition-all">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
            </div>

            {/* National Emblem & Branding */}
            <div className="flex flex-col items-center py-2 pb-5 border-b border-gray-200 mb-4">
                <div className="w-24 h-24 flex items-center justify-center mb-3">
                    <img src="/ashoka-emblem.png" alt="National Emblem" className="w-full h-full object-contain drop-shadow-md" />
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-extrabold tracking-[4px]" style={{ fontFamily: 'Outfit, sans-serif', color: '#1a3a6b' }}>UPSC</h1>
                    <span className="block text-[0.65rem] font-bold tracking-[4px] mt-1" style={{ fontFamily: 'Outfit, sans-serif', color: '#ff6b00' }}>CONTROL ROOM</span>
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-5 text-center shadow-lg mb-4">
                <div className="relative inline-block mb-3">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200">
                        <img src={user.avatar || '/default-avatar.svg'} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-[3px] border-white rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'Outfit, sans-serif', color: '#1a3a6b' }}>{user.name}</h3>
                <p className="text-xs text-gray-500">{user.batch}</p>
            </div>

            {/* Rank Card */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-4 text-center">
                <div className="mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold tracking-widest uppercase" style={{ color: '#ff6b00' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                        </svg>
                        CURRENT RANK
                    </span>
                </div>
                <h2 className="text-sm font-bold leading-tight" style={{ fontFamily: 'Outfit, sans-serif', color: '#1a3a6b' }}>{user.rank.title}</h2>
                <span className="text-xs text-gray-500 font-medium">({user.rank.abbreviation})</span>
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
                    Earn <strong style={{ color: '#ff6b00' }}>+{(user.targetXP - user.currentXP).toLocaleString()} XP</strong> to unlock<br />
                    <span className="font-semibold underline cursor-pointer" style={{ color: '#1a3a6b' }}>{user.nextRank}</span> badge.
                </p>
            </div>

            {/* Share Button */}
            <button
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 text-white text-xs font-bold tracking-widest rounded-lg cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg mt-auto"
                style={{ fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(135deg, #1a3a6b, #0f2444)' }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                </svg>
                SHARE YOUR IMPACT
            </button>
        </aside>
    );
};

export default Sidebar;
