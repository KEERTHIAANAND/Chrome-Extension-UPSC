import React, { useState } from 'react';

const Bookmarks = ({ bookmarks = [], onAddBookmark, onRemoveBookmark }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newBookmark, setNewBookmark] = useState({ name: '', url: '', icon: '📚' });

    const handleAdd = () => {
        if (newBookmark.name.trim() && newBookmark.url.trim()) {
            onAddBookmark(newBookmark);
            setNewBookmark({ name: '', url: '', icon: '📚' });
            setShowAddForm(false);
        }
    };

    const handleRemove = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onRemoveBookmark) {
            onRemoveBookmark(id);
        }
    };

    const icons = ['📚', '📖', '📝', '🎯', '💡', '🔗', '📰', '🏛️'];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-start mb-5">
                <div>
                    <h3 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>Bookmarks</h3>
                    <p className="text-sm text-gray-500 mt-1">Important Resources</p>
                    <p className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-mono">Ctrl+Shift+S</kbd>
                        <span className="text-gray-400">to bookmark any page</span>
                    </p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="w-8 h-8 border-none rounded text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-all"
                    style={{ background: '#1a3a6b' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <input
                        type="text"
                        placeholder="Name (e.g., PIB)"
                        className="w-full mb-2 px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-blue-400"
                        value={newBookmark.name}
                        onChange={(e) => setNewBookmark({ ...newBookmark, name: e.target.value })}
                    />
                    <input
                        type="url"
                        placeholder="URL (e.g., https://pib.gov.in)"
                        className="w-full mb-2 px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-blue-400"
                        value={newBookmark.url}
                        onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                    />
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500">Icon:</span>
                        {icons.map((icon) => (
                            <button
                                key={icon}
                                onClick={() => setNewBookmark({ ...newBookmark, icon })}
                                className={`w-8 h-8 rounded flex items-center justify-center text-lg cursor-pointer ${newBookmark.icon === icon ? 'bg-blue-100 border-2 border-blue-400' : 'bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleAdd}
                        className="w-full py-2 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700 transition-all"
                    >
                        Add Bookmark
                    </button>
                </div>
            )}

            {/* Grid or Empty State */}
            {bookmarks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-50">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                    </svg>
                    <p className="text-sm">No bookmarks yet</p>
                    <p className="text-xs mt-1">Click + to add resources</p>
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-4">
                    {bookmarks.map((bookmark) => (
                        <a
                            key={bookmark.id}
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative flex flex-col items-center gap-2 py-4 px-2 bg-white border border-gray-200 rounded-lg no-underline transition-all hover:border-blue-500 hover:shadow-lg hover:-translate-y-0.5 group"
                        >
                            {/* Delete button */}
                            <button
                                onClick={(e) => handleRemove(bookmark.id, e)}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600"
                            >
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                {bookmark.favicon && bookmark.favicon.startsWith('http') ? (
                                    <img
                                        src={bookmark.favicon}
                                        alt={bookmark.name}
                                        className="w-8 h-8 object-contain"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                                    />
                                ) : null}
                                <span
                                    className="text-2xl"
                                    style={{ display: bookmark.favicon && bookmark.favicon.startsWith('http') ? 'none' : 'block' }}
                                >
                                    {bookmark.icon || '💡'}
                                </span>
                            </div>
                            <span className="text-sm font-medium text-gray-600 text-center">{bookmark.name}</span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
