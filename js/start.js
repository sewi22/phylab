    
    $.mobile.document.on('pagecreate', '#startPage', function(e){
        e.preventDefault();

        $(".ui-toolbar-back-btn").remove();
        $("#startHeadline").html('PhyLab');                
                
	    var startList = '';	    
	    
        startList += '<div class="ui-field-contain" align="center">';	    
        startList += '<select name="experimentselect" id="experimentselect" data-native-menu="false">';        
        startList += '<option value="choose-one" data-placeholder="true">Versuch wählen</option>';
        startList += '</select>';
        startList += '</div>';
	    
	    
	    
        /*<optgroup label="Group 1">
            <option value="1">The 1st Option</option>
            <option value="2">The 2nd Option</option>
            <option value="3">The 3rd Option</option>
            <option value="4">The 4th Option</option>
        </optgroup>*/

	    
	    
	    startList += '<ul data-role="listview" data-inset="true">';
        
        startList += '<li><a href="#videoPage">';
        //startList += '<img src="img/icons/web38.png">';
        startList += '<h2>Video</h2>';
        startList += '<p>Ablauf der Versuchs</p></a>';
        startList += '</li>';
        
        startList += '<li><a href="#toolsListPage">';
        //startList += '<img src="img/icons/microscope23.png">';
        startList += '<h2>Geräte</h2>';
        startList += '<p>Bestandteile des Versuchsaufbaus</p></a>';
        startList += '</li>';
        
        startList += '<li><a href="#termsListPage">';
        //startList += '<img src="img/icons/questions.png">';
        startList += '<h2>Fachbegriffe</h2>';
        startList += '<p>Wichtige Schlagworte für diesen Versuch</p></a>';
        startList += '</li>';
        
        startList += '<li><a href="#topicsListPage">';
        //startList += '<img src="img/icons/chat-bubble.png">';
        startList += '<h2>Pinnwand</h2>';
        startList += '<p>Diskussionen rund um den Versuch</p></a>';
        startList += '</li>';
                
        startList += '<li><a href="#pdfPage">';
        //startList += '<img src="img/icons/newspaper18.png">';
        startList += '<h2>Versuchsbeschreibung</h2>';
        startList += '<p>PDF Dokument des Versuchs</p></a>';
        startList += '</li>';
        
        startList += '<li><a href="#quizPage">';
        //startList += '<img src="img/icons/businessman205.png">';
        startList += '<h2>Quiz</h2>';
        startList += '<p>Fragen zum Versuch</p></a>';
        startList += '</li>';
        
        startList += '<li><a href="#contactPage">';
        //startList += '<img src="img/icons/new100.png">';
        startList += '<h2>Kontakt</h2>';
        startList += '<p>Nachrichten senden</p></a>';
        startList += '</li>';
        
        startList += '<li><a href="#impressumPage">';
        //startList += '<img src="img/icons/information38.png">';
        startList += '<h2>Impressum</h2>';
        startList += '<p>Information zur Anwendung</p></a>';
        startList += '</li>';         
        
        startList += '</ul>';
                       
        $("#startContent").addClass("center");
        $("#startContent").append(startList);
        $("#startContent").enhanceWithin();

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
    
    $.mobile.document.on('click', '#startItemVideo', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#videoPage');
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