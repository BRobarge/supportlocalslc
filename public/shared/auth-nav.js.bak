// --- SupportLocalSLC: Auth Nav (desktop + mobile) ---

const SUPABASE_URL = 'https://kozlfywdsqjndcsibgtw.supabase.co';
const SUPABASE_ANON =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvemxmeXdkc3FqbmRjc2liZ3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNTk0NzEsImV4cCI6MjA2NzgzNTQ3MX0.Xb0nRQIVhpW_7uBcwfIuvGZmyPMGzJq6k-6fdgfF3kw';

const client = window.supabaseClient || supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
window.supabaseClient = client; // let other scripts reuse it

function setAuthLinks(loggedIn) {
    const desktop = document.getElementById('auth-link');
    const mobile = document.getElementById('mobile-auth-link');
    if (desktop) {
        desktop.href = loggedIn ? '/dashboard.html' : '/login.html';
        desktop.textContent = loggedIn ? 'Dashboard' : 'Login';
    }
    if (mobile) {
        mobile.href = loggedIn ? '/dashboard.html' : '/login.html';
        mobile.textContent = loggedIn ? 'Dashboard' : 'Login';
    }
}

function ensureLogoutButtons(loggedIn) {
    const desktopAfter = document.getElementById('auth-link');
    const mobileAfter = document.getElementById('mobile-auth-link');

    // Desktop logout button
    let d = document.getElementById('logout-btn');
    if (loggedIn && desktopAfter && !d) {
        d = document.createElement('button');
        d.id = 'logout-btn';
        d.className = 'ml-3 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100';
        d.textContent = 'Logout';
        desktopAfter.parentNode.insertBefore(d, desktopAfter.nextSibling);
        d.addEventListener('click', onLogout);
    } else if (!loggedIn && d) {
        d.remove();
    }

    // Mobile logout button
    let m = document.getElementById('mobile-logout-btn');
    if (loggedIn && mobileAfter && !m) {
        m = document.createElement('button');
        m.id = 'mobile-logout-btn';
        m.className = 'block py-2 text-gray-700 font-semibold w-full text-right';
        m.textContent = 'Logout';
        mobileAfter.parentNode.insertBefore(m, mobileAfter.nextSibling);
        m.addEventListener('click', onLogout);
    } else if (!loggedIn && m) {
        m.remove();
    }
}

async function onLogout() {
    const btns = [
        document.getElementById('logout-btn'),
        document.getElementById('mobile-logout-btn')
    ].filter(Boolean);
    btns.forEach(b => { b.disabled = true; b.textContent = 'Logging out…'; });
    try {
        await client.auth.signOut();
    } finally {
        window.location.replace('/login.html');
    }
}

async function apply() {
    const { data: { session } } = await client.auth.getSession();
    const loggedIn = !!session?.user;
    setAuthLinks(loggedIn);
    ensureLogoutButtons(loggedIn);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
} else {
    apply();
}

client.auth.onAuthStateChange((_evt, session) => {
    const loggedIn = !!session?.user;
    setAuthLinks(loggedIn);
    ensureLogoutButtons(loggedIn);
    if (!loggedIn && window.location.pathname === '/dashboard.html') {
        window.location.replace('/login.html');
    }
});
