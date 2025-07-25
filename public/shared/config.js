export const BASE_PATH = '/sandy';
export const SITE_DOMAIN = 'supportlocalslc.com';
// NEW, smart, scalable way
export function getBusinessUrl(city, id) {
    return `/${city}/business.html?id=${id}`;
}

export const getDashboardUrl = () => `${BASE_PATH}/dashboard.html`;
export const getLoginUrl = () => `${BASE_PATH}/login.html`;
export const getHomeUrl = () => `${BASE_PATH}/index.html`;