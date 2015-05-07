    
    $.mobile.document.on('pagecreate', '#startPage', function(e){
        e.preventDefault();

        $(".ui-toolbar-back-btn").remove();
        $("#startHeadline").html('PhyLab');
        var startItems = '';
        // TODO: Bestimmte Icons nur in Abhängigkeit eines gewählten Versuchs anzeigen (evtl. in pagebeforeshow verschieben).        
        //startItems += '<div id="" class="startItem"><img src="http://placehold.it/100/4A5C66" /><br/>Vorbereitung</div>';
        //startItems += '<div id="" class="startItem"><img src="http://placehold.it/100/4A5C66" /><br/>Durchführung</div>';
        //startItems += '<div id="" class="startItem"><img src="http://placehold.it/100/4A5C66" /><br/>Nachbereitung</div>';
        //startItems += '<div id="startItemReport" class="startItem"><img src="img/icons/newspaper18.png" /><br/>Bericht</div>';
        startItems += '<div id="startItemTopics" class="startItem"><img src="img/icons/chat-bubble.png" /><br/>Pinnwand</div>';
        startItems += '<div id="startItemQuiz" class="startItem"><img src="img/icons/businessman205.png" /><br/>Quiz</div>';
        //startItems += '<div id="startItemTools" class="startItem"><img src="img/icons/microscope4.png" /><br/>Geräte</div>';
        //startItems += '<div id="startItemScanner" class="startItem"><img src="img/icons/blackberry4.png" /><br/>Scanner</div>';
        //startItems += '<div id="startItemPdf" class="startItem"><img src="img/icons/questions.png" /><br/>PDF</div>';
        //startItems += '<div id="startItemSettings" class="startItem"><img src="http://placehold.it/100/80BA24" /><br/>Einstellungen</div>';
        startItems += '<div id="startItemContact" class="startItem"><img src="img/icons/new100.png" /><br/>Kontakt</div>';
        startItems += '<div id="startItemImpressum" class="startItem"><img src="img/icons/information38.png" /><br/>Impressum</div>';
        
        // TODO: Wieder entfernen. Testweise setzen von Benutzernamen und ApiKey im LocalStorage.
        startItems += '<div id="setSwntUser" class="startItem"><img src="img/icons/information38.png" /><br/>swnt24</div>';
        startItems += '<div id="setMmstUser" class="startItem"><img src="img/icons/information38.png" /><br/>mmst99</div>';
        startItems += '<div id="setNoUser" class="startItem"><img src="img/icons/information38.png" /><br/>No User</div>';                   
        
        
        $("#startContent").addClass("center");
        $("#startContent").append(startItems);

        //addExpFooterNavbar(e.target.id);
        //addExpPageContextMenuButton(e.target.id);
    });
    
    $.mobile.document.on('pagebeforeshow', '#startPage', function(e){
        e.preventDefault();
        if (!localStorage["expGroupNumber"] || !localStorage["expNumber"]) {
            $('#startSubHeader').html('Aktuell: Kein Versuch ausgewählt<span class="sub-header-icon ui-btn-icon-notext ui-icon-carat-d" />');
        } else {            
            $('#startSubHeader').html("Aktuell: "+localStorage.expGroupNumber+"."+localStorage.expNumber+" "+localStorage.expName+'<span class="sub-header-icon ui-btn-icon-notext ui-icon-carat-d" />');
            //getExp(localStorage.expGroupNumber, localStorage.expNumber, function(result){
                //$('#startSubHeader').html("Aktuell: "+localStorage.expGroupNumber+"."+localStorage.expNumber+" "+result.expName+'<span class="sub-header-icon ui-btn-icon-notext ui-icon-carat-d" />');
            //});
        }
        /*
        fillContextMenu(function(link){            
            link += '<a href="#" id="contextMenuBackButton" data-theme="a" data-role="button">zur&uuml;ck</a>';
            link += '<a href="#" id="contextMenuAddPost"data-role="button">Beitrag erstellen</a>';
            if(localStorage.username && localStorage.apiKey){
                link += '<a href="#" id="contextMenuLogout"data-role="button">Logout</a>';
                //$("#"+footer).html('Aktueller Nutzer: '+localStorage.username+'<a href="#" id="footerLogoutButton" data-role="button" class="ui-btn-right" data-theme="a">Logout</a>');
            } else {
                link += '<a href="#" id="contextMenuLogin"data-role="button">Login</a>';
                //$("#"+footer).html('Nicht eingeloggt.<a href="#" id="footerLoginButton" data-role="button" class="ui-btn-right" data-theme="a">Login</a>');
            }    
            return link;
        });
        */        
        checkUserLogin();
    });
    
    
    // BUTTON CLICK EVENTS
    $.mobile.document.on('click', '#startItemReport', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#reportPage');
    });
    
    $.mobile.document.on('click', '#startItemQuiz', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#quizPage');
    });

    $.mobile.document.on('click', '#startItemTopics', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#topicsListPage');
    });

    $.mobile.document.on('click', '#startItemTools', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#toolsListPage');
    });

    $.mobile.document.on('click', '#startItemScanner', function(e){
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
    });

    $.mobile.document.on('click', '#startItemPdf', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#pdfPage');
    });
    
    $.mobile.document.on('click', '#startItemSettings', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#settingsPage');
    });

    $.mobile.document.on('click', '#startItemContact', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#contactPage');
    });

    $.mobile.document.on('click', '#startItemImpressum', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#impressumPage');
    });
    

    // Auswahl der Experimente, verweist auf ExpList
    $.mobile.document.on('click', '#startSubHeader', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#expListAllPage', {changeHash:false});
    });