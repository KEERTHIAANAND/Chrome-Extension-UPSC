// UPSC Control Room - Background Service Worker
// Handles distraction blocking, streak tracking, and notifications

// Default blocked sites (distracting websites)
const DEFAULT_BLOCKED_SITES = [
    'facebook.com',
    'instagram.com',
    'twitter.com',
    'reddit.com',
    'netflix.com',
    'hotstar.com',
    'primevideo.com',
    'twitch.tv',
    'tiktok.com',
    'snapchat.com',
    'pinterest.com',
    'tumblr.com'
];

// Initialize extension data on install
chrome.runtime.onInstalled.addListener(async () => {
    const data = await chrome.storage.local.get(null);

    // Always update blocked sites to include latest defaults
    await chrome.storage.local.set({ blockedSites: DEFAULT_BLOCKED_SITES });

    // FORCE RESET: Clear points and stats for new implementation
    // This runs on every extension reload/update to ensure a fresh start
    await chrome.storage.local.set({
        stats: {
            threatsBlocked: 0,
            totalFocusMinutes: 0,
            disciplineScore: 100,
            currentStreak: 0,
            lastActiveDate: null,
            totalXP: 0
        },
        focusMinutesBuffer: 0
    });

    // Reset User XP
    if (data.user) {
        const resetUser = { ...data.user, currentXP: 0 };
        await chrome.storage.local.set({ user: resetUser });
    } else {
        await chrome.storage.local.set({
            user: {
                name: 'UPSC Aspirant',
                batch: 'CSE 2025',
                avatar: null,
                currentXP: 0,
                targetXP: 5000,
                nextRank: 'Sub-Divisional Magistrate',
                rank: {
                    title: 'Aspirant',
                    abbreviation: 'ASP'
                }
            }
        });
    }

    // Initialize missions
    if (!data.missions) {
        await chrome.storage.local.set({ missions: [] });
    }

    // Initialize bookmarks
    if (!data.bookmarks) {
        await chrome.storage.local.set({ bookmarks: [] });
    }

    // Initialize notes
    if (!data.notes) {
        await chrome.storage.local.set({ notes: '' });
    }

    // Initialize exam date (UPSC Prelims 2025 - May 25, 2025)
    if (!data.examDate) {
        await chrome.storage.local.set({ examDate: '2025-05-25' });
    }

    // Initialize blocking state
    if (!data.isBlocking) {
        await chrome.storage.local.set({ isBlocking: true });
    }

    // Create context menu for quick bookmarking
    chrome.contextMenus.create({
        id: 'bookmarkPage',
        title: '⭐ Bookmark this page to UPSC Control Room',
        contexts: ['page', 'action']
    });

    console.log('UPSC Control Room initialized!');
});

// Check and update streak daily
chrome.alarms.create('checkStreak', { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'checkStreak') {
        await updateStreak();
    }
});

async function updateStreak() {
    const data = await chrome.storage.local.get(['stats']);
    const stats = data.stats || {};
    const today = new Date().toDateString();
    const lastActive = stats.lastActiveDate;

    if (lastActive !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastActive === yesterday.toDateString()) {
            // Continue streak
            stats.currentStreak = (stats.currentStreak || 0) + 1;
        } else if (lastActive !== today) {
            // Streak broken
            stats.currentStreak = 1;
        }

        stats.lastActiveDate = today;
        await chrome.storage.local.set({ stats });
    }
}

// Context menu click handler - Bookmark current page
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'bookmarkPage') {
        try {
            const data = await chrome.storage.local.get(['bookmarks']);
            const bookmarks = data.bookmarks || [];

            // Get site name from title or URL
            const url = new URL(tab.url);
            const siteName = tab.title ? tab.title.substring(0, 20) : url.hostname.replace('www.', '');

            // Get favicon URL
            const faviconUrl = tab.favIconUrl || null;

            // Create bookmark
            const newBookmark = {
                id: Date.now(),
                name: siteName,
                url: tab.url,
                icon: faviconUrl || '💡', // Use bulb emoji as default
                favicon: faviconUrl
            };

            // Check if already bookmarked
            const alreadyExists = bookmarks.some(b => b.url === tab.url);
            if (alreadyExists) {
                // Show notification
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icons/icon128.png',
                    title: 'Already Bookmarked',
                    message: 'This page is already in your bookmarks!'
                });
                return;
            }

            // Add to bookmarks
            bookmarks.push(newBookmark);
            await chrome.storage.local.set({ bookmarks });

            // Show success notification
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon128.png',
                title: 'Page Bookmarked! ⭐',
                message: `"${siteName}" added to your UPSC Control Room bookmarks.`
            });

            console.log('Bookmarked:', newBookmark);
        } catch (error) {
            console.error('Error bookmarking page:', error);
        }
    }
});

// Keyboard shortcut handler (Ctrl+Shift+S)
chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'bookmark-page') {
        // Get current active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.url) {
            await bookmarkCurrentPage(tab);
        }
    }
});

// Shared bookmark function
async function bookmarkCurrentPage(tab) {
    try {
        const data = await chrome.storage.local.get(['bookmarks']);
        const bookmarks = data.bookmarks || [];

        // Get site name from title or URL
        const url = new URL(tab.url);
        const siteName = tab.title ? tab.title.substring(0, 20) : url.hostname.replace('www.', '');

        // Get favicon URL
        const faviconUrl = tab.favIconUrl || null;

        // Create bookmark
        const newBookmark = {
            id: Date.now(),
            name: siteName,
            url: tab.url,
            icon: faviconUrl || '💡',
            favicon: faviconUrl
        };

        // Check if already bookmarked
        const alreadyExists = bookmarks.some(b => b.url === tab.url);
        if (alreadyExists) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon128.png',
                title: 'Already Bookmarked',
                message: 'This page is already in your bookmarks!'
            });
            return;
        }

        // Add to bookmarks
        bookmarks.push(newBookmark);
        await chrome.storage.local.set({ bookmarks });

        // Show success notification
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon128.png',
            title: 'Page Bookmarked! ⭐',
            message: `"${siteName}" added to your UPSC Control Room bookmarks.`
        });

        console.log('Bookmarked via shortcut:', newBookmark);
    } catch (error) {
        console.error('Error bookmarking page:', error);
    }
}

// Listen for tab updates to block distracting sites
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        await checkAndBlockSite(tabId, changeInfo.url);
    }
});

async function checkAndBlockSite(tabId, url) {
    const data = await chrome.storage.local.get(['blockedSites', 'isBlocking', 'stats']);

    if (!data.isBlocking) return;

    const blockedSites = data.blockedSites || DEFAULT_BLOCKED_SITES;
    const stats = data.stats || {};

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.replace('www.', '');

        const isBlocked = blockedSites.some(site =>
            hostname.includes(site) || hostname === site
        );

        if (isBlocked) {
            // Increment threats blocked
            stats.threatsBlocked = (stats.threatsBlocked || 0) + 1;
            stats.totalXP = Math.max(0, (stats.totalXP || 0) - 5); // -5 XP penalty (floor at 0)

            // Discipline Penalty: -1%
            stats.disciplineScore = Math.max(0, (stats.disciplineScore || 100) - 1);

            await chrome.storage.local.set({ stats });

            // Redirect to blocked page
            chrome.tabs.update(tabId, {
                url: chrome.runtime.getURL('blocked.html')
            });

            // Show notification
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon128.png',
                title: '⚠️ Distraction Penalty',
                message: `${hostname} blocked (-5 XP, -1% Discipline). Stay disciplined!`,
                priority: 2
            });
        }
    } catch (e) {
        // Invalid URL, ignore
    }
}

// Track total focus time
let lastFocusUpdate = Date.now();

// Update focus time every minute
chrome.alarms.create('updateFocusTime', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'updateFocusTime') {
        await updateFocusTime();
    }
});

async function updateFocusTime() {
    const data = await chrome.storage.local.get(['stats', 'isBlocking', 'focusMinutesBuffer']);

    // Only count focus time when blocking is active
    if (data.isBlocking) {
        const stats = data.stats || {};
        let buffer = data.focusMinutesBuffer || 0;

        // Increment buffer
        buffer += 1;
        stats.totalFocusMinutes = (stats.totalFocusMinutes || 0) + 1;

        // Check if 1 hour (60 minutes) reached
        if (buffer >= 60) {
            stats.totalXP = (stats.totalXP || 0) + 50; // +50 XP per hour

            // Discipline Reward: +0.5%
            // Use parseFloat to handle potential string storage issues and ensure math correct
            const currentScore = parseFloat(stats.disciplineScore || 0);
            stats.disciplineScore = Math.min(100, currentScore + 0.5);

            buffer = 0; // Reset buffer

            // Notification for hourly streak
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon128.png',
                title: '🔥 Hourly Focus Bonus!',
                message: '1 Hour of focus complete. +50 XP & +0.5% Discipline awarded!',
                priority: 1
            });
        }

        await chrome.storage.local.set({ stats, focusMinutesBuffer: buffer });
    }

    lastFocusUpdate = Date.now();
}

// Message listener for popup/dashboard communication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    // Get all data
    if (request.action === 'getAllData') {
        chrome.storage.local.get(null, (data) => {
            sendResponse(data);
        });
        return true;
    }

    // Get stats
    if (request.action === 'getStats') {
        chrome.storage.local.get(['stats'], (data) => {
            sendResponse(data.stats || {});
        });
        return true;
    }

    // Toggle blocking
    if (request.action === 'toggleBlocking') {
        chrome.storage.local.get(['isBlocking'], async (data) => {
            const newState = !data.isBlocking;
            await chrome.storage.local.set({ isBlocking: newState });
            sendResponse({ isBlocking: newState });
        });
        return true;
    }

    // Save user profile
    if (request.action === 'saveUser') {
        chrome.storage.local.set({ user: request.user }, () => {
            // Update XP in stats too
            if (request.user.currentXP !== undefined) {
                chrome.storage.local.get(['stats'], (data) => {
                    const stats = data.stats || {};
                    stats.totalXP = request.user.currentXP;
                    chrome.storage.local.set({ stats });
                });
            }
            sendResponse({ success: true });
        });
        return true;
    }

    // Save missions
    if (request.action === 'saveMissions') {
        chrome.storage.local.set({ missions: request.missions }, () => {
            sendResponse({ success: true });
        });
        return true;
    }

    // Save bookmarks
    if (request.action === 'saveBookmarks') {
        chrome.storage.local.set({ bookmarks: request.bookmarks }, () => {
            sendResponse({ success: true });
        });
        return true;
    }

    // Save notes
    if (request.action === 'saveNotes') {
        chrome.storage.local.set({ notes: request.notes }, () => {
            sendResponse({ success: true });
        });
        return true;
    }

    // Save exam date
    if (request.action === 'saveExamDate') {
        chrome.storage.local.set({ examDate: request.examDate }, () => {
            sendResponse({ success: true });
        });
        return true;
    }

    // Add/Update blocked sites
    if (request.action === 'saveBlockedSites') {
        chrome.storage.local.set({ blockedSites: request.sites }, () => {
            sendResponse({ success: true });
        });
        return true;
    }
});

console.log('UPSC Control Room background service worker started!');
