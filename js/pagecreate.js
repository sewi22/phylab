
    // Start Page
    $.mobile.document.on('pagecreate', '#startPage', function(e){
        e.preventDefault();

        $(".ui-toolbar-back-btn").remove();
        $("#startHeadline").html("PhyLab");
        $("#startHeader").append('<div id="expDisplay" class="secondHeader"></div>');
        var startItems = '';
        //startItems += '<div id="" class="startItem"><img src="http://placehold.it/100/4A5C66" /><br/>Vorbereitung</div>';
        //startItems += '<div id="" class="startItem"><img src="http://placehold.it/100/4A5C66" /><br/>Durchführung</div>';
        //startItems += '<div id="" class="startItem"><img src="http://placehold.it/100/4A5C66" /><br/>Nachbereitung</div>';
        //startItems += '<div id="" class="startItem"><img src="http://placehold.it/100/4A5C66" /><br/>LabWrite</div>';
        startItems += '<div id="startItemTopics" class="startItem"><img src="http://placehold.it/100/80BA24" /><br/>Topics</div>';
        startItems += '<div id="startItemQuiz" class="startItem"><img src="http://placehold.it/100/80BA24" /><br/>Quiz</div>';
        startItems += '<div id="startItemTools" class="startItem"><img src="http://placehold.it/100/80BA24" /><br/>Tools</div>';
        startItems += '<div id="startItemScanner" class="startItem"><img src="http://placehold.it/100/80BA24" /><br/>Scanner</div>';
        //startItems += '<div id="startItemSettings" class="startItem"><img src="http://placehold.it/100/80BA24" /><br/>Einstellungen</div>';
        startItems += '<div id="startItemContact" class="startItem"><img src="http://placehold.it/100/80BA24" /><br/>Kontakt</div>';
        startItems += '<div id="startItemImpressum" class="startItem"><img src="http://placehold.it/100/80BA24" /><br/>Impressum</div>';
        $("#startContent").addClass("center");
        $("#startContent").append(startItems);
        
        //addExpFooterNavbar(e.target.id);
        //addExpPageContextMenuButton(e.target.id);
    });
    
    $.mobile.document.on('pagecreate', '#quizPage', function(e){
        e.preventDefault();
        //addExpFooterNavbar(e.target.id);
        //addExpPageContextMenuButton(e.target.id);
    });
    
    $.mobile.document.on('pagecreate', '#toolsListPage', function(e) {
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
        $("#toolsListHeadline").html("Werkzeuge");
        //$("#toolsListContent").append("Werkzeuge");
    });
    
    $.mobile.document.on('pagecreate', '#toolPage', function(e) {
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
    });
    
    $.mobile.document.on('pagecreate', '#settingsPage', function(e) {
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
        $("#settingsHeadline").html("Einstellungen");
        $("#settingsContent").append("Einstellungen");
    });
    
    $.mobile.document.on('pagecreate', '#contactPage', function(e) {
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
        $("#contactHeadline").html("Kontakt");
        var contactform = '';
        contactform += '<form id="contactform" action="'+apidomain+'/sendmail" method="post">';
        contactform += '<select name="recipient" id="recipient">';
        contactform += '<option value="dev">An Entwickler</option>';
        contactform += '<option value="doz">An Dozent</option>';
        contactform += '</select>';

        contactform += '<input type="text" id="name" placeholder="Ihr Name [optional]" />';
        contactform += '<input type="email" id="email" placeholder="Ihre Email [optional]" />';
        contactform += '<input name="subject" id="subject" placeholder="Betreff [optional]" />';
        contactform += '<textarea name="text" id="message" placeholder="Ihre Nachricht" required ></textarea>';
        contactform += '<input type="submit" id="submit" value="Absenden"/>';
        contactform += '</form>';
        $("#contactContent").append(contactform);
        $("#contactContent").enhanceWithin();

        $("#contactform").submit(function(){

            if($("#message").val().length >= 10){
                $.ajax({
                    type: "POST",
                    url: apidomain+"/sendmail",
                    data: "recipient=" + $("#recipient").val() + "&name=" + $("#name").val() + "&email=" + $("#email").val() + "&subject=" + $("#subject").val() + "&message=" + $("#message").val(),
                    success: function(msg){
                        $("#submit").button("disable");
                        $("#recipient").val('');
                        $("#name").val('');
                        $("#email").val('');
                        $("#subject").val('');
                        $("#message").val('');

                        okDialog(msg, function(){});
                    },
                    error: function(err){
                        okDialog(err, function(){});
                    }
                });
            } else {
                okDialog("Die Nachricht ist zu kurz", function(){});
            }

            return false;
        });

    });
    
    // Add Navbar Footer to expListFavPage
    $.mobile.document.on('pagecreate', '#impressumPage', function(e) {
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
        $("#impressumHeadline").html("Impressum");
        $("#impressumContent").append("Sebastian Winterling<br/>swinterling@gmail.com");
    });
    


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
    
    
    // PDF Page    
    $.mobile.document.on('pagecreate', '#pdfPage', function(e){        
        e.preventDefault();                
        $("#pdfContent").removeClass("ui-content");
        $("#pdfContent").addClass("no-padding");    
        addExpFooterNavbar(e.target.id);
        addExpPageContextMenuButton(e.target.id);        
    });
        
    
    $.mobile.document.on('pagecreate', '#detailsPage', function(e){        
        e.preventDefault();
        addExpFooterNavbar(e.target.id);
        addExpPageContextMenuButton(e.target.id);
        fillDetailsContextMenu();
    });
    

    
    $.mobile.document.on('pagecreate', '#topicsListPage', function(e){        
        e.preventDefault();
        
        $("#topicsListHeader").append('<a href="#" id="addTopicButton" data-role="button" data-icon="plus" class="ui-btn-right">Add</a>');
        $("#topicsListHeader").enhanceWithin();
        
        $('#topicsList').delegate("li a", "touchstart mouseup", function (){            
            sessionStorage.setItem("topicId", $(this).jqmData('topicid'));
        });
        
        //addExpFooterNavbar(e.target.id);
        //addExpPageContextMenuButton(e.target.id);
                        
    });
    
    
    $.mobile.document.on('pagecreate', '#topicPage', function(e){
        e.preventDefault();
        //$("#topicHeader").append('<a href="#" id="addPostButton" data-role="button" data-icon="plus" class="ui-btn-right">Add</a>');
        //$("#topicHeader").enhanceWithin();
    });

    /*
    // Create ExpLists (All and Fav)
    $.mobile.document.on('pagecreate', '.expListPage', function(e) {                        
        e.preventDefault();        
        $('.expList').delegate("li a", "touchstart mouseup", function (){
            localStorage.setItem("expGroupNumber", $(this).jqmData('expgroupnumber'));
            localStorage.setItem("expNumber", $(this).jqmData('expnumber'));
            getExp(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"), function(result){
                localStorage.setItem("expId", result.id);
            });
        });
    });
    */
    
    // Add Navbar Footer to expListAllPage
    $.mobile.document.on('pagecreate', '#expListAllPage', function(e) {        
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //fillExpListContextMenu();
        $("#expListAllHeadline").html("PhyLab");
        $("#expListAllHeader").append('<div class="secondHeader">Bitte wählen Sie einen Versuch aus.</div>')
        
        getExpGroups(function (expGroups){
            var html = '';
            for(var i=0; i<expGroups.length; i++) {
                (function(i){
                    var expGroup = expGroups.item(i);
                    html += '<div data-role="collapsible"><h3>'+ expGroup.expGroupName + '</h3><ul id="list'+expGroup.expGroupNumber+'" class="expList" data-role="listview">';
                    getAllExpFromGroup(expGroup.expGroupNumber, function (res){
                        for(var e=0; e<res.length; e++){
                        (function(e){
                            var exp = res.item(e);
                            var li = "";
                            if(exp.expIsActive == 1){
                                $('#list'+expGroup.expGroupNumber).append('<li data-icon="false"><a href="#" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');
                                //li += '<li><a href="#detailsPage" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>';
                            } else {
                                $('#list'+expGroup.expGroupNumber).append('<li>'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>');
                                //li += '<li>'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>';
                            }
                        })(e);
                        }
                        if(i == expGroups.length-1){
                            $('ul[data-role=listview]').listview('refresh');
                            // Wechsel zu Experimentliste ALT
                            //$(':mobile-pagecontainer').pagecontainer('change', '#expListAllPage', {});
                        }
                    });
                    html += '</ul></div>';
                })(i);
            }
            $('#expListAll').append(html).enhanceWithin();
            
            $("#expListAll").delegate("li a", "touchstart mouseup", function (){
            localStorage.setItem("expGroupNumber", $(this).jqmData('expgroupnumber'));
            localStorage.setItem("expNumber", $(this).jqmData('expnumber'));
            getExp(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"), function(result){
                localStorage.setItem("expId", result.id);                
            });
            $(':mobile-pagecontainer').pagecontainer('change', '#startPage');
        });            
        });               
        
    });
    
    /*
    // Add Navbar Footer to expListFavPage
    $.mobile.document.on('pagecreate', '#expListFavPage', function(e) {
        e.preventDefault();
        addExpListFooterNavbar(e.target.id);
        addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
    });
    */
    
    