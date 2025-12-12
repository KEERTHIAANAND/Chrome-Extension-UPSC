import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const ShareModal = ({ isOpen, onClose, user, stats, streak, quote }) => {
    const cardRef = useRef(null);
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen) return null;

    const handleCopyCaption = () => {
        const caption = `🏛️ ROAD TO LBSNAA - Official Daily Report

👑 Rank: ${user.rank?.title || 'Aspirant'} (${user.rank?.abbreviation || 'ASP'})
🔥 Streak: ${streak} Days | ⭐ XP: ${stats.totalXP || user.currentXP || 0} | 🛡️ Discipline: ${Math.round(stats.disciplineScore || 100)}%

"${quote?.text || 'Consistency is the signature of excellence.'}"

#UPSC #UPSC2026 #IAS #LBSNAA`;

        navigator.clipboard.writeText(caption);
        alert('Caption copied!');
    };

    const handleSaveImage = async () => {
        if (!cardRef.current || isSaving) return;

        setIsSaving(true);
        try {
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: '#ffffff',
                scale: 2,
                useCORS: true,
                logging: false,
                allowTaint: true
            });

            // Convert to data URL
            const dataUrl = canvas.toDataURL('image/png');

            // Create download link
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `UPSC-Impact-${new Date().toISOString().split('T')[0]}.png`;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsSaving(false);
        } catch (error) {
            console.error('Error saving image:', error);
            setIsSaving(false);
            alert('Failed to save image. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15, 36, 68, 0.92)' }}>
            <div className="relative w-full max-w-xs">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 flex items-center gap-2 text-white/80 text-xs font-medium tracking-wide hover:text-white transition-colors"
                >
                    CLOSE
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </span>
                </button>

                {/* Compact Card */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                    <div ref={cardRef} style={{ padding: '20px', backgroundColor: '#ffffff' }}>
                        {/* Badge */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                borderRadius: '9999px',
                                backgroundColor: '#1a3a6b',
                                color: '#ffffff',
                                fontSize: '9px',
                                fontWeight: '700',
                                letterSpacing: '1.5px'
                            }}>
                                👑 OFFICIAL DAILY REPORT
                            </span>
                        </div>

                        {/* Title */}
                        <h1 style={{ textAlign: 'center', fontSize: '20px', fontWeight: '800', marginBottom: '2px', fontFamily: 'Outfit, sans-serif' }}>
                            <span style={{ color: '#1a3a6b' }}>ROAD TO </span>
                            <span style={{ color: '#ff6b00' }}>LBSNAA</span>
                        </h1>
                        <p style={{ textAlign: 'center', fontSize: '8px', fontWeight: '600', letterSpacing: '2px', color: '#9ca3af', marginBottom: '16px' }}>
                            CIVIL SERVICES EXAMINATION 2026
                        </p>

                        {/* Rank Section */}
                        <div style={{ borderRadius: '16px', padding: '24px', textAlign: 'center', backgroundColor: '#f7f8fa' }}>
                            {/* Crown Icon Circle */}
                            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
                                <div style={{
                                    width: '96px',
                                    height: '96px',
                                    borderRadius: '50%',
                                    backgroundColor: '#ffffff',
                                    border: '4px solid #e8eaed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1a3a6b" strokeWidth="1.2">
                                        <path d="M2 20h20" />
                                        <path d="M4 20V10l4 4 4-8 4 8 4-4v10" />
                                    </svg>
                                </div>
                                {/* Green Badge */}
                                <div style={{
                                    position: 'absolute',
                                    right: '0',
                                    top: '8px',
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: '#10b981',
                                    border: '2px solid #ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Rank Label */}
                            <p style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', color: '#ff6b00', marginBottom: '8px' }}>
                                CURRENT RANK
                            </p>

                            {/* Rank Title */}
                            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a3a6b', fontFamily: 'Outfit, sans-serif', marginBottom: '24px', lineHeight: '1.2' }}>
                                {user.rank?.title || 'Aspirant'} ({user.rank?.abbreviation || 'ASP'})
                            </h3>

                            {/* Stats Row */}
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '24px' }}>
                                {/* Streak */}
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ fontSize: '18px' }}>🔥</span>
                                    <p style={{ fontSize: '20px', fontWeight: '700', color: '#1a3a6b', fontFamily: 'Outfit, sans-serif', marginTop: '4px' }}>{streak}</p>
                                    <p style={{ fontSize: '8px', fontWeight: '600', letterSpacing: '1px', color: '#9ca3af', marginTop: '2px' }}>STREAK</p>
                                </div>

                                {/* Divider */}
                                <div style={{ width: '1px', height: '56px', backgroundColor: '#e5e7eb', alignSelf: 'center' }}></div>

                                {/* XP */}
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ fontSize: '18px' }}>⭐</span>
                                    <p style={{ fontSize: '20px', fontWeight: '700', color: '#1a3a6b', fontFamily: 'Outfit, sans-serif', marginTop: '4px' }}>{stats.totalXP || user.currentXP || 0}</p>
                                    <p style={{ fontSize: '8px', fontWeight: '600', letterSpacing: '1px', color: '#9ca3af', marginTop: '2px' }}>XP</p>
                                </div>

                                {/* Divider */}
                                <div style={{ width: '1px', height: '56px', backgroundColor: '#e5e7eb', alignSelf: 'center' }}></div>

                                {/* Discipline Score */}
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ fontSize: '18px' }}>🛡️</span>
                                    <p style={{ fontSize: '20px', fontWeight: '700', color: '#1a3a6b', fontFamily: 'Outfit, sans-serif', marginTop: '4px' }}>{Math.round(stats.disciplineScore || 100)}%</p>
                                    <p style={{ fontSize: '8px', fontWeight: '600', letterSpacing: '1px', color: '#9ca3af', marginTop: '2px' }}>DISCIPLINE</p>
                                </div>
                            </div>
                        </div>

                        {/* Quote */}
                        <p style={{ textAlign: 'center', fontSize: '14px', fontStyle: 'italic', color: '#6b7280', marginTop: '20px', marginBottom: '12px', padding: '0 8px', lineHeight: '1.5', fontFamily: 'Georgia, serif' }}>
                            "{quote?.text?.length > 70 ? quote.text.substring(0, 70) + '...' : (quote?.text || 'Consistency is the signature of excellence.')}"
                        </p>

                        {/* Footer */}
                        <p style={{ textAlign: 'center', fontSize: '8px', fontWeight: '600', letterSpacing: '2px', color: '#d1d5db' }}>
                            GENERATED BY UPSC CONTROL ROOM
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 p-3 pt-0">
                        <button
                            onClick={handleCopyCaption}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" />
                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                            Copy
                        </button>
                        <button
                            onClick={handleSaveImage}
                            disabled={isSaving}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold text-white disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}
                        >
                            {isSaving ? (
                                <span>Saving...</span>
                            ) : (
                                <>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                    Save
                                </>
                            )}
                        </button>
                    </div>
                    <p className="text-center text-[0.55rem] text-gray-400 pb-3">Share on Instagram & WhatsApp</p>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
