const versionReloadKey = 'musicbox:version-reload';
const preloadReloadKey = 'musicbox:preload-reload';
const checkInterval = 60_000;

let checking = false;
let reloading = false;

function getStoredValue(key) {
    try {
        return window.sessionStorage.getItem(key);
    } catch {
        return null;
    }
}

function setStoredValue(key, value) {
    try {
        window.sessionStorage.setItem(key, value);
        return true;
    } catch {
        return false;
    }
}

function removeStoredValue(key) {
    try {
        window.sessionStorage.removeItem(key);
    } catch {
        // The page can still be refreshed manually if session storage is unavailable.
    }
}

function showRefreshNotice() {
    if(document.getElementById('musicbox-refresh-notice')) {
        return;
    }

    const notice = document.createElement('div');
    notice.id = 'musicbox-refresh-notice';
    notice.setAttribute('role', 'alert');
    notice.style.cssText = 'position:fixed;inset:0 0 auto;z-index:2147483647;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 20px;background:#171717;color:#fff;font:16px/1.4 system-ui,sans-serif;box-shadow:0 2px 12px #0008';

    const message = document.createElement('span');
    message.textContent = 'A new version of MusicBox is ready. Refresh to continue.';

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Refresh';
    button.style.cssText = 'flex:none;padding:8px 16px;border:0;border-radius:4px;background:#fff;color:#171717;font:inherit;font-weight:700;cursor:pointer';
    button.addEventListener('click', () => window.location.reload());

    notice.append(message, button);
    document.body.append(notice);
}

function reloadForVersion(version) {
    if(getStoredValue(versionReloadKey) === version || !setStoredValue(versionReloadKey, version)) {
        showRefreshNotice();
        return;
    }

    reloading = true;
    window.location.reload();
}

async function checkForUpdate() {
    if(checking || reloading) {
        return;
    }

    checking = true;

    try {
        const response = await fetch('/version.json', { cache: 'no-store' });

        if(!response.ok) {
            return;
        }

        const { version } = await response.json();

        if(!version) {
            return;
        }

        if(version !== __APP_VERSION__) {
            reloadForVersion(version);
        } else {
            removeStoredValue(versionReloadKey);
        }
    } catch {
        // A temporary network failure should not interrupt the current page.
    } finally {
        checking = false;
    }
}

function recoverFromPreloadError(event) {
    event.preventDefault();

    if(reloading) {
        return;
    }

    if(getStoredValue(preloadReloadKey) === __APP_VERSION__ || !setStoredValue(preloadReloadKey, __APP_VERSION__)) {
        showRefreshNotice();
        return;
    }

    reloading = true;
    window.location.reload();
}

if(typeof window !== 'undefined') {
    window.addEventListener('vite:preloadError', recoverFromPreloadError);
}

export function startVersionCheck() {
    if(typeof window === 'undefined') {
        return;
    }

    void checkForUpdate();
    window.setInterval(checkForUpdate, checkInterval);
    window.addEventListener('focus', checkForUpdate);
    document.addEventListener('visibilitychange', () => {
        if(document.visibilityState === 'visible') {
            void checkForUpdate();
        }
    });
}
