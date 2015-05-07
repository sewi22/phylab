
    function casLogout(){
        if(checkConnection()){                    
        var url = "https://cas.thm.de/cas/logout";
        var iab = window.open(url,'_blank','location=no,hidden=yes,clearsessioncache=yes');
        iab.addEventListener('loadstart', function(event){            
            iab.close();
        });
        iab.addEventListener('loaderror', function(event){
            alert(event.type + ' - ' + event.message);
        });
        iab.addEventListener('exit', function(event){
            if (iab){iab = null;}            
        });

        localStorage.removeItem("username");
        localStorage.removeItem("displayname");
        localStorage.removeItem("mail");
        localStorage.removeItem("apiKey");
        $(':mobile-pagecontainer').pagecontainer('change', '#startPage');
        checkUserLogin();        
        return false;
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){$("#submit").button("enable");}, 'Verbindungsfehler', 'OK');
        }    
    }        
    
    function casLogin(callback){        
        if(checkConnection()){      
        var url = "https://cas.thm.de/cas/login"        
        var service = encodeURIComponent("PhyLab");

        var iab = window.open(url+"?service="+service, '_blank', 'location=no,hidden=no');

        iab.addEventListener('loadstart', function(evt){            
            var ticket = evt.url.split("ticket=", 2);            
            if(ticket[1]){
                casValidation(ticket[1], callback);
                iab.close();                
            }else if (evt.url.indexOf("closephylab.org") > -1){                
                iab.close();    
            }
        });
        iab.addEventListener('loadstop', function(evt){
            iab.executeScript({                
                code: 'document.getElementsByName("abort")[0].onclick = function(){location.href = "http://closephylab.org";}'
            }, function(){
            });
        });
        iab.addEventListener('loaderror', function(){
            alert(event.type + ' - ' + event.message);
        });
        iab.addEventListener('exit', function(){
            if (iab){iab = null;}
        });
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){$("#submit").button("enable");}, 'Verbindungsfehler', 'OK');    
        }
    }
        
    function casValidation(ticket, callback){
        if(checkConnection()){ 
        $.ajax({            
            url: apidomain+'/validateTicket/'+ticket,
            method: 'GET',
            success: function(result){                
                if(result.validate){                                        
                    localStorage.setItem("username", result.username);
                    localStorage.setItem("displayname", result.displayname);
                    localStorage.setItem("mail", result.mail);
                    localStorage.setItem("apiKey", result.apiKey);                   
                    callback(result);
                } else {                    
                    navigator.notification.alert("Der Login ist fehlgeschlagen.", function(){}, 'Login', 'OK');
                    casLogout();
                }
            },
            error: function(err){
                console.log(err);
            }
        });
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){$("#submit").button("enable");}, 'Verbindungsfehler', 'OK');
        }
    }
    
    function checkUserLogin(){    
        var footer = $('#'+$.mobile.activePage.attr('id')).find($("div[data-role='footer']")).attr("id");                
        if(localStorage.username && localStorage.apiKey){            
            $("#"+footer).html('Aktueller Nutzer: '+localStorage.username+'<a href="#" id="footerLogoutButton" data-role="button" class="ui-btn-right" data-theme="a">Logout</a>');            
        } else {                        
            $("#"+footer).html('Nicht eingeloggt.<a href="#" id="footerLoginButton" data-role="button" class="ui-btn-right" data-theme="a">Login</a>');          
        }        
        $("#"+footer).trigger('create');
        return false;    
    }
    
    $.mobile.document.on('click', '#footerLoginButton', function(e){
        e.preventDefault();
        casLogin(function(){            
            $(':mobile-pagecontainer').pagecontainer('change', '#startPage');
            checkUserLogin();
        });
    });
    
    $.mobile.document.on('click', '#footerLogoutButton', function(e){
        e.preventDefault();
        casLogout();
    });
            