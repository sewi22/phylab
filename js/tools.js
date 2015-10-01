
    $.mobile.document.on('pagecreate', '#toolsListPage', function(e) {
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
        $("#toolsListHeadline").html("Geräte");        
    });
    
    $.mobile.document.on('pagebeforeshow', '#toolsListPage', function(e){
        e.preventDefault();
        $('#toolsList').empty();
        checkUserLogin();
        if(checkConnection()){                
        $.mobile.loading("show", {text: "Daten werden geladen.", textVisible: true});
        $.ajax({
            type: 'GET',
            url: apidomain+"/exptools/"+localStorage.getItem("expId"),
            dataType: "json",
            success: function(result) {            
                db.transaction(function(tx){                
                    if(result.expTools.length == 0){
                        $('#toolsList').append('<li>Für diesen Versuch existieren noch keine Geräteinformationen.</li>');                         
                    } else {                                            
                        for(var i=0;i<result.expTools.length;i++){
                            (function(i){
                                var expTool = result.expTools[i];
                                if(expTool.isActive == 0){
                                    $('#toolsList').append('<li>'+ expTool.toolname + '</li>');
                                } else {
                                    $('#toolsList').append('<li><a href="#toolPage" data-toolId="'+expTool.id+'">'+ expTool.toolname + '</a></li>');                                    
                                }                                
                            })(i);
                        }
                    }
                    $('#toolsList').listview('refresh');
                    $.mobile.loading("hide");
                });
            },
            error: function(err){
                $.mobile.loading("hide");
                console.log('Fehler beim Laden der Geräte: '+err.code);            
                navigator.notification.alert("Bei der Datenübertragung ist leider ein Fehler aufgetreten.", function(){}, 'Fehler', 'OK');
            }
        });
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');
        }

        $("#toolsList").delegate("li a", "touchstart mouseup", function (){
            sessionStorage.setItem("toolId", $(this).jqmData('toolid'));
        });
    });



    $.mobile.document.on('pagecreate', '#toolPage', function(e) {
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
    });

    $.mobile.document.on('pagebeforeshow', '#toolPage', function(e, data){
        e.preventDefault();
        toolId = sessionStorage.toolId;
        checkUserLogin();
        if(checkConnection()){
        $.mobile.loading("show", {text: "Daten werden geladen.", textVisible: true});            
        $.ajax({
            type: 'GET',
            url: apidomain+"/tools/"+toolId,
            dataType: "json",
            success: function(result) {
                $.mobile.loading("hide");
                $("#toolHeadline").html(result.toolname);
                $("#toolContent").html(result.description);
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