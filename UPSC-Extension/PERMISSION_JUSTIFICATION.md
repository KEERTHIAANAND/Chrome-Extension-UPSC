# Permission Justification for Chrome Web Store Review

## Extension: UPSC Control Room

---

## `<all_urls>` / Host Permissions Justification

### Why This Permission is Required

The **`<all_urls>`** permission is essential for the core functionality of UPSC Control Room:

#### 1. Distraction Blocking (Primary Use)
- **Purpose:** Block access to distracting websites (Facebook, Instagram, Netflix, Twitter, etc.)
- **How it works:** 
  - The extension monitors tab URL changes using `chrome.tabs.onUpdated`
  - When a URL matches a blocked site, we redirect to our `blocked.html` page
  - This requires the ability to detect URLs across all domains
  
#### 2. Focus Time Tracking
- **Purpose:** Accurately track when the user is actively studying
- **How it works:**
  - We track browser window focus state using `chrome.windows.onFocusChanged`
  - Focus time only counts when the browser is open AND focused
  - This is domain-agnostic and requires broad URL access

#### 3. Content Script Injection
- **Purpose:** Run at `document_start` to catch navigation early
- **How it works:**
  - Our `content.js` runs on all pages
  - It helps with early detection of blocked sites

### What We DO NOT Do
- ❌ We do NOT read page content or DOM elements
- ❌ We do NOT inject ads or modify page appearance  
- ❌ We do NOT collect or transmit browsing data
- ❌ We do NOT track user behavior for analytics
- ❌ We do NOT access cookies, passwords, or form data

### Alternative Approaches Considered

| Approach | Why Not Viable |
|----------|----------------|
| Specific domain list only | Users can't add custom blocked sites |
| `activeTab` permission | Only works on click, not automatic blocking |
| No host permissions | Cannot detect distracting site visits |

### Code Reference

```javascript
// background.js - Line 247-297
// This is the ONLY place we use the host permission
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        await checkAndBlockSite(tabId, changeInfo.url);
    }
});

async function checkAndBlockSite(tabId, url) {
    // We ONLY check if URL matches blocked sites
    // We do NOT read any page content
    const isBlocked = blockedSites.some(site => hostname.includes(site));
    if (isBlocked) {
        chrome.tabs.update(tabId, { url: chrome.runtime.getURL('blocked.html') });
    }
}
```

### Data Handling
- All data is stored using `chrome.storage.local`
- No external API calls or server communication
- No user tracking or analytics

---

## Other Permissions

### `storage`
- **Use:** Save user progress, settings, bookmarks, and notes
- **Data location:** Chrome's local storage only

### `tabs`
- **Use:** Monitor tab URLs for distraction blocking
- **Limited scope:** Only URL matching, no content access

### `alarms`
- **Use:** Schedule hourly focus time updates and streak checks
- **Frequency:** Every 60 minutes

### `notifications`
- **Use:** Alert users about:
  - Blocked site attempts
  - Focus milestones achieved
  - Bookmark confirmations

### `contextMenus`
- **Use:** Add "Bookmark to UPSC Control Room" right-click option
- **Scope:** Page context menu only

### `downloads`
- **Use:** Save shareable progress cards as PNG images
- **User-initiated:** Only when user clicks "Save" button

---

## Summary

UPSC Control Room is a **productivity tool** that helps UPSC aspirants stay focused. The `<all_urls>` permission is strictly used for:
1. Blocking distracting websites
2. Tracking focus time

We prioritize user privacy and store all data locally. No external communication occurs.
