
    // Auswahl eines Buttons im Context Menu

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
        // TODO: Aufruf der Scanner Funktion und Auslesen der Rückgabewerte
        closeContextMenu();
    });
    
    // Mark actual Exp as Favorite
    $.mobile.document.on("touchend mouseup", "#contextMenuPdfButton", function(e){
        e.preventDefault();        
        $(':mobile-pagecontainer').pagecontainer('change', '#pdfPage');        
        closeContextMenu();        
    });
    
    // Mark actual Exp as Favorite
    $.mobile.document.on("touchend mouseup", "#contextMenuImpressumButton", function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#impressumPage');
        closeContextMenu();
    });
    
    // Mark actual Exp as Favorite
    $.mobile.document.on("touchend mouseup", "#contextMenuContactButton", function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#contactPage');
        closeContextMenu();
    });
    
    

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
        //links += '<a href="#" id="contextMenuPdfButton"data-role="button">PDF</a>';
        links += '<a href="#" id="contextMenuContactButton"data-role="button">Kontakt</a>';
        links += '<a href="#" id="contextMenuImpressumButton"data-role="button">Impressum</a>';
        //links += '<a href="#" data-role="button">Impressum</a>';
        $('#expListContextMenuControlgroup').controlgroup("container").append(links);
        $('#expListContextMenuControlgroup').enhanceWithin().controlgroup('refresh');
    }

    function fillDetailsContextMenu(){
        var links = "";
        links += '<a href="#" id="contextMenuBackButton" data-theme="a" data-role="button">zur&uuml;ck</a>';
        links += '<a href="#" id="contextMenuFavButton" data-role="button">als Favorit</a>';
        links += '<a href="#" id="contextMenuQrButton" data-role="button">QR Reader</a>';
        links += '<a href="#" id="contextMenuContactButton"data-role="button">Kontakt</a>';
        links += '<a href="#" id="contextMenuImpressumButton"data-role="button">Impressum</a>';
        //links += '<a href="#" data-role="button">Impressum</a>';
        $('#detailsContextMenuControlgroup').controlgroup("container").append(links);
        $('#detailsContextMenuControlgroup').enhanceWithin().controlgroup('refresh');
    }
    
    function closeContextMenu(){
        $(".contextMenu").panel("close");
    }
    