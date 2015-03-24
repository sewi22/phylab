    
    function getLoginStatus(){
        
        var fb = FB.getLoginStatus(function(response) {
            /*
            if (response.status === 'connected') {
                
                var uid = response.authResponse.userID;                
                var accessToken = response.authResponse.accessToken;
                //console.log(accessToken);
                FB.api('/'+uid, function(response) {
                    console.log(response);
                });
                
                //var afterLoginPage = sessionStorage.afterLoginPage;
                //sessionStorage.removeItem("afterLoginPage");                
                //$(':mobile-pagecontainer').pagecontainer('change', afterLoginPage);

                return true;
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook,
                // but has not authenticated your app
                return false;
            } else {                
                //FB.login();
                //FB.api('/336885106510148', function(response) {
                    //console.log(response);
                //});
                return false;
            }*/
            return response.status;
        });
        
        console.log(fb);
        
        //return true;  
        //console.log(loginStatus);
        //return loginStatus;
        /*
        if(loggedin){
                                        
            
            
            return true;
        } else {
            
            
            
            return false;
        }
        */
    }
    
    
    
    function login(){
    
        //FB.login();   
          
        
    }
    
    
    
    function logout(){
        
        
        //FB.logout();    
        
            
    }
    
    
    
    