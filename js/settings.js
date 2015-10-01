
    $.mobile.document.on('pagecreate', '#settingsPage', function(e) {
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
        $("#settingsHeadline").html("Einstellungen");
        $("#settingsContent").append("Einstellungen");
    });
    
    $.mobile.document.on('pagebeforeshow', '#settingsPage', function(e){
        e.preventDefault();

    });