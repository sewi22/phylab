
    // Öffnen des Context Menu
    $.mobile.document.on("click", "#contextMenuButton", function(e) {
        e.preventDefault();        
        if( $(".ui-panel").hasClass("ui-panel-open") == true ){
            $("#contextMenu").panel("close");
        }else{
            $("#contextMenu").panel("open");
        }
    });
    
    function addContextMenuButton(page){
        $('#'+page+' [data-role="header"]').append('<a href="#" id="contextMenuButton" data-role="button" data-icon="bars" class="ui-btn-right" data-iconpos="notext"></a>').trigger("create");
    }

    function fillContextMenu(callback){
        $('#contextMenuControlgroup').controlgroup("container").empty();
        var links = "";
        links = callback(links);
        $('#contextMenuControlgroup').controlgroup("container").append(links);
        $('#contextMenuControlgroup').enhanceWithin().controlgroup('refresh');
    }
    
    function closeContextMenu(){
        $(".contextMenu").panel("close");
    }


    $.mobile.document.on("click", "#contextMenuBackButton", function(e) {
        e.preventDefault();
        closeContextMenu();
    });
    
    $.mobile.document.on("click", "#contextMenuAddTopic", function(e) {
        e.preventDefault();
        sessionStorage.setItem("add", "topic");        
        if(localStorage.username && localStorage.apiKey){
            $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage', {changeHash:false});
        } else {
            casLogin(function(){
                $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage', {changeHash:false});
            });
        }
        closeContextMenu();
    });
    
    $.mobile.document.on("click", "#contextMenuEditTopic", function(e) {
        e.preventDefault();
        sessionStorage.setItem("edit", "topic");
        sessionStorage.setItem("topicId", e.target.dataset.topicid);
        $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage', {changeHash:false});
        closeContextMenu();
    });
        
    $.mobile.document.on("click", "#contextMenuDeleteTopic", function(e) {
        e.preventDefault();        
        deleteTopic(e.target.dataset.topicid, localStorage.username);
        closeContextMenu();
    });
    
    $.mobile.document.on("click", "#contextMenuAddPost", function(e) {
        e.preventDefault();
        sessionStorage.setItem("add", "post");
        sessionStorage.setItem("topicId", e.target.dataset.topicid);
        $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage', {changeHash:false});
        closeContextMenu();
    });
    
    $.mobile.document.on("click", "#contextMenuAddQuiz", function(e) {
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#quizFormPage', {changeHash:false});
        closeContextMenu();
    });
    
    $.mobile.document.on("click", "#contextMenuLogin", function(e) {
        e.preventDefault();
        casLogin(function(){
            $(':mobile-pagecontainer').pagecontainer('change', '#startPage');
            checkUserLogin();
        });
        closeContextMenu();
    });
    
    $.mobile.document.on("click", "#contextMenuLogout", function(e) {
        e.preventDefault();
        casLogout();
        closeContextMenu();
    });
    
    
    
    
    
    

    // Mark actual Exp as Favorite
    /*
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
    */

    // Open QR Code Reader and using callback values by scanning a QR Code Button
    /*
    $.mobile.document.on("touchend mouseup", "#contextMenuQrButton", function(e){        
        e.preventDefault();
        // TODO: Aufruf der Scanner Funktion und Auslesen der Rückgabewerte
        closeContextMenu();
    });
    */
    
    
    // Mark actual Exp as Favorite
    /*
    $.mobile.document.on("touchend mouseup", "#contextMenuImpressumButton", function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#impressumPage');
        closeContextMenu();
    });
    */
    
    // Mark actual Exp as Favorite
    /*
    $.mobile.document.on("touchend mouseup", "#contextMenuContactButton", function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#contactPage');
        closeContextMenu();
    });
    */
    