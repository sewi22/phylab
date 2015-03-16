    $.mobile.document.ready(function() {
        db = window.openDatabase("PhyLabDB", "", "PhyLab Database", 1024*1024);
        createDBTables();
        fillDBTables();        
    });
    
         
    $(function () {
        $("[data-role=panel]").enhanceWithin().panel();
    });
    
    
    // Decision if going back in history or exiting app by clicking the hardware "Back Button"
    $.mobile.document.on("click", "backbutton", function(e){
        e.preventDefault();
        var $ap = $(document).pagecontainer("getActivePage");
        if($ap == '#expListAllPage' || 'expListFavPage'){
            navigator.app.exitApp();
        } else {
            navigator.app.backHistory()
        }        
    });
