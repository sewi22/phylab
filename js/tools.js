
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
        $.ajax({
            type: 'GET',
            url: apidomain+"/exptools/"+localStorage.getItem("expId"),
            dataType: "json",
            success: function(result) {
                db.transaction(function(tx){
                    for(var i=0;i<result.expTools.length;i++){
                        (function(i){
                            var expTool = result.expTools[i];
                            $('#toolsList').append('<li data-icon="false"><a href="#toolPage" data-toolId="'+expTool.id+'">'+ expTool.toolname + '</a></li>');
                        })(i);
                    }
                    $('#toolsList').listview('refresh');
                });
            },
            error: function(err){
                console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
            }
        });

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
        $.ajax({
            type: 'GET',
            url: apidomain+"/tools/"+toolId,
            dataType: "json",
            success: function(result) {
                $("#toolHeadline").html(result.toolname);
                $("#toolContent").html(result.description);
            },
            error: function(err){
                console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
            }
        });
    });