export const BASE_PATH = '/sandy'; // Set to '/sandy' for now; change to '/draper' or '' for other cities
export const SITE_DOMAIN = 'supportlocalslc.com'; // Updated to your custom domain
export const getBusinessUrl = (id) => `${BASE_PATH}/business.html?id=${id}`;
export const getDashboardUrl = () => `${BASE_PATH}/dashboard.html`;
export const getLoginUrl = () => `${BASE_PATH}/login.html`;
export const getHomeUrl = () => `${BASE_PATH}/index.html`;