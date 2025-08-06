// /public/shared/config.js

/**
 * Determines the current city's base path (e.g., '/sandy', '/draper') from the URL.
 * If on the main hub page or other root-level pages, it returns an empty string.
 * @returns {string} The base path of the current city or an empty string.
 */
function getCityBasePath() {
    const pathParts = window.location.pathname.split('/').filter(part => part); // e.g., ['sandy', 'index.html']
    // Add all your city names to this array as you create them.
    const knownCities = ['sandy', 'draper', 'taylorsville'];

    if (pathParts.length > 0 && knownCities.includes(pathParts[0])) {
        return `/${pathParts[0]}`; // Returns '/sandy'
    }
    return ''; // On root pages like /index.html, returns ''
}

/**
 * Generates the correct URL for a specific business detail page.
 * Example: getBusinessUrl('sandy', '123') -> '/sandy/business.html?id=123'
 * @param {string} city - The city territory (e.g., 'sandy').
 * @param {string} id - The business ID.
 * @returns {string} The full URL path for the business page.
 */
export function getBusinessUrl(city, id) {
    // This function was already good, no changes needed here.
    return `/${city}/business.html?id=${id}`;
}

/**
 * Generates the URL for the GLOBAL user dashboard.
 * This will always point to the root dashboard page.
 * @returns {string} The URL path for the dashboard page.
 */
export function getDashboardUrl() {
    // This is a global page, so it should always be at the root.
    return '/dashboard.html';
}

/**
 * Generates the URL for the GLOBAL login page.
 * This will always point to the root login page.
 * @returns {string} The URL path for the login page.
 */
export function getLoginUrl() {
    // This is a global page, so it should always be at the root.
    return '/login.html';
}

/**
 * Generates the correct "Home" URL based on the current page.
 * - If on a city page (e.g., /sandy/index.html), it returns '/' to go to the main hub.
 * - If on the main hub or a business page, it returns the path to the relevant city's index.
 * @returns {string} The correct "Home" URL.
 */
export function getHomeUrl() {
    const path = window.location.pathname;
    const cityBase = getCityBasePath();

    // If we are on a city's main directory page (e.g., /sandy/ or /sandy/index.html)
    // the "Home" link should go to the global hub.
    if (path === `${cityBase}/` || path === `${cityBase}/index.html`) {
        return '/index.html'; // Go to the main site root
    }

    // For any other page within a city's context (like business.html),
    // "Home" should go back to that city's directory.
    if (cityBase) {
        return `${cityBase}/index.html`;
    }

    // Default for the global hub page itself.
    return '/index.html';
}
