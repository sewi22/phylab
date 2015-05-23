    
    function createNewTopic(topicTitleVal, expIdVal, postTextVal, topicIsActiveVal, postIsActiveVal, timeoutVal){        
        if(checkConnection()){
        $.mobile.loading("show", {text: "Neues Thema wird angelegt.", textVisible: true});
        $("#submitTopicButton").button("disable");        
        $.ajax({
            type: "POST",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);
            },
            url: apidomain+"/topics",
            data:{
                 topicTitle: topicTitleVal,
                 expId: expIdVal,
                 isActive: topicIsActiveVal,
                 postText: postTextVal,
                 postIsActive: postIsActiveVal    
            },            
            success: function(msg){
                sessionStorage.setItem("topicId", msg.topicId);
                $.mobile.loading("hide");
                $("#submitTopicButton").button("enable");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage', {changeHash:false});                    
            },
            error: function(err){               
                $.mobile.loading("hide");
                $("#submitTopicButton").button("enable");
                if (timeoutVal <= 2000){
                    createNewTopic(topicTitleVal, expIdVal, postTextVal, topicIsActiveVal, postIsActiveVal, timeoutVal+2000);                       
                } else {                                                    
                    navigator.notification.confirm("Das Thema konnte nicht gespeichert werden.\nWollen Sie es noch einmal versuchen?", function(buttonIndex){
                        switch(buttonIndex){
                            case 1:
                            createNewTopic(topicTitleVal, expIdVal, postTextVal, topicIsActiveVal, postIsActiveVal, timeoutVal+2000);                        
                            break;
                        }                
                    }, 'Fehler', ['Ja','Nein']);
                }                                            
            },
            timeout:timeoutVal
        });
        } else {                    
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');    
        }
    }
    
    function editTopic(topicIdVal, topicTitleVal, usernameVal, expIdVal, isActiveVal, timeoutVal){        
        if(checkConnection()){
        $.mobile.loading("show", {text: "Thema wird bearbeitet.", textVisible: true});
        $("#submitTopicButton").button("disable");
        $.ajax({
            type: "PUT",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);
            },
            url: apidomain+"/topics/"+topicIdVal,
            data: {
                topicTitle: topicTitleVal,
                username: usernameVal,
                expId: expIdVal,
                isActive: isActiveVal  
            },
            success: function(msg){                
                $.mobile.loading("hide");
                $("#submitTopicButton").button("enable");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage', {changeHash:false});
            },
            error: function(err){                
                $.mobile.loading("hide");
                $("#submitTopicButton").button("enable");
                if (timeoutVal <= 2000){
                    editTopic(topicIdVal, topicTitleVal, usernameVal, expIdVal, isActiveVal, timeoutVal+2000);
                } else {                                    
                    navigator.notification.confirm("Die Änderung konnte nicht gespeichert werden.\nWollen Sie es noch einmal versuchen?", function(buttonIndex){
                        switch(buttonIndex){
                            case 1:
                            editTopic(topicIdVal, topicTitleVal, usernameVal, expIdVal, isActiveVal, timeoutVal+2000);
                            break;
                        }
                    }, 'Fehler', ['Ja','Nein']);
                }                
            },
            timeout:timeoutVal
        });
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');    
        }   
    }        

    function deleteTopic(topicIdVal, usernameVal, timeoutVal){
        navigator.notification.confirm("Soll dieses Thema und alle enthaltenen Beiträge gelöscht werden?", function(buttonIndex){
            confirmDeleteTopic(buttonIndex, topicIdVal, usernameVal, timeoutVal);
        }, 'Thema löschen', ['Ja','Nein']);                    
    }
    
    function confirmDeleteTopic(buttonindex, topicIdVal, usernameVal, timeoutVal){        
        switch(buttonindex){
            case 1:                    
            if(checkConnection()){            
            $.mobile.loading("show", {text: "Thema wird gelöscht.", textVisible: true});
            $.ajax({            
                type: "DELETE",
                beforeSend: function (request){
                    request.setRequestHeader("Authorization", localStorage.apiKey);
                },
                url: apidomain+"/topics/"+topicIdVal,
                data: {
                     username: usernameVal                    
                },
                success: function(msg){                    
                    $.mobile.loading("hide");
                    $(':mobile-pagecontainer').pagecontainer('change', '#topicsListPage', {changeHash:false});                    
                    navigator.notification.alert('Dieses Thema wurde erfolgreich gelöscht', null, 'Thema löschen', 'OK');
                },
                error: function(err){                    
                    $.mobile.loading("hide");
                    if (timeoutVal <= 2000){
                        confirmDeleteTopic(buttonindex, topicIdVal, usernameVal, timeoutVal+2000);
                    } else {                    
                        //navigator.notification.confirm("Dieses Thema konnte nicht gelöscht werden.\nWollen Sie es noch einmal versuchen?", function(buttonIndex){
                            //switch(buttonIndex){
                                //case 1:
                                confirmDeleteTopic(buttonindex, topicIdVal, usernameVal, timeoutVal+2000);
                                //break;
                            //}
                        //}, 'Fehler', ['Ja','Nein']);
                    }                    
                },
                timeout:timeoutVal
            });
            } else {
                navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');    
            }
            break;
        }
    }    
               
        
    function createNewPost(topicIdVal, postTextVal, isActiveVal, timeoutVal){
        if(checkConnection()){
        $.mobile.loading("show", {text: "Neuer Beitrag wird angelegt.", textVisible: true});        
        $("#submitPostButton").button("disable");
        $.ajax({
            type: "POST",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);                              
            },
            url: apidomain+"/posts",            
            data: {
                topicId: topicIdVal,
                postText: postTextVal,
                isActive: isActiveVal   
            },      
            success: function(p){
                sessionStorage.setItem("topicId", topicIdVal);
                $.mobile.loading("hide");
                $("#submitPostButton").button("enable");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage', {changeHash:false});
            },
            error: function(err){                                
                $.mobile.loading("hide");
                $("#submitPostButton").button("enable");
                if (timeoutVal <= 2000){
                    createNewPost(topicIdVal, postTextVal, isActiveVal, timeoutVal+2000);
                } else {                
                    navigator.notification.confirm("Dieser Beitrag konnte nicht gespeichert werden.\nWollen Sie es noch einmal versuchen?", function(buttonIndex){
                        switch(buttonIndex){
                            case 1:
                            createNewPost(topicIdVal, postTextVal, isActiveVal, timeoutVal+2000);
                            break;
                        }
                    }, 'Fehler', ['Ja','Nein']);
                }                
            },
            timeout:timeoutVal
        });
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');    
        }    
    }
    
    function editPost(postIdVal, postTextVal, usernameVal, isActiveVal, timeoutVal){        
        if(checkConnection()){        
        $.mobile.loading("show", {text: "Beitrag wird bearbeitet.", textVisible: true});
        $("#submitPostButton").button("disable");
        $.ajax({
            type: "PUT",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);
            },
            url: apidomain+"/posts/"+postIdVal,            
            data: {
                postText:postTextVal,
                username:usernameVal,
                isActive:isActiveVal  
            },
            success: function(p){
                $.mobile.loading("hide");
                $("#submitPostButton").button("enable");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage', {changeHash:false});
            },
            error: function(err){                
                $.mobile.loading("hide");
                $("#submitPostButton").button("enable");
                if (timeoutVal <= 2000){
                    editPost(postIdVal, postTextVal, usernameVal, isActiveVal, timeoutVal+2000);
                } else {                
                    navigator.notification.confirm("Dieser Beitrag konnte nicht geändert werden.\nWollen Sie es noch einmal versuchen?", function(buttonIndex){
                        switch(buttonIndex){
                            case 1:
                            editPost(postIdVal, postTextVal, usernameVal, isActiveVal, timeoutVal+2000);
                            break;
                        }
                    }, 'Fehler', ['Ja','Nein']);
                }                                
            },
            timeout:timeoutVal
        });
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');    
        }
    }
    
    function deletePost(deleteButton, postId, username, timeoutVal){                           
        navigator.notification.confirm("Soll dieser Beitrag gelöscht werden?", function(buttonIndex){
            confirmDeletePost(buttonIndex, postId, deleteButton, username, timeoutVal);
        }, 'Beitrag löschen', ['Ja','Nein']);                                        
    }
    
    
    function confirmDeletePost(buttonindex, postIdVal, deleteButton, usernameVal, timeoutVal){                
        if(buttonindex === 1){            
            if(checkConnection()){
            $.mobile.loading("show", {text: "Beitrag wird gelöscht.", textVisible: true});                       
            $.ajax({
                type: "DELETE",
                beforeSend: function (request){
                    request.setRequestHeader("Authorization", localStorage.apiKey);
                },
                url: apidomain+"/posts/"+postIdVal,                
                data: {
                    username: usernameVal
                },
                success: function(p){
                    $.mobile.loading("hide");                    
                    var postCount = $("#topicContent")[0].children.length;                                              
                    if(postCount == 1){                                            
                        $(':mobile-pagecontainer').pagecontainer('change', '#topicsListPage', {changeHash:false});   
                    } else {
                        console.log(deleteButton);                                                    
                        $(deleteButton).closest('li').slideUp(400, function() {                
                            $(this).remove();
                        });
                        /*
                        var postItems = $("#topicContent")[0].children;
                        for(i=0; i<postItems.length; i++){                                
                            if(postIdVal == postItems[i].children[0].dataset.postid){
                                $(postItems[i]).slideUp(400, function() {
                                    // Child Element löschen
                                    $(postItems[i]).removeChild();                                    
                                });      
                            }
                        }*/                       
                    }               
                },
                error: function(err){                    
                    $.mobile.loading("hide");
                    if (timeoutVal <= 2000){
                        confirmDeletePost(buttonindex, postIdVal, usernameVal, timeoutVal+2000);
                    } else {                    
                        navigator.notification.confirm("Dieser Beitrag konnte nicht gelöscht werden.\nWollen Sie es noch einmal versuchen?", function(buttonIndex){
                            switch(buttonIndex){
                                case 1:
                                confirmDeletePost(buttonindex, postIdVal, usernameVal, timeoutVal+2000);
                                break;
                            }
                        }, 'Fehler', ['Ja','Nein']);
                    }                    
                },
                timeout:timeoutVal
            });
            } else {
                navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');    
            }
        }    
    }
                                     
    
    function getTopic(topicIdVal, callback, timeoutVal){
        if(checkConnection()){    
        $.mobile.loading("show", {text: "Thema wird geladen.", textVisible: true});
        $.ajax({
            type: 'GET',
            url: apidomain+"/topics/"+topicIdVal,
            dataType: "json",
            success: function(result) {
                $.mobile.loading("hide");
                callback(result);             
            },
            error: function(err){                
                $.mobile.loading("hide");
                if (timeoutVal <= 2000){
                        getTopic(topicIdVal, callback, timeoutVal+2000);
                } else {                
                    navigator.notification.confirm("Fehler beim Laden des Themas.\nWollen Sie es noch einmal versuchen?", function(buttonIndex){
                        switch(buttonIndex){
                            case 1:
                            getTopic(topicIdVal, callback, timeoutVal+2000);
                            break;
                        }
                    }, 'Fehler', ['Ja','Nein']);
                }                         
            },
            timeout:timeoutVal
        });
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');    
        }
    }
    
    function getPost(postId, callback, timeoutVal){
        if(checkConnection()){        
        $.mobile.loading("show", {text: "Beitrag wird geladen.", textVisible: true});
        $.ajax({
            type: 'GET',
            url: apidomain+"/posts/"+postId,
            dataType: "json",
            success: function(result) {
                $.mobile.loading("hide");
                callback(result);
            },
            error: function(err){
                $.mobile.loading("hide");
                if (timeoutVal <= 2000){
                    getPost(postId, callback, timeoutVal+2000);
                } else {                
                    navigator.notification.confirm("Fehler beim Laden des Beitrags.\nWollen Sie es noch einmal versuchen?", function(buttonIndex){
                        switch(buttonIndex){
                            case 1:
                            getPost(postId, callback, timeoutVal+2000);
                            break;
                        }
                    }, 'Fehler', ['Ja','Nein']);
                }                
            },
            timeout:timeoutVal
        });
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');    
        }
    }
    
    
    function getAllTopics(expId, timeoutVal){
        if(checkConnection()){        
        $.mobile.loading("show", {text: "Themen werden geladen.", textVisible: true});
        $.ajax({
            type: 'GET',
            url: apidomain+"/exptopics/"+expId,
            dataType: "json",
            success: function(result) {            
                $("#topicsList").empty();
                var topics = '';
                if(result.topics.length == 0){
                    topics += '<li>Für diesen Versuch wurde noch kein Thema erstellt.</li>';                     
                } else {
                    for(var i=0;i<result.topics.length;i++){
                        (function(i){
                            var expTopic = result.topics[i];
                            topics += '<li><a href="#topicPage" data-topicId="'+expTopic.id+'">'+ expTopic.topicTitle + '</a></li>';
                        })(i);
                    }    
                }                
                $('#topicsList').append(topics);
                $('#topicsList').listview('refresh');
                $.mobile.loading("hide");
            },
            error: function(err){
                $.mobile.loading("hide");
                if (timeoutVal <= 2000){
                    getAllTopics(expId, timeoutVal+2000);
                } else {                
                    navigator.notification.confirm("Fehler beim Laden der Themen.\nWollen Sie es noch einmal versuchen?", function(buttonIndex){
                        switch(buttonIndex){
                            case 1:
                            getAllTopics(expId, timeoutVal+2000);
                            break;
                        }
                    }, 'Fehler', ['Ja','Nein']);
                }                
            },
            timeout:timeoutVal                                                                                             
        });
        } else {            
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');    
        }        
    }
    
    function getAllPosts(topicId, timeoutVal){            
        if(checkConnection()){        
        $.mobile.loading("show", {text: "Beiträge werden geladen.", textVisible: true});
        $.ajax({
            type: 'GET',
            url: apidomain+"/topicposts/"+topicId,
            dataType: "json",
            success: function(result) {
                for(var i=0;i<result.posts.length;i++){
                    (function(i){
                        var post = result.posts[i];                                                    
                        var timestamp = convertTimestamp(post.created);
                        var postContent = "";                                  
                        if(post.author == localStorage.username){
                            postContent += '<div class="post float-left ui-corner-all ui-shadow">';
                            postContent += '<a href="#" data-postId="'+post.id+'" class="deletePostButton ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all"></a>';
                            postContent += '<a href="#" data-postId="'+post.id+'" class="editPostButton ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all"></a>';
                        } else {
                            postContent += '<div class="post float-right ui-corner-all ui-shadow">';
                        }
                        //postContent += '<img src="http://placehold.it/100/ff0" />';
                        postContent += '<div class=postText>'+post.postText;
                        postContent += '<p class="postFrom">von '+ post.author+ '<br/>am ' + timestamp +' Uhr</p>';
                        postContent += '</div>';
                        postContent += '</div>';
                        $('#topicContent').append(postContent);
                        $('#topicContent').enhanceWithin();                                                            
                        $.mobile.loading("hide");
                    })(i);
                }
            },
            error: function(err){
                $.mobile.loading("hide");
                if (timeoutVal <= 2000){
                    getAllPosts(topicId, timeoutVal+2000);
                } else {                
                    navigator.notification.confirm("Fehler beim Laden der Beiträge.\nWollen Sie es noch einmal versuchen?", function(buttonIndex){
                        switch(buttonIndex){
                            case 1:                        
                            getAllPosts(topicId, timeoutVal+2000);
                            break;
                        }
                    }, 'Fehler', ['Ja','Nein']);
                }                
            },
            timeout:timeoutVal
        });
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');
        }   
    }