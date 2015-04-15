    
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }    
    
    function convertTimestamp(ts) {        
        var day  = ts.substr(8,2);  var month = ts.substr(5,2);  var year = ts.substr(0,4);    
        var hour = ts.substr(11,2); var min   = ts.substr(14,2); var sec  = ts.substr(17,2);        
        return day+"."+month+"."+year+" "+hour+":"+min;
    }
    
    function deleteCookie(name, path, domain) {
        // TODO: get_cookie als Function existiert (noch) nicht?!
        //alert("delete cookie");        
        //if(get_cookie(name)){
            alert("Cookie found and delete: "+name);
            document.cookie = name + "=" + ((path) ? ";path="+path:"")+ ((domain)?";domain="+domain:"") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        //}
    }
    