
    function casLogout(){
        var url = "https://cas.thm.de/cas/logout";
        var iab = window.open(url,'_blank','location=no,hidden=yes');
        iab.addEventListener('loadstart', function(event){
            iab.close();
        });
        iab.addEventListener('loaderror', function(event){
            alert(event.type + ' - ' + event.message);
        });
        iab.addEventListener('exit', function(event){
            if (iab){iab = null;}
            alert("Logout erfolgreich.");
        });

        sessionStorage.removeItem("username");
        sessionStorage.removeItem("displayname");
        sessionStorage.removeItem("mail");
        sessionStorage.removeItem("apiKey");
        return false;    
    }        
    
    function casLogin(callback){        
        var url = "https://cas.thm.de/cas/login"        
        var service = encodeURIComponent("PhyLab");

        var iab = window.open(url+"?service="+service, '_blank', 'location=no,hidden=no');

        iab.addEventListener('loadstart', function(evt){
            var ticket = evt.url.split("ticket=", 2);
            if(ticket[1]){
                validateTicket(ticket[1], callback);
                iab.close();                
            }
        });
        iab.addEventListener('loadstop', function(evt){
            /*
            iab.executeScript({
                code: 'document.getElementsByName("abort")[0].onclick = function(){sessionStorage.setItem("abort","yes");}'
            }, function(){

            });
            */
            iab.executeScript({
                code: 'document.getElementsByName("abort")[0].onclick = function(){document.getElementById("username").value = "";document.getElementById("password").value = "";}'
            }, function(){
            });
            
            // TODO: Bei Click on Abbrechen Button auf CAS Login Page den InAppBrowser beenden und zur App zur�ckkehren.
                                                                    
            /*
            iab.executeScript({
                code: 'document.getElementsByName("abort")[0].onclick = function(){sessionStorage.setItem("abort","yes");var loop = setInterval(function(){return sessionStorage.abort;})}'
            }, function(values){

            });
            */
            /*
            var loop = setInterval(function(){
                //if(!cordova.plugins.Keyboard.isVisible){
                  //  cordova.plugins.Keyboard.show();
                //}
                iab.executeScript({
                    code:'sessionStorage.getItem("abort");'
                },function(values){
                    if(!cordova.plugins.Keyboard.isVisible){
                        cordova.plugins.Keyboard.show();
                    }
                    var abort = values[0];
                    if(abort){
                        clearInterval(loop);
                        iab.close();
                    }
                });
            });
            */
        });
        iab.addEventListener('loaderror', function(){
            alert(event.type + ' - ' + event.message);
        });
        iab.addEventListener('exit', function(){
            if (iab){iab = null;}
        });
    }
        
    function casValidation(ticket, callback){
        $.ajax({
            url: 'http://phylab.org/api/index.php/'+ticket,
            method: 'GET',
            success: function(result){
                console.log(result);
                if(result.validate){                    
                    sessionStorage.setItem("username", result.username);
                    sessionStorage.setItem("displayname", result.displayname);
                    sessionStorage.setItem("mail", result.mail);
                    sessionStorage.setItem("apiKey", result.apiKey);                   
                    callback(result);
                } else {
                    alert("Die Validierung des Tickets ist fehlgeschlagen.");
                    casLogout();
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    }
      