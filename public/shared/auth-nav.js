// --- SupportLocalSLC: Auth Nav (desktop + mobile) ---
// This file handles auth state across all pages consistently

const SUPABASE_URL = 'https://kozlfywdsqjndcsibgtw.supabase.co';
const SUPABASE_ANON =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvemxmeXdkc3FqbmRjc2liZ3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNTk0NzEsImV4cCI6MjA2NzgzNTQ3MX0.Xb0nRQIVhpW_7uBcwfIuvGZmyPMGzJq6k-6fdgfF3kw';

// Initialize client - reuse existing or create new
let client = window.supabaseClient;
if (!client && typeof supabase !== 'undefined') {
    client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    window.supabaseClient = client;
}

// Helper to safely update element text and href
function updateAuthElement(elementId, loggedIn) {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    if (loggedIn) {
        el.href = '/dashboard.html';
        el.textContent = elementId.includes('mobile') ? 'Dashboard' : 'Dashboard';
        // Add logout functionality if not already added
        if (!el.dataset.authListener) {
            el.dataset.authListener = 'true';
            // For desktop, we want to show both Dashboard link AND Logout button
            if (elementId === 'auth-link') {
                ensureLogoutButton();
            }
            if (elementId === 'mobile-auth-link') {
                el.href = '/dashboard.html';
            }
        }
    } else {
        el.href = '/login.html';
        el.textContent = 'Login';
        // Remove logout button if present
        if (elementId === 'auth-link') {
            removeLogoutButton();
        }
    }
}

function ensureLogoutButton() {
    let logoutBtn = document.getElementById('logout-btn');
    const authLink = document.getElementById('auth-link');
    
    // Only add logout button if we're on desktop nav and button doesn't exist
    if (!logoutBtn && authLink) {
        logoutBtn = document.createElement('a');
        logoutBtn.id = 'logout-btn';
        logoutBtn.href = '#';
        logoutBtn.className = 'ml-3 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold';
        logoutBtn.textContent = 'Logout';
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (client) {
                await client.auth.signOut();
                window.location.href = '/';
            }
        });
        authLink.parentNode.insertBefore(logoutBtn, authLink.nextSibling);
    }
}

function removeLogoutButton() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.remove();
    }
}

function updateMobileLogoutButton(loggedIn) {
    const mobileLogoutLink = document.getElementById('mobile-logout-link');
    const mobileAuthLink = document.getElementById('mobile-auth-link');
    
    if (!mobileLogoutLink) return;
    
    if (loggedIn) {
        mobileLogoutLink.classList.remove('hidden');
        // Remove any existing listeners to avoid duplicates
        const newLink = mobileLogoutLink.cloneNode(true);
        mobileLogoutLink.parentNode.replaceChild(newLink, mobileLogoutLink);
        newLink.addEventListener('click', async (e) => {
            e.preventDefault();
            if (client) {
                await client.auth.signOut();
                window.location.href = '/';
            }
        });
    } else {
        mobileLogoutLink.classList.add('hidden');
    }
}

async function applyAuthState() {
    if (!client) {
        console.warn('Supabase client not available');
        return;
    }
    
    try {
        const { data: { session } } = await client.auth.getSession();
        const loggedIn = !!session?.user;
        
        updateAuthElement('auth-link', loggedIn);
        updateAuthElement('mobile-auth-link', loggedIn);
        updateMobileLogoutButton(loggedIn);
    } catch (err) {
        console.error('Error checking auth state:', err);
    }
}

// Initialize on DOM ready
function init() {
    applyAuthState();
    
    // Listen for auth state changes
    if (client) {
        client.auth.onAuthStateChange((_evt, session) => {
            const loggedIn = !!session?.user;
            updateAuthElement('auth-link', loggedIn);
            updateAuthElement('mobile-auth-link', loggedIn);
            updateMobileLogoutButton(loggedIn);
            
            // Redirect if logged out on dashboard
            if (!loggedIn && window.location.pathname === '/dashboard.html') {
                window.location.replace('/login.html');
            }
        });
    }
}

// Run initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
    init();
}
