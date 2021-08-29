import { GOOGLE_CLIENT_ID } from "../constants";

export function initGoogleSDK(){
    return new Promise(resolve => {
        window.initGoogleApi = function(){
            window.gapi.load('auth2', function() {
                window.auth2 = window.gapi.auth2.init({
                    client_id: GOOGLE_CLIENT_ID,
                    scope: 'https://www.googleapis.com/auth/business.manage'
                });
                resolve();
            });
        };

        (function(){
            const ajaxScript = document.createElement('script');
            ajaxScript.src = '//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
            ajaxScript.id = 'google-ajax';
            const googleApiScript = document.createElement('script');
            googleApiScript.src = 'https://apis.google.com/js/client:platform.js?onload=initGoogleApi';
            googleApiScript.id = 'google-jssdk';
            const firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(ajaxScript, firstScript);
            firstScript.parentNode.insertBefore(googleApiScript, firstScript);
        })();
    });
}

export function authorizeGoogle(){
    return new Promise((resolve, reject) => {
        window.auth2.grantOfflineAccess()
        .then(authResult => {
            resolve(authResult)
        })
        .catch(err => reject(err));
    })
};
