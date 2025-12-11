import React from 'react';

const defaultBookmarks = [
    { id: 1, name: 'PIB India', icon: '🏛️', url: 'https://pib.gov.in' },
    { id: 2, name: 'The Hindu', icon: '📰', url: 'https://thehindu.com' },
    { id: 3, name: 'Mrunal', icon: 'W', url: 'https://mrunal.org' },
    { id: 4, name: 'Vision IAS', icon: '🎯', url: 'https://visionias.in' },
];

const Bookmarks = ({ bookmarks = defaultBookmarks, onAddBookmark }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
                <div>
                    <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>Bookmarks</h3>
                    <p className="text-sm text-gray-500 mt-1">Important Resources</p>
                </div>
                <button
                    onClick={onAddBookmark}
                    className="w-8 h-8 border-none rounded text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-all"
                    style={{ background: '#1a3a6b' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 gap-4">
                {bookmarks.map((bookmark) => (
                    <a
                        key={bookmark.id}
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 py-4 px-2 bg-white border border-gray-200 rounded-lg no-underline transition-all hover:border-blue-500 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {bookmark.icon.length <= 2 ? (
                                <span className="text-2xl">{bookmark.icon}</span>
                            ) : (
                                <span className="text-xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#1a3a6b' }}>{bookmark.icon}</span>
                            )}
                        </div>
                        <span className="text-sm font-medium text-gray-600 text-center">{bookmark.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Bookmarks;
