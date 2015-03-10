    $.mobile.document.ready(function() {
        db = window.openDatabase("PhyLabDB", "", "PhyLab Database", 1024*1024);
        createDBTables();
        fillExpTables();
        fillQuestionTables();
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



    // Swipe on detailsPage to Left
    $.mobile.document.on('swipeleft', '#expDetailsPage', function(e){
        e.preventDefault();
        var next = '#' + $.mobile.activePage.next('[data-role=page]')[0].id;                
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', next);//, {transition: 'none', reverse: false});
            e.handled = true;
        }    
    });
    // Swipe on expListFavPage to Right
    $.mobile.document.on('swiperight', '#quizPage', function(e){
        e.preventDefault();        
        var prev = '#' + $.mobile.activePage.prev('[data-role=page]')[0].id;
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', prev);//, {transition: 'none', reverse: true});
            e.handled = true;
        }        
    });
    // Click on Quiz Tab
    $.mobile.document.on('touchend', '#footerNavbarItemQuiz', function(e){
        e.preventDefault();
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#quizPage');//, {transition: 'none', reverse: false});
        }        
    });
    // Click on Details Tab
    $.mobile.document.on('touchend', '#footerNavbarItemDetails', function(e){
        e.preventDefault();
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#expDetailsPage');//, {transition: 'none', reverse: true});
        }        
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
        //links += '<a href="#" data-role="button">Impressum</a>';
        $('#expListContextMenuControlgroup').controlgroup("container").append(links);
        $('#expListContextMenuControlgroup').enhanceWithin().controlgroup('refresh');
    }

    function fillExpDetailsContextMenu(){
        var links = "";
        links += '<a href="#" id="contextMenuBackButton" data-theme="a" data-role="button">zur&uuml;ck</a>';
        links += '<a href="#" id="contextMenuFavButton" data-role="button">als Favorit</a>';        
        links += '<a href="#" id="contextMenuQrButton" data-role="button">QR Reader</a>';
        //links += '<a href="#" data-role="button">Impressum</a>';
        $('#expDetailsContextMenuControlgroup').controlgroup("container").append(links);
        $('#expDetailsContextMenuControlgroup').enhanceWithin().controlgroup('refresh');
    }

    function addExpFooterNavbar(page){
        var navbar, navbarId, footerId, addClassAll, addClassFav = "";        
        if (page == "expDetailsPage"){
            navbarId = "#expDetailsNavbar"; footerId = "#expDetailsFooter";
            classDetails = ' class="ui-btn-active ui-state-persist"';
            classQuiz = ''; classFaq = '';
        } else if (page == "faqPage"){
            navbarId = "#expFaqNavbar"; footerId = "#expFaqFooter";
            classDetails = ''; classQuiz = '';
            classFaq = ' class="ui-btn-active ui-state-persist"';
        } else if (page == "quizPage"){
            navbarId = "#expQuizNavbar"; footerId = "#expQuizFooter";
            classDetails = ''; classFaq = '';
            classQuiz = ' class="ui-btn-active ui-state-persist"';
        }
        var navbar = $('<div id="'+navbarId+'" class="expPageNavbar" data-role="navbar" data-iconpos="bottom"><ul><li><a id="footerNavbarItemDetails" href="#expDetailsPage" data-theme="a" data-icon="info"'+classDetails+'>Details</a></li><li><a id="footerNavbarItemFaq" href="#faqPage" data-theme="a" data-icon="comment"'+classFaq+'>FAQ</a></li><li><a id="footerNavbarItemQuiz" href="#quizPage" data-theme="a" data-icon="check"'+classQuiz+'>Quiz</a></li></ul></div>').appendTo(footerId);
        $(footerId).append(navbar).trigger('create');
    }
    
    
    // Add a NavBar to footer in ExpLists
    function addExpListFooterNavbar(page){
        var navbar, navbarId, footerId, addClassAll, addClassFav = "";
        if (page == "expListAllPage"){
            navbarId = "#expListAllNavbar";footerId = "#expListAllFooter";addClassAll = 'class="ui-btn-active ui-state-persist"'; addClassFav = '';
        } else if (page == "expListFavPage"){
            navbarId = "#expListFavNavbar";footerId = "#expListFavFooter";addClassAll = ''; addClassFav = 'class="ui-btn-active ui-state-persist"';
        }
        var navbar = $('<div id="'+navbarId+'" class="expListNavbar" data-role="navbar" data-iconpos="bottom"><ul><li><a id="footerNavbarItemListAll" href="#expListAllPage" '+addClassAll+' data-theme="a" data-icon="bullets">Alle</a></li><li><a id="footerNavbarItemListFav" href="#expListFavPage" '+addClassFav+' data-theme="a" data-icon="star">Favoriten</a></li></ul></div>').appendTo(footerId);
        $(footerId).append(navbar).trigger('create');
    }  
    
    // Swipe on expListAllPage to Left
    $.mobile.document.on('swipeleft', '#expListAllPage', function(e) {
        e.preventDefault();        
        var next = '#' + $.mobile.activePage.next('[data-role=page]')[0].id;
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', next);//, {transition: 'none', reverse: false});
            e.handled = true;
        }        
    });
    // Click on Fav Tab
    $.mobile.document.on('touchend', '#footerNavbarItemListFav', function(e){
        e.preventDefault();
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#expListFavPage');//, {transition: 'none', reverse: false});
        }        
    });
    // Swipe on expListFavPage to Right
    $.mobile.document.on('swiperight', '#expListFavPage', function(e) {
        e.preventDefault();
        var prev = '#' + $.mobile.activePage.prev('[data-role=page]')[0].id;
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', prev);//, {transition: 'none', reverse: true});
            e.handled = true;
        }        
    });
    // Click on All Tab
    $.mobile.document.on('touchend', '#footerNavbarItemListAll', function(e){
        e.preventDefault();
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#expListAllPage');//, {transition: 'none', reverse: true});
        }        
    });
 