
    $.mobile.document.on('pagecreate', '#topicsListPage', function(e){
        e.preventDefault();

        $("#topicsListHeader").append('<a href="#" id="addTopicButton" data-role="button" data-icon="plus" class="ui-btn-right">Add</a>');
        $("#topicsListHeader").enhanceWithin();

        $('#topicsList').delegate("li a", "touchstart mouseup", function (){
            sessionStorage.setItem("topicId", $(this).jqmData('topicid'));
        });
    });
       
    $.mobile.document.on('pagebeforeshow', '#topicsListPage', function(e){
        e.preventDefault();
        getAllTopics(localStorage.expId);
        checkUserLogin();
    });




    $.mobile.document.on('pagecreate', '#topicPage', function(e){
        e.preventDefault();
    });
    
    $.mobile.document.on('pagebeforeshow', '#topicPage', function(e){
        e.preventDefault();
        $("#topicContent").empty();        
        var userID = (localStorage.username) ? localStorage.username : '';
        checkConnection();        
        getTopic(sessionStorage.topicId, function(topic){
            $("#topicContent").append('<a href="#" id="addPostButton" data-topicId="'+sessionStorage.topicId+'" data-role="button">Add Post</a>');            
            if(userID == topic.author){
                $("#topicContent").append('<a href="#" id="editTopicButton" data-topicId="'+sessionStorage.topicId+'" data-role="button">Edit Topic</a>');
                $("#topicContent").append('<a href="#" id="deleteTopicButton" data-topicId="'+sessionStorage.topicId+'" data-role="button">Delete Topic</a>');
            }
            $("#topicContent").enhanceWithin();
            getAllPosts(sessionStorage.topicId);
            checkUserLogin();
        });
    });
    
    
    
    
    $.mobile.document.on('pagecreate', '#topicFormPage', function(e){
        e.preventDefault();
    });
    
    $.mobile.document.on('pagebeforeshow', '#topicFormPage', function(e){
        e.preventDefault();
        checkUserLogin();
        //if(!localStorage.username){
            //sessionStorage.setItem("afterLoginPage", "#topicFormPage");
            //casLogin({
              //  $(':mobile-pagecontainer').pagecontainer('change', sessionStorage.afterLoginPage);       
            //});
            //$(':mobile-pagecontainer').pagecontainer('change', '#loginLogoutPage');
        //} else {
            var userID = localStorage.username;            
            $("#topicFormContent").empty();
            $.mobile.document.off("click", "#submit");

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
                                
                var topicIsActive = 1;
                var postIsActive = 1;
                $.mobile.document.on("click", "#submit", function(e){
                    e.preventDefault();
                    createNewTopic($("#subject").val(), localStorage.expId, $("#post").val(), topicIsActive, postIsActive);
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
                    var topicIsActive = 1;
                    $.mobile.document.on("click", "#submit", function(e){
                        e.preventDefault();
                        editTopic(topicId, $("#subject").val(), localStorage.username, localStorage.expId, topicIsActive);
                    });
                });

            // ADD POST
            } else if (sessionStorage.add == "post"){
                sessionStorage.removeItem("add");
                sessionStorage.removeItem("edit");
                var topicId = sessionStorage.topicId;
                $("#topicFormContent").append(postform);
                $("#topicFormContent").enhanceWithin();

                $.mobile.document.on("click", "#submit", function(e){
                    e.preventDefault();
                    var topicId = sessionStorage.topicId;
                    var postText = $("#post").val();                           
                    var postIsActive = 1;

                    createNewPost(topicId, postText, postIsActive);
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
                    var postIsActive = 1;

                    $.mobile.document.on("click", "#submit", function(e){
                        e.preventDefault();
                        editPost(postId, $("#post").val(), localStorage.username, postIsActive);
                    });
                });
            }
        //}
    });
    
    
    // BUTTON CLICK EVENTS
    $.mobile.document.on('click', '#addTopicButton', function(e){
        e.preventDefault();
        sessionStorage.setItem("add", "topic");
        //sessionStorage.setItem("afterLoginPage", "#topicFormPage");
        if(localStorage.username && localStorage.apiKey){
            $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage');    
        } else {
            casLogin(function(){
                $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage');                
            });
        }        
    });

    $.mobile.document.on('click', '#addPostButton', function(e){
        e.preventDefault();
        sessionStorage.setItem("add", "post");
        sessionStorage.setItem("topicId", e.target.dataset.topicid);
        $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage');
    });

    $.mobile.document.on('click', '#editTopicButton', function(e){
        e.preventDefault();
        sessionStorage.setItem("edit", "topic");
        sessionStorage.setItem("topicId", e.target.dataset.topicid);
        $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage');
    });

    $.mobile.document.on('click', '#editPostButton', function(e){
        e.preventDefault();
        sessionStorage.setItem("edit", "post");
        sessionStorage.setItem("postId", e.target.dataset.postid);
        $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage');
    });

    $.mobile.document.on('click', '#deleteTopicButton', function(e){
        e.preventDefault();        
        deleteTopic(e.target.dataset.topicid, localStorage.username);
    });

    $.mobile.document.on('click', '#deletePostButton', function(e){
        e.preventDefault();
        deletePost(e.target.dataset.postid, localStorage.username);
    });
    