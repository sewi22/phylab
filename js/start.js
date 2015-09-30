    
    $.mobile.document.on('pagecreate', '#startPage', function(e){
        e.preventDefault();

        $(".ui-toolbar-back-btn").remove();
        $("#startHeadline").html('PhyLab');                
                
	    var startList = '';	    
	    
        startList += '<div class="ui-field-contain" align="center">';	    
        startList += '<select name="expSelect" id="expSelect" data-native-menu="false">';        
        startList += '<option value="choose-one" data-placeholder="true">Versuch wählen</option>';
        startList += '<optgroup label="Mechanik" id="expOptGroup-1">';
        startList += '<option value="1.1" disabled="disabled">Versuch 1.1 Dichtebestimmung</option>';
        startList += '<option value="1.2" disabled="disabled">Versuch 1.2 Elastische Konstanten</option>';
        startList += '<option value="1.3">Versuch 1.3 Trägheitsmoment eines Speichenrades</option>';
        startList += '<option value="1.4" disabled="disabled">Versuch 1.4 Das Reversionspendel</option>';
        startList += '<option value="1.5" disabled="disabled">Versuch 1.5 Drehpendel nach Pohl</option>';
        startList += '<option value="1.6">Versuch 1.6 Torsionspendel</option>';
        startList += '<option value="1.7" disabled="disabled">Versuch 1.7 Kundtsches Rohr</option>';
        startList += '<option value="1.8" disabled="disabled">Versuch 1.8 Interferenzen von Schallwellen</option>';            
        startList += '<option value="1.9" disabled="disabled">Versuch 1.9 Fahrstuhl</option>';
        startList += '<option value="1.10" disabled="disabled">Versuch 1.10 Fallversuch</option>';
        startList += '<option value="1.11" disabled="disabled">Versuch 1.11 Mechanisches Wärmeäquivalent</option>';       
        startList += '</optgroup>';
        startList += '<optgroup label="Kalorik" id="expOptGroup-2">';
        startList += '<option value="2.1" disabled="disabled">Versuch 2.1 Spezifische Wärmen von Festkörpern</option>';
        startList += '<option value="2.2" disabled="disabled">Versuch 2.2 Latente Wärmen von Wasser</option>';
        startList += '<option value="2.3" disabled="disabled">Versuch 2.3 Adiabatenexponent durch Resonanz</option>';
        startList += '<option value="2.4" disabled="disabled">Versuch 2.4 Adiabatenexponent von Luft</option>';
        startList += '<option value="2.5" disabled="disabled">Versuch 2.5 Spezifische Wärme von Wasser</option>';
        startList += '<option value="2.6" disabled="disabled">Versuch 2.6 Luftfeuchte</option>';
        startList += '<option value="2.7" disabled="disabled">Versuch 2.7 Schwarzer Körper</option>';
        startList += '<option value="2.8" disabled="disabled">Versuch 2.8 Wärmepumpe</option>';
        startList += '<option value="2.9" disabled="disabled">Versuch 2.9 Bestimmung des Wirkungsgrades</option>';
        startList += '<option value="2.10" disabled="disabled">Versuch 2.10 Barometrische Höhenformel</option>';
        startList += '<option value="2.11" disabled="disabled">Versuch 2.11 Verflüssigung von Gasen</option>';        
        startList += '</optgroup>';
        startList += '<optgroup label="Optik" id="expOptGroup-3">';
        startList += '<option value="3.1" disabled="disabled">Versuch 3.1 Hauptebenen eines Linsensystems</option>';
        startList += '<option value="3.2" disabled="disabled">Versuch 3.2 Gitter- und Prismenspektrometer</option>';
        startList += '<option value="3.3" disabled="disabled">Versuch 3.3 Brechungsindex</option>';
        startList += '<option value="3.4" disabled="disabled">Versuch 3.4 Photometrische Messungen</option>';
        startList += '<option value="3.5" disabled="disabled">Versuch 3.5 Michelson Interferometer</option>';
        startList += '<option value="3.6" disabled="disabled">Versuch 3.6 Beugung am Gitter</option>';
        startList += '<option value="3.7" disabled="disabled">Versuch 3.7 Reflexion von polarisiertem Licht</option>';
        startList += '</optgroup>';
        startList += '<optgroup label="Elektrotechnik" id="expOptGroup-4">';
        startList += '<option value="4.1" disabled="disabled">Versuch 4.1 Kennlinien von Verbrauchern</option>';
        startList += '<option value="4.2" disabled="disabled">Versuch 4.2 Wheatstonsche Brücke</option>';
        startList += '<option value="4.3" disabled="disabled">Versuch 4.3 Messbereichserweiterung</option>';
        startList += '<option value="4.4" disabled="disabled">Versuch 4.4 Kalibrierung eines Thermoelementes</option>';
        startList += '<option value="4.5" disabled="disabled">Versuch 4.5 Kirchhoffsche Gesetze</option>';
        startList += '<option value="4.6" disabled="disabled">Versuch 4.6 Magnetfeldmessungen</option>';
        startList += '<option value="4.7" disabled="disabled">Versuch 4.7 Kennlinien eines Spannungsteilers</option>';
        startList += '<option value="4.8" disabled="disabled">Versuch 4.8 Innenwiderstand einer Batterie</option>';
        startList += '<option value="4.9" disabled="disabled">Versuch 4.9 Hoch- und Tiefpass</option>';
        startList += '<option value="4.10" disabled="disabled">Versuch 4.10 Kennlinien einer Solarzelle</option>';
        startList += '<option value="4.11" disabled="disabled">Versuch 4.11 Lade- und Entladekurve eines Kondensators</option>';
        startList += '</optgroup>';
        startList += '<optgroup label="Atomphysik" id="expOptGroup-5">';
        startList += '<option value="5.1">Versuch 5.1 Absorption von Beta-Strahlung</option>';
        startList += '<option value="5.2" disabled="disabled">Versuch 5.2 Absorption von Gamma-Strahlung</option>';
        startList += '<option value="5.3" disabled="disabled">Versuch 5.3 Spezifische Elektronenladung</option>';
        startList += '<option value="5.4" disabled="disabled">Versuch 5.4 Plancksche Konstante</option>';
        startList += '<option value="5.5" disabled="disabled">Versuch 5.5 Gammaspektroskopie</option>';
        startList += '<option value="5.6" disabled="disabled">Versuch 5.6 Balmerserie</option>';
        startList += '<option value="5.7" disabled="disabled">Versuch 5.7 Alpha-Spektroskopie</option>';
        startList += '<option value="5.7" disabled="disabled">Versuch 5.8 Röntgenspektrum</option>';
        startList += '<option value="5.8" disabled="disabled">Versuch 5.9 Röntgendosimetrie</option>';
        startList += '<option value="5.9" disabled="disabled">Versuch 5.10 Franck-Hertz-Versuch</option>';        
        startList += '</optgroup>';        
        startList += '</select>';
        
        //startList += '<select name="expSelect2" id="expSelect2" data-native-menu="false">';
        //startList += '<option value="choose-one" data-placeholder="true">Versuch wählen</option>';
        //startList += '</select>';
        startList += '</div>';	    

	    startList += '<ul id="startList" data-role="listview" data-inset="true">';
        
        startList += '<li id="videoLink"><a href="#videoPage">';
        //startList += '<img src="img/icons/web38.png">';
        startList += '<h2>Video</h2>';
        startList += '<p>Ablauf der Versuchs</p></a>';
        startList += '</li>';
        
        startList += '<li id="toolsLink"><a href="#toolsListPage">';
        //startList += '<img src="img/icons/microscope23.png">';
        startList += '<h2>Geräte</h2>';
        startList += '<p>Bestandteile des Versuchsaufbaus</p></a>';
        startList += '</li>';
        
        startList += '<li id="termsLink"><a href="#termsListPage">';
        //startList += '<img src="img/icons/questions.png">';
        startList += '<h2>Fachbegriffe</h2>';
        startList += '<p>Wichtige Schlagworte für diesen Versuch</p></a>';
        startList += '</li>';
        
        startList += '<li id="topicsLink"><a href="#topicsListPage">';
        //startList += '<img src="img/icons/chat-bubble.png">';
        startList += '<h2>Pinnwand</h2>';
        startList += '<p>Diskussionen rund um den Versuch</p></a>';
        startList += '</li>';
                
        startList += '<li id="pdfLink"><a href="#pdfPage">';
        //startList += '<img src="img/icons/newspaper18.png">';
        startList += '<h2>Versuchsbeschreibung</h2>';
        startList += '<p>PDF Dokument des Versuchs</p></a>';
        startList += '</li>';
        
        startList += '<li id="quizLink"><a href="#quizPage">';
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
        
        e.preventDefault();
        if (!localStorage["expGroupNumber"] || !localStorage["expNumber"]) {
            //$('#startSubHeader').html('Aktuell: Kein Versuch ausgewählt<span class="sub-header-icon ui-btn-icon-notext ui-icon-carat-d" />');
            //$('#select').val(myval).selectmenu('refresh');
        } else {
            $('#expSelect').val(localStorage.getItem("expGroupNumber")+"."+localStorage.getItem("expNumber")).attr('selected', true).selectmenu('refresh');
        }
    });
    
    //TODO: gewaehlter Eintrag als Vorauswahl einstellen 
    $.mobile.document.on('pagebeforeshow', '#startPage', function(e){
        console.log("pagebeforeshow startpage");
        if(!localStorage["expGroupNumber"] || !localStorage["expNumber"]){        
            $("#videoLink a").addClass("ui-state-disabled");
            $("#toolsLink a").addClass("ui-state-disabled");
            $("#termsLink a").addClass("ui-state-disabled");
            $("#topicsLink a").addClass("ui-state-disabled");
            $("#pdfLink a").addClass("ui-state-disabled");
            $("#quizLink a").addClass("ui-state-disabled");            
        } else {
            //$("#videoLink a").removeClass("ui-state-disabled");
            //$("#toolsLink a").removeClass("ui-state-disabled");
            //$("#termsLink a").removeClass("ui-state-disabled");
            //$("#topicsLink a").removeClass("ui-state-disabled");
            //$("#pdfLink a").removeClass("ui-state-disabled");
            //$("#quizLink a").removeClass("ui-state-disabled");                         
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
       