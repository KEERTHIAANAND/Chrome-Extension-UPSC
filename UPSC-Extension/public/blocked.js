// blocked.js - External script for blocked.html (CSP compliant)

// Load stats with error handling
try {
    if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['stats'], (data) => {
            const stats = data.stats || {};
            const blockedCountEl = document.getElementById('blockedCount');
            const disciplineScoreEl = document.getElementById('disciplineScore');

            if (blockedCountEl) {
                blockedCountEl.textContent = stats.threatsBlocked || 0;
            }
            if (disciplineScoreEl) {
                const disciplineScore = Math.round(stats.disciplineScore || 100);
                disciplineScoreEl.textContent = `${disciplineScore}%`;
            }
        });
    }
} catch (error) {
    console.error('Error loading stats:', error);
}

// Countdown timer
let seconds = 10;
const countdownEl = document.getElementById('countdown');

const interval = setInterval(() => {
    seconds--;
    countdownEl.textContent = seconds;

    if (seconds <= 0) {
        clearInterval(interval);
        goBack();
    }
}, 1000);

function goBack() {
    // Redirect to dashboard (new tab/extension page)
    try {
        // Check if runtime is available
        if (chrome.runtime && chrome.runtime.getURL) {
            window.location.href = chrome.runtime.getURL('index.html');
        } else {
            // Fallback to new tab
            window.location.href = 'chrome://newtab';
        }
    } catch (error) {
        console.error('Error redirecting:', error);
        // Fallback to new tab
        window.location.href = 'chrome://newtab';
    }
}

// Add event listener for the button (CSP compliant - no inline onclick)
document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', goBack);
    }
});
