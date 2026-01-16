// /shared/header-nav.js

function initializeHeader() {
    // Prevent this from running more than once
    if (window.__sl_header_initialized) return;
    window.__sl_header_initialized = true;

    function closeAllExcept(menuToKeep) {
        document.querySelectorAll('.dropdown-menu').forEach(m => {
            if (m !== menuToKeep) m.classList.add('hidden');
        });
        document
            .querySelectorAll('[data-toggle="dropdown"], .dropdown-toggle')
            .forEach(t => t.setAttribute('aria-expanded', 'false'));
    }

    document.addEventListener('click', (e) => {
        // 1) Mobile hamburger
        const hamb = e.target.closest('#mobile-menu-btn');
        if (hamb) {
            const mm = document.getElementById('mobile-menu');
            if (mm) mm.classList.toggle('hidden');
            return;
        }

        // 2) Clicks inside an open dropdown menu should behave normally
        if (e.target.closest('.dropdown-menu')) return;

        // 3) Only handle clicks that happen INSIDE a .dropdown container
        const container = e.target.closest('.dropdown');
        if (!container) {
            // Clicked elsewhere → close everything
            closeAllExcept(null);
            return;
        }

        // Find this dropdown's menu
        const menu = container.querySelector('.dropdown-menu');
        if (!menu) return;

        // Prevent navigation on the label
        const labelLink = e.target.closest('a[href], button');
        if (labelLink) e.preventDefault();

        // Toggle this menu, close others
        const wasOpen = !menu.classList.contains('hidden');
        closeAllExcept(menu);
        menu.classList.toggle('hidden', wasOpen);

        // ARIA on a designated toggle if present
        const toggle = container.querySelector('[data-toggle="dropdown"], .dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', (!wasOpen).toString());
    });
}

// Immediately try to initialize, in case this script is loaded on a page without the include.js file.

// Check auth state and update header
async function updateAuthButton() {
    if (!window.supabaseClient) return;
    
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    
    const authLink = document.getElementById('auth-link');
    const mobileAuthLink = document.getElementById('mobile-auth-link');
    
    if (session) {
        // User is logged in
        if (authLink) {
            authLink.href = '/dashboard.html';
            authLink.textContent = 'Dashboard';
        }
        if (mobileAuthLink) {
            mobileAuthLink.href = '/dashboard.html';
            mobileAuthLink.textContent = 'Dashboard';
        }
    } else {
        // User is logged out
        if (authLink) {
            authLink.href = '/login.html';
            authLink.textContent = 'Login';
        }
        if (mobileAuthLink) {
            mobileAuthLink.href = '/login.html';
            mobileAuthLink.textContent = 'Login';
        }
    }
}

// Run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAuthButton);
} else {
    updateAuthButton();
}

initializeHeader();

// Force auth button update on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateAuthButton, 500);
});
