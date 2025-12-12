import React, { useState, useEffect } from 'react';

const QuickNotes = ({ notes: initialNotes = '', onSave, onClear }) => {
    const [notes, setNotes] = useState(initialNotes);

    // Sync with prop changes
    useEffect(() => {
        setNotes(initialNotes);
    }, [initialNotes]);

    const handleSave = () => {
        if (onSave) onSave(notes);
    };

    const handleClear = () => {
        setNotes('');
        if (onSave) onSave('');
        if (onClear) onClear();
    };

    return (
        <div className="rounded-2xl p-5 shadow-lg border min-h-[140px] flex flex-col" style={{ background: 'linear-gradient(135deg, #fffde7, #fff9c4)', borderColor: '#fff59d' }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-gray-700">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    <h3 className="text-base font-bold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>Quick Notes</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleClear}
                        className="w-7 h-7 bg-transparent border-none rounded text-gray-500 flex items-center justify-center cursor-pointer hover:text-red-500 transition-all"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                    </button>
                    <button
                        onClick={handleSave}
                        className="w-7 h-7 bg-transparent border-none rounded text-gray-500 flex items-center justify-center cursor-pointer hover:text-blue-600 transition-all"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                            <polyline points="17 21 17 13 7 13 7 21" />
                            <polyline points="7 3 7 8 15 8" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Textarea */}
            <div className="flex-1">
                <textarea
                    className="w-full min-h-[80px] border-none bg-transparent text-sm text-gray-700 resize-none outline-none leading-relaxed placeholder:text-gray-500 placeholder:italic"
                    placeholder="Jot down quick thoughts, article numbers, or mnemonics..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
        </div>
    );
};

export default QuickNotes;
