    $.mobile.document.ready(function() {
        db = window.openDatabase("PhyLabDB", "", "PhyLab Database", 1024*1024);
        createDBTables();
        fillDBTables();
        $(':mobile-pagecontainer').pagecontainer('change', '#startPage', {});                       
    });
    
         
    $(function () {
        $("[data-role=panel]").enhanceWithin().panel();
    });
    
    
    // Decision if going back in history or exiting app by clicking the hardware "Back Button"
    // TODO: Funktion von Back Button für Smartphone abfangen
    /*
    $.mobile.document.on("click", "backbutton", function(e){
    //$(window).on("navigate", function (e, data) {
        e.preventDefault();
        var $ap = $(document).pagecontainer("getActivePage");
        alert($(document).pagecontainer("getActivePage"));
        var direction = data.state.direction;
        alert(direction);
        /*
        if($ap == '#startPage'){
            navigator.app.exitApp();
        } else {
            navigator.app.backHistory()
        }       
    });
    */
    
    
    $(window).resize(function(e) {
        var w = $(window).width();
        var h = $(window).height();        
        if(window.location.href.substr(window.location.href.indexOf("#")) == "#pdfPage"){
            reloadPdfFrame(h,w);
        }
    });
    
    
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '642904912480427',
            xfbml      : false,
            version    : 'v2.1'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));  
        
