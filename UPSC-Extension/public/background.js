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

    // Initialize blocked sites
    if (!data.blockedSites) {
        await chrome.storage.local.set({ blockedSites: DEFAULT_BLOCKED_SITES });
    }

    // Initialize stats
    if (!data.stats) {
        await chrome.storage.local.set({
            stats: {
                threatsBlocked: 0,
                totalFocusMinutes: 0,
                disciplineScore: 100,
                currentStreak: 0,
                lastActiveDate: null,
                totalXP: 0
            }
        });
    }

    // Initialize user profile
    if (!data.user) {
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
            stats.totalXP = (stats.totalXP || 0) + 10; // +10 XP for blocking distraction
            await chrome.storage.local.set({ stats });

            // Redirect to blocked page
            chrome.tabs.update(tabId, {
                url: chrome.runtime.getURL('blocked.html')
            });

            // Show notification
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon128.png',
                title: '🛡️ Distraction Blocked!',
                message: `${hostname} was blocked. Stay focused on your UPSC preparation!`,
                priority: 2
            });
        }
    } catch (e) {
        // Invalid URL, ignore
    }
}

// Track total focus time
let focusStartTime = Date.now();
let lastFocusUpdate = Date.now();

// Update focus time every minute
chrome.alarms.create('updateFocusTime', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'updateFocusTime') {
        await updateFocusTime();
    }
});

async function updateFocusTime() {
    const data = await chrome.storage.local.get(['stats', 'isBlocking']);

    // Only count focus time when blocking is active
    if (data.isBlocking) {
        const stats = data.stats || {};
        stats.totalFocusMinutes = (stats.totalFocusMinutes || 0) + 1;
        stats.totalXP = (stats.totalXP || 0) + 2; // +2 XP per minute of focus
        await chrome.storage.local.set({ stats });
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
