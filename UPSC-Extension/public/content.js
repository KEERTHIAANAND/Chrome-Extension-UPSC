// UPSC Control Room - Content Script
// Runs on all pages to detect and handle blocked content

(function () {
    'use strict';

    // This content script can be extended to:
    // 1. Detect distracting content on allowed sites
    // 2. Track time spent on different websites
    // 3. Show motivational overlays
    // 4. Inject study reminders

    // Get current hostname
    const hostname = window.location.hostname.replace('www.', '');

    // Send page visit to background for tracking
    chrome.runtime.sendMessage({
        action: 'pageVisit',
        hostname: hostname,
        timestamp: Date.now()
    }).catch(() => {
        // Extension context invalidated, ignore
    });

})();
