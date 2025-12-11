// UPSC Control Room - Background Service Worker
// Handles distraction blocking, streak tracking, and notifications

// Default blocked sites (distracting websites)
const DEFAULT_BLOCKED_SITES = [
    'facebook.com',
    'instagram.com',
    'twitter.com',
    'x.com',
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

    if (!data.blockedSites) {
        await chrome.storage.local.set({ blockedSites: DEFAULT_BLOCKED_SITES });
    }

    if (!data.stats) {
        await chrome.storage.local.set({
            stats: {
                threatsBlocked: 0,
                focusBreaches: 0,
                disciplineScore: 100,
                currentStreak: 0,
                lastActiveDate: null,
                totalXP: 0
            }
        });
    }

    if (!data.missions) {
        await chrome.storage.local.set({ missions: [] });
    }

    if (!data.notes) {
        await chrome.storage.local.set({ notes: '' });
    }

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

// Track tab switches as potential focus breaches
let lastActiveTabId = null;
let tabSwitchCount = 0;
let lastTabSwitchTime = Date.now();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const now = Date.now();

    if (lastActiveTabId !== null && lastActiveTabId !== activeInfo.tabId) {
        // Tab switch detected
        if (now - lastTabSwitchTime < 5000) {
            // Rapid tab switching (within 5 seconds)
            tabSwitchCount++;

            if (tabSwitchCount >= 3) {
                // Too many rapid switches - focus breach
                const data = await chrome.storage.local.get(['stats']);
                const stats = data.stats || {};
                stats.focusBreaches = (stats.focusBreaches || 0) + 1;
                stats.disciplineScore = Math.max(0, (stats.disciplineScore || 100) - 5);
                await chrome.storage.local.set({ stats });
                tabSwitchCount = 0;
            }
        } else {
            tabSwitchCount = 1;
        }
    }

    lastActiveTabId = activeInfo.tabId;
    lastTabSwitchTime = now;
});

// Message listener for popup/dashboard communication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getStats') {
        chrome.storage.local.get(['stats'], (data) => {
            sendResponse(data.stats || {});
        });
        return true;
    }

    if (request.action === 'toggleBlocking') {
        chrome.storage.local.get(['isBlocking'], async (data) => {
            const newState = !data.isBlocking;
            await chrome.storage.local.set({ isBlocking: newState });
            sendResponse({ isBlocking: newState });
        });
        return true;
    }

    if (request.action === 'updateMissions') {
        chrome.storage.local.set({ missions: request.missions }, () => {
            sendResponse({ success: true });
        });
        return true;
    }

    if (request.action === 'saveNotes') {
        chrome.storage.local.set({ notes: request.notes }, () => {
            sendResponse({ success: true });
        });
        return true;
    }
});

console.log('UPSC Control Room background service worker started!');
