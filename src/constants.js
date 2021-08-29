const BACKEND_URL = process.env.REACT_APP_API_URL || "https://update-it-all.dakotaleemartinez.com";
const API_SUFFIX = "/api/v1";
const BACKEND_API_URL = `${BACKEND_URL}${API_SUFFIX}`;
const FACEBOOK = {name: 'Facebook', value: 'facebook'}
const INSTAGRAM = {name: 'Instagram', value: 'instagram'}
const TWITTER = {name: 'Twitter', value: 'twitter'}
const GOOGLE_MAPS = {name: 'Google Maps', value: 'google_maps'}
const APPLE_MAPS = {name: 'Apple Maps', value: 'apple_maps'}
const SUPPORTED_SERVICES = [
    FACEBOOK,
    INSTAGRAM,
    TWITTER,
    GOOGLE_MAPS,
    APPLE_MAPS
]
const FACEBOOK_CLIENT_ID = '2897145780604497'
const GOOGLE_CLIENT_ID = '83032555728-go02qbg8i5h64dv7u6f66rf3dn3g5ou5.apps.googleusercontent.com'

export { 
    BACKEND_URL,
    API_SUFFIX,
    BACKEND_API_URL,
    FACEBOOK,
    INSTAGRAM,
    TWITTER,
    GOOGLE_MAPS,
    APPLE_MAPS,
    SUPPORTED_SERVICES,
    FACEBOOK_CLIENT_ID,
    GOOGLE_CLIENT_ID,
};
