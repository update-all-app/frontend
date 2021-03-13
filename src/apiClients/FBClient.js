

export function initFBSDK(){
  return new Promise(resolve => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '205727007974727',
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

export function fbLogin(){
  return new Promise((resolve, err) => {
    window.FB.login(function(response){
      if(response.authResponse){
        console.log("Success!")
        console.log(response)
        resolve(response.authResponse)
      }else{
        console.log("Login failed")
        err({msg: "Login failed"})
      }
    }, {scope: 'pages_manage_metadata'})
  })
}