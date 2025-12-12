// blocked.js - External script for blocked.html (CSP compliant)

// Load stats
chrome.storage.local.get(['stats'], (data) => {
    const stats = data.stats || {};
    document.getElementById('blockedCount').textContent = stats.threatsBlocked || 0;

    const disciplineScore = Math.round(stats.disciplineScore || 100);
    document.getElementById('disciplineScore').textContent = `${disciplineScore}%`;
});

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
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.close();
    }
}

// Add event listener for the button (CSP compliant - no inline onclick)
document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', goBack);
    }
});
