    
    // DetailsPage
    $.mobile.document.on('pagebeforeshow', '#expDetailsPage', function(e){
        e.preventDefault();
        var expGroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");

        getExp(expGroupNumber, expNumber, function(result){
            var headline = result.expGroupNumber+"."+result.expNumber;
            $("#expDetailsHeadline").html(headline);
            $("#expDetailsContent").html(result.expName);
        });
    });
    
    
    $.mobile.document.on('pagecreate', '#expDetailsPage', function(e){
        e.preventDefault();
        addExpFooterNavbar(e.target.id);
        addExpPageContextMenuButton(e.target.id);
        fillExpDetailsContextMenu();
    });
    
    $.mobile.document.on('pagecreate', '#quizPage', function(e){
        e.preventDefault();
        addExpFooterNavbar(e.target.id);
        addExpPageContextMenuButton(e.target.id);        
    });
    
    $.mobile.document.on('pagecreate', '#faqPage', function(e){
        e.preventDefault();
        addExpFooterNavbar(e.target.id);
        addExpPageContextMenuButton(e.target.id);
   
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('Logged in.');
                console.log(response);
                var uid = response.authResponse.userID;
                console.log(uid);
                var accessToken = response.authResponse.accessToken;
                console.log(accessToken);
                FB.api('/113124472034820', function(response) {
                    console.log(response);
                });
            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook,
                // but has not authenticated your app
            } else {
                console.log("not logged in");
                FB.login();
            }
        });
        
        FB.api('/me', function(user){
            console.log("user");
            console.log(user);
            //console.log("Welcome " + response.name + ": Your UID is " + response.id);
        });
        
        //$('#faqContent').append('<div class="fb-like" data-send="true" data-width="450" data-show-faces="true"></div>');
    });
    
    $.mobile.document.on('pagebeforeshow', '#faqPage', function(e){
        e.preventDefault();
        //facebookConnectPlugin.login(Array strings of permissions, Function success, Function failure)
        
    });
    
    // Create ExpLists (All and Fav)
    $.mobile.document.on('pagecreate', '.expListPage', function(e) {
        e.preventDefault();
        $(".ui-toolbar-back-btn").remove();
        $('.expList').delegate("li a", "touchstart mouseup", function (){
            localStorage.setItem("expGroupNumber", $(this).jqmData('expgroupnumber'));
            localStorage.setItem("expNumber", $(this).jqmData('expnumber'));
        });
    });
    
    // Add Navbar Footer to expListAllPage
    $.mobile.document.on('pagecreate', '#expListAllPage', function(e) {
        e.preventDefault();
        addExpListFooterNavbar(e.target.id);
        addExpListContextMenuButton(e.target.id);
        fillExpListContextMenu();
    });
    
    // Add Navbar Footer to expListFavPage
    $.mobile.document.on('pagecreate', '#expListFavPage', function(e) {
        e.preventDefault();
        addExpListFooterNavbar(e.target.id);
        addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
    });
    // Aktualisierung der Favoritenliste
    $.mobile.document.on('pagebeforeshow', '#expListFavPage', function(e) {
        e.preventDefault();        
        $('#expListFav').empty();
        getFavExp(function (res){
            if(res.length != 0){
                for(var e=0; e<res.length; e++){
                    var exp = res.item(e);
                    if(exp.expIsActive == 1){
                        $('#expListFav').append('<li><a href="#expDetailsPage" data-expGroupNumber="'+exp.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ exp.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');
                    } else {
                        $('#expListFav').append('<li>'+ exp.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>');
                    }
                }
                $('#expListFav').listview('refresh');
            } else {
                $('#expListFav').append('<li>Es wurden noch keine Versuche als Favorit gespeichert.</li>');
                $('#expListFav').listview('refresh');
            }
        });
    });
    