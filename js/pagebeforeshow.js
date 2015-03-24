    
    $.mobile.document.on('pagebeforeshow', '#startPage', function(e){
        e.preventDefault();        
        if (!localStorage["expGroupNumber"] || !localStorage["expNumber"]) {
            $('#expDisplay').html("Aktueller Versuch: keiner");
        } else {
            getExp(localStorage.expGroupNumber, localStorage.expNumber, function(result){                
                $('#expDisplay').html("Aktueller Versuch: "+localStorage.expGroupNumber+"."+localStorage.expNumber+" "+result.expName);    
            });                
        }        
    });
    
    // Topics List Page
    $.mobile.document.on('pagebeforeshow', '#topicsListPage', function(e){
        e.preventDefault();
        //facebookConnectPlugin.login(Array strings of permissions, Function success, Function failure)
        getAllTopics(localStorage.expId);
    });

    // Topic Page
    $.mobile.document.on('pagebeforeshow', '#topicPage', function(e){
        e.preventDefault();
        $("#topicContent").empty();
        $("#topicContent").append('<a href="#" id="addPostButton" data-topicId="'+sessionStorage.topicId+'" data-role="button">Add Post</a>');
        $("#topicContent").append('<a href="#" id="editTopicButton" data-topicId="'+sessionStorage.topicId+'" data-role="button">Edit Topic</a>');
        $("#topicContent").append('<a href="#" id="deleteTopicButton" data-topicId="'+sessionStorage.topicId+'" data-role="button">Delete Topic</a>');
        $("#topicContent").enhanceWithin();
        getAllPosts(sessionStorage.topicId);

    });
    
    $.mobile.document.on('pagebeforeshow', '#loginLogoutPage', function(e){
        e.preventDefault();
        $("#loginLogoutContent").empty();
        
        if(getLoginStatus()){            
            $("#loginLogoutContent").append('<a href="#" id="logoutButton" data-role="button">Logout</a>');                                    
        } else {            
            $("#loginLogoutContent").append('<a href="#" id="fbLoginButton" data-role="button">Login Facebook</a>');
            $("#loginLogoutContent").append('<a href="#" id="casLoginButton" data-role="button">Login THM CAS</a>');
        }
        $("#loginLogoutContent").enhanceWithin();
    });

    $.mobile.document.on('pagebeforeshow', '#topicFormPage', function(e){
        e.preventDefault();
                
        if(!getLoginStatus()){
            console.log("kein Login");
            sessionStorage.setItem("afterLoginPage", "#topicFormPage");
            $(':mobile-pagecontainer').pagecontainer('change', '#loginLogoutPage');
        } else {            
        
        $("#topicFormContent").empty();                            
        $.mobile.document.off("touchend click", "#submit");
        
        var topicform = '';        
            topicform += '<form id="topicform">';
            topicform += '<input name="subject" id="subject" placeholder="Titel" required />';
            topicform += '<textarea name="post" id="post" placeholder="Ihre Nachricht" required ></textarea>';
            topicform += '<input type="submit" id="submit" value="Absenden"/>';
            topicform += '</form>';
        
        var postform = '';
            postform += '<form id="postform">';
            postform += '<textarea name="post" id="post" placeholder="Ihre Nachricht" required ></textarea>';
            postform += '<input type="submit" id="submit" value="Absenden"/>';
            postform += '</form>';
        
            
        // ADD TOPIC
        if(sessionStorage.add == "topic"){
            sessionStorage.removeItem("add");
            sessionStorage.removeItem("edit");
            $("#topicFormContent").append(topicform);
            $("#topicFormContent").enhanceWithin();
                    
            var authorId = "100005659840028";
            var authorType = "fb";
            var topicIsActive = 1;
            var postIsActive = 1;
            $.mobile.document.on("touchend click", "#submit", function(e){
                e.preventDefault();                
                createNewTopic($("#subject").val(), localStorage.expId, authorId, authorType, $("#post").val(), topicIsActive, postIsActive);
            });
            
        // EDIT TOPIC                
        } else if (sessionStorage.edit == "topic"){
            sessionStorage.removeItem("add");
            sessionStorage.removeItem("edit");
            $("#topicFormContent").append(topicform);
            $("#post").remove();            
            $("#topicFormContent").enhanceWithin();
            
            var topicId = sessionStorage.topicId;            
                        
            getTopic(topicId, function(r){                            
                $("#subject").val(r.topicTitle);

                var authorId = "4";
                var authorType = "fb";
                var topicIsActive = 1;

                $.mobile.document.on("touchend click", "#submit", function(e){
                    e.preventDefault();
                    editTopic(topicId, $("#subject").val(), localStorage.expId, authorId, authorType, topicIsActive);
                });        
            });
            
        // ADD POST
        } else if (sessionStorage.add == "post"){
            sessionStorage.removeItem("add"); 
            sessionStorage.removeItem("edit");
            var topicId = sessionStorage.topicId;
            $("#topicFormContent").append(postform);
            $("#topicFormContent").enhanceWithin();        
         
            $.mobile.document.on("touchend click", "#submit", function(e){
                e.preventDefault();
                var topicId = sessionStorage.topicId;
                var postText = $("#post").val();
                var authorId = "4";
                var authorType = "fb";
                var postIsActive = 1;
                
                createNewPost(topicId, postText, authorId, authorType, postIsActive);
            });
            
        // EDIT POST
        } else if (sessionStorage.edit == "post"){
            sessionStorage.removeItem("add");
            sessionStorage.removeItem("edit");
            var postId = sessionStorage.postId;
            $("#topicFormContent").append(postform);
            $("#topicFormContent").enhanceWithin();
            
            getPost(postId, function(r){                
                $("#post").val(r.postText);

                var authorId = "4";
                var authorType = "fb";                
                var postIsActive = 1;

                $.mobile.document.on("touchend click", "#submit", function(e){                    
                    e.preventDefault();
                    editPost(postId, $("#post").val(), authorId, authorType, postIsActive);
                });
            });
        }  
        }
    });
    
    // pagebeforeshow #quizPage in quiz.js
    
    $.mobile.document.on('pagebeforeshow', '#toolsListPage', function(e){
        e.preventDefault();
        $('#toolsList').empty();
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
    
    $.mobile.document.on('pagebeforeshow', '#toolPage', function(e, data){
        e.preventDefault();                
        toolId = sessionStorage.toolId;
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
    
    $.mobile.document.on('pagebeforeshow', '#settingsPage', function(e){
        e.preventDefault();

    });
    
    $.mobile.document.on('pagebeforeshow', '#contactPage', function(e){
        e.preventDefault();

    });
        
    $.mobile.document.on('pagebeforeshow', '#impressumPage', function(e){
        e.preventDefault();
    });
    
 
 
    

    /**********************************************************************************************************************************
     **********************************************************************************************************************************
     **********************************************************************************************************************************/


 
 
    
    // DetailsPage
    $.mobile.document.on('pagebeforeshow', '#detailsPage', function(e){
        e.preventDefault();
        var expGroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");

        getExp(expGroupNumber, expNumber, function(result){
            var headline = result.expGroupNumber+"."+result.expNumber;
            $("#detailsHeadline").html(headline);
            $("#detailsContent").html(result.expName);
        });
    });
    
    

    
    
    // PDF Page
    $.mobile.document.on('pagebeforeshow', '#pdfPage', function(e){
        e.preventDefault();
        var w = $(window).width();
        var h = $(window).height();
        reloadPdfFrame(h,w);         
    });
    
   
    // Favoritenliste
    $.mobile.document.on('pagebeforeshow', '#expListFavPage', function(e) {
        e.preventDefault();        
        $('#expListFav').empty();
        getFavExp(function (res){
            if(res.length != 0){
                for(var e=0; e<res.length; e++){
                    var exp = res.item(e);
                    if(exp.expIsActive == 1){
                        $('#expListFav').append('<li><a href="#detailsPage" data-expGroupNumber="'+exp.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ exp.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');
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
   