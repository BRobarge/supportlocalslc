// --- SupportLocalSLC: Header Navigation ---
// Handles UI behaviors (dropdowns, mobile menu) and auth state synchronization.

function initializeHeader() {
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
        const hamb = e.target.closest('#mobile-menu-btn');
        if (hamb) {
            const mm = document.getElementById('mobile-menu');
            if (mm) mm.classList.toggle('hidden');
            return;
        }

        if (e.target.closest('.dropdown-menu')) return;

        const container = e.target.closest('.dropdown');
        if (!container) {
            closeAllExcept(null);
            return;
        }

        const menu = container.querySelector('.dropdown-menu');
        if (!menu) return;

        const labelLink = e.target.closest('a[href], button');
        if (labelLink) e.preventDefault();

        const wasOpen = !menu.classList.contains('hidden');
        closeAllExcept(menu);
        menu.classList.toggle('hidden', wasOpen);

        const toggle = container.querySelector('[data-toggle="dropdown"], .dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', (!wasOpen).toString());
    });
}

// REMOVED: updateAuthButton function from here. 
// All auth logic is now consolidated in auth-nav.js to prevent "Zombie" buttons and race conditions.

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHeader);
} else {
    initializeHeader();
}

