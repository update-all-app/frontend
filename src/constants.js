const BACKEND_URL = process.env.REACT_APP_API_URL;
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

export { 
    BACKEND_URL,
    API_SUFFIX,
    BACKEND_API_URL,
    FACEBOOK,
    INSTAGRAM,
    TWITTER,
    GOOGLE_MAPS,
    APPLE_MAPS,
    SUPPORTED_SERVICES
};
