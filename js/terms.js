
    $.mobile.document.on('pagecreate', '#termsListPage', function(e) {
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
        $("#termsListHeadline").html("Fachbegriffe");        
    });
    
    $.mobile.document.on('pagebeforeshow', '#termsListPage', function(e){
        e.preventDefault();
        $('#termsList').empty();
        checkUserLogin();
        if(checkConnection()){                
        $.mobile.loading("show", {text: "Daten werden geladen.", textVisible: true});
        $.ajax({
            type: 'GET',
            url: apidomain+"/expterms/"+localStorage.getItem("expId"),
            dataType: "json",
            success: function(result) {            
                db.transaction(function(tx){                    
                    if(result.expTerms.length == 0){
                        $('#termsList').append('<li>Für diesen Versuch existieren noch keine Fachbegriffe.</li>');
                    } else {
                        for(var i=0;i<result.expTerms.length;i++){
                            (function(i){
                                var expTerm = result.expTerms[i];
                                if(expTerm.isActive == 0){
                                    $('#termsList').append('<li>'+ expTerm.termname + '</li>');    
                                } else {
                                    $('#termsList').append('<li><a href="#termPage" data-termId="'+expTerm.id+'">'+ expTerm.termname + '</a></li>');
                                }                                
                            })(i);
                        }
                    }
                    $('#termsList').listview('refresh');
                    $.mobile.loading("hide");
                });
            },
            error: function(err){
                $.mobile.loading("hide");
                console.log('Fehler beim Laden der Fachbegriffe: '+err.code);            
                navigator.notification.alert("Bei der Datenübertragung ist leider ein Fehler aufgetreten.", function(){}, 'Fehler', 'OK');
            }
        });
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');
        }

        $("#termsList").delegate("li a", "touchstart mouseup", function (){
            sessionStorage.setItem("termId", $(this).jqmData('termid'));
        });
    });



    $.mobile.document.on('pagecreate', '#termPage', function(e) {
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
    });

    $.mobile.document.on('pagebeforeshow', '#termPage', function(e, data){
        e.preventDefault();
        termId = sessionStorage.termId;
        checkUserLogin();
        if(checkConnection()){
        $.mobile.loading("show", {text: "Daten werden geladen.", textVisible: true});            
        $.ajax({
            type: 'GET',
            url: apidomain+"/terms/"+termId,
            dataType: "json",
            success: function(result) {
                $.mobile.loading("hide");
                $("#termHeadline").html(result.termname);
                $("#termContent").html(result.description);
            },
            error: function(err){
                $.mobile.loading("hide");
                console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);                
                navigator.notification.alert("Bei der Datenübertragung ist leider ein Fehler aufgetreten.", function(){}, 'Fehler', 'OK');
            }
        });
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');
        }
    });