

export function initFBSDK(){
  return new Promise(resolve => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '703424633669376',
        cookie     : true,
        xfbml      : true,
        version    : 'v9.0'
      });
        
      window.FB.AppEvents.logPageView(); 
      
      window.FB.getLoginStatus(function(response) {
        console.log(response)
        resolve()
        // statusChangeCallback(response);
      });
        
    };
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  })
}