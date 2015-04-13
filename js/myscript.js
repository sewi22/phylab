    
    $.mobile.document.ready(function() {                
        document.addEventListener("deviceready", deviceready, false);                               
    });
        
    function deviceready(){
        db = window.openDatabase("PhyLabDB", "", "PhyLab Database", 1024*1024);
        createDBTables();
        fillDBTables();
        $(':mobile-pagecontainer').pagecontainer('change', '#startPage', {});
        //alert(navigator.splashscreen);
        navigator.splashscreen.hide();
    }
         
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
    