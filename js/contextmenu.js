
    $.mobile.document.on("touchend mouseup", "#expListContextMenuButton", function(e) {
        e.preventDefault();
        if( $(".ui-panel").hasClass("ui-panel-open") == true ){
            $("#expListContextMenu").panel("close");
        }else{
            $("#expListContextMenu").panel("open");
        }
    });
    $.mobile.document.on("touchend mouseup", "#expPageContextMenuButton", function(e) {
        e.preventDefault();
        if( $(".ui-panel").hasClass("ui-panel-open") == true ){
            $("#expPageContextMenu").panel("close");
        }else{
            $("#expPageContextMenu").panel("open");
        }
    });

    // TODO: Problems with Mouseup Event in Android Browser
    $.mobile.document.on("touchend mouseup", "#contextMenuBackButton", function(e) {
        e.preventDefault();
        closeContextMenu();
    });

    // Mark actual Exp as Favorite
    $.mobile.document.on("touchend mouseup", "#contextMenuFavButton", function(e){
        e.preventDefault();
        expGroupNumber = localStorage.getItem("expGroupNumber");
        expNumber = localStorage.getItem("expNumber");

        getExpIsFav(expGroupNumber, expNumber, function(result){
            var expIsFav = (result.expIsFav == 0) ? 1 : 0;
            setExpIsFav(expIsFav, expGroupNumber, expNumber, function(){});
        });
        closeContextMenu();
    });

    // Open QR Code Reader and using callback values by scanning a QR Code Button
    $.mobile.document.on("touchend mouseup", "#contextMenuQrButton", function(e){        
        e.preventDefault();
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan( function (result) {
            alert("Scanner result: \n" +
            "text: " + result.text + "\n" +
            "format: " + result.format + "\n" +
            "cancelled: " + result.cancelled + "\n");
        },function (error) {
            console.log("Scanning failed: ", error);
        });
        closeContextMenu();
    });
    
    // Mark actual Exp as Favorite
    $.mobile.document.on("touchend mouseup", "#contextMenuPdfButton", function(e){
        e.preventDefault();        
        $(':mobile-pagecontainer').pagecontainer('change', '#pdfPage');        
        closeContextMenu();        
    });
    
    /*+
    $(window).on("orientationchange", function(event){
        //$("#orientation").text( "This device is in " + event.orientation + " mode!" );
        alert( "This device is in " + event.orientation + " mode!" );
        var w = $(window).width();
        var h = $(window).height();
        console.log(event);
    });
    */
    
    
    $(window).resize(function(e) {        
        var w = $(window).width(); console.log(w);
        var h = $(window).height();console.log(h);
        //alert("width: "+w+" / height: "+h);
        if(window.location.href.substr(window.location.href.indexOf("#")) == "#pdfPage"){
            reloadPdfFrame(h,w);
        }
    });
    
    /*
    $(window).on('orientationchange', function(e) {
        console.log("change orientation to "+e.orientation);
        console.log(window.location.href.substr(window.location.href.indexOf("#")));        
        
        if(window.location.href.substr(window.location.href.indexOf("#")) == "#pdfPage"){
            var w = $(window).width(); console.log(w);
            var h = $(window).height();console.log(h);
            reloadPdfFrame(w,h);
            
            $.mobile.changePage("#pdfPage"), {
                allowSamePageTransition: true,
                transition: 'none',
                reloadPage: true
            });
              
        }             
    });
    */
    
    
    function reloadPdfFrame(h, w){
        $("#pdfContent").empty();
        var url = "http://galileo.mnd.th-mittelhessen.de/images/personen/kreuz_patricia/Mechanik1.pdf";
        var pdfFrame = '<iframe src="http://docs.google.com/gview?url='+url+'&embedded=true" style="width:'+w+'px; height:'+h+'px;" frameborder="0"></iframe>';
        $("#pdfContent").append(pdfFrame);    
    }


    function addExpListContextMenuButton(page){
        $('#'+page+' [data-role="header"]').append('<a id="expListContextMenuButton" data-role="button" data-icon="bars" class="ui-btn-right" href="#">Men&uuml;</a>').trigger("create");
    }
    function addExpPageContextMenuButton(page){
        $('#'+page+' [data-role="header"]').append('<a id="expPageContextMenuButton" data-role="button" data-icon="bars" class="ui-btn-right" href="#">Men&uuml;</a>').trigger("create");
    }

    function fillExpListContextMenu(){
        var links = "";
        links += '<a href="#" id="contextMenuBackButton" data-theme="a" data-role="button">zur&uuml;ck</a>';
        links += '<a href="#" id="contextMenuQrButton"data-role="button">QR Reader</a>';
        links += '<a href="#" id="contextMenuPdfButton"data-role="button">PDF</a>';
        //links += '<a href="#" data-role="button">Impressum</a>';
        $('#expListContextMenuControlgroup').controlgroup("container").append(links);
        $('#expListContextMenuControlgroup').enhanceWithin().controlgroup('refresh');
    }

    function fillDetailsContextMenu(){
        var links = "";
        links += '<a href="#" id="contextMenuBackButton" data-theme="a" data-role="button">zur&uuml;ck</a>';
        links += '<a href="#" id="contextMenuFavButton" data-role="button">als Favorit</a>';
        links += '<a href="#" id="contextMenuQrButton" data-role="button">QR Reader</a>';
        //links += '<a href="#" data-role="button">Impressum</a>';
        $('#detailsContextMenuControlgroup').controlgroup("container").append(links);
        $('#detailsContextMenuControlgroup').enhanceWithin().controlgroup('refresh');
    }
    
    function closeContextMenu(){
        $(".contextMenu").panel("close");
        //$("#expListContextMenu").panel("close");
        //$("#expPageContextMenu").panel("close");
    }
    