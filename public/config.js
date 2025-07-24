// config.js - Central place for paths and settings
export const BASE_PATH = ''; // Empty for root; set to '/sandy' for city-specific testing
export const SITE_DOMAIN = 'www.supportlocalslc.com'; // Change for white-label later
export const getBusinessUrl = (id) => `${BASE_PATH}/business.html?id=${id}`;
export const getDashboardUrl = () => `${BASE_PATH}/dashboard.html`;
// Add more as needed, e.g., for other cities or APIs