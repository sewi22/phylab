    
    function createNewTopic(topicTitle, expId, postText, topicIsActive, postIsActive){        
        $.mobile.loading("show");
        $.ajax({
            type: "POST",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);
            },
            url: apidomain+"/topics",
            data: "topicTitle=" + topicTitle + "&expId=" + expId + "&isActive=" + topicIsActive,
            success: function(msg){
                createNewPost(msg.topicId, postText, postIsActive);                    
            },
            error: function(err){
                //okDialog(err.message, function(){});
                $.mobile.loading("hide");
                navigator.notification.alert(err.message, null, 'Fehler', 'OK');                
            },
            timeout:3000
        });
    }
    
    function editTopic(topicId, topicTitle, username, expId, isActive){
        $.mobile.loading("show");
        $.ajax({
            type: "PUT",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);
            },
            url: apidomain+"/topics/"+topicId,
            data: "topicTitle=" + topicTitle + "&username=" + username + "&expId=" + expId + "&isActive=" + isActive,
            success: function(msg){                
                $.mobile.loading("hide");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){
                //okDialog(err.message, function(){});
                $.mobile.loading("hide");
                navigator.notification.alert(err.message, null, 'Fehler', 'OK');
            },
            timeout:3000
        });   
    }        

    function deleteTopic(topicId, username){
        navigator.notification.confirm("Soll dieses Thema und alle enthaltenen Beitr�ge gel�scht werden?", function(buttonIndex){
            confirmDeleteTopic(buttonIndex, topicId, username);
        }, 'Thema l�schen', ['Ja','Nein']);                    
    }
    
    function confirmDeleteTopic(buttonindex, topicId, username){        
        switch(buttonindex){
            case 1:                    
            $.mobile.loading("show");
            $.ajax({            
                type: "DELETE",
                beforeSend: function (request){
                    request.setRequestHeader("Authorization", localStorage.apiKey);
                },
                url: apidomain+"/topics/"+topicId,
                data: "username=" + username,
                success: function(msg){
                    //deleteAllPosts(topicId);
                    $.mobile.loading("hide");
                    $(':mobile-pagecontainer').pagecontainer('change', '#startPage');
                    //okDialog("Thema wurde erfolgreich gel�scht", function(){});
                    navigator.notification.alert('Das Thema wurde erfolgreich gel�scht', null, 'Thema l�schen', 'OK');
                },
                error: function(err){
                    //okDialog(err.message, function(){});
                    $.mobile.loading("hide");
                    navigator.notification.alert(err.message, null, 'Fehler', 'OK');
                },
                timeout:3000
            });
            break;
        }
    }
            
        
    function createNewPost(topicIdVal, postTextVal, isActiveVal){
        $.mobile.loading("show");
        $.ajax({
            type: "POST",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);                              
            },
            url: apidomain+"/posts",
            //data: "topicId=" + topicId + "&postText=" + postText + "&isActive="+ isActive,
            data: {
                topicId: topicIdVal,
                postText: postTextVal,
                isActive: isActiveVal   
            },
            //contentType: "application/x-www-form-urlencoded",            
            //dataType: "json",        
            success: function(p){
                sessionStorage.setItem("topicId", topicIdVal);
                $.mobile.loading("hide");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){                
                //okDialog("Es wurde keine Nachricht eingetragen.", function(){});
                $.mobile.loading("hide");
                navigator.notification.alert('Der Beitrag konnte nicht gespeichert werden. '+err.message, null, 'Fehler', 'OK');
            },
            timeout:3000
        });    
    }
    
    function editPost(postIdVal, postTextVal, usernameVal, isActiveVal){        
        $.mobile.loading("show");
        $.ajax({
            type: "PUT",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);
            },
            url: apidomain+"/posts/"+postIdVal,
            //data: "postText=" + postText + "&username=" + username + "&isActive=" + isActive,
            data: {
                "postText":postTextVal,
                "username":usernameVal,
                "isActive":isActiveVal  
            },
            //contentType: "application/x-www-form-urlencoded",
            //dataType:"json",
            success: function(p){
                $.mobile.loading("hide");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){
                //okDialog(err.message, function(){});
                $.mobile.loading("hide");
                navigator.notification.alert(err.message, null, 'Fehler', 'OK');
            },
            timeout:3000
        });
    }
    
    function deletePost(postId, username){
        //confirmDeletePost(1, postId, username);
        navigator.notification.confirm("Soll dieser Beitrag gel�scht werden?", function(buttonIndex){
            confirmDeletePost(buttonIndex, postId, username);
        }, 'Beitrag l�schen', ['Ja','Nein']);                                        
    }
    
    //TODO: postId muss von deletePost Function �bergeben werden
    function confirmDeletePost(buttonindex, postId, username){                
        if(buttonindex === 1){            
            $.mobile.loading("show");
            $.ajax({
                type: "DELETE",
                beforeSend: function (request){
                    request.setRequestHeader("Authorization", localStorage.apiKey);
                },
                url: apidomain+"/posts/"+postId,
                //data: "username=" + username,
                data: {
                    "username":username
                },
                success: function(p){
                    $.mobile.loading("hide");
                    $(':mobile-pagecontainer').pagecontainer('change', '#topicPage', {allowSamePageTransition: true});
                },
                error: function(err){
                    //okDialog(err.message, function(){console.log(err)});
                    $.mobile.loading("hide");
                    navigator.notification.alert(err.message, null, 'Fehler', 'OK');
                },
                timeout:3000
            });
        }    
    }

    
    /*
    function deleteAllPosts(topicId){
        $.ajax({
            type: "DELETE",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);
            },
            url: apidomain+"/topicposts/"+topicId,
            success: function(msg){
                $(':mobile-pagecontainer').pagecontainer('change', '#topicsListPage');
            },
            error: function(err){
                okDialog(err.message, function(){});
            },
            timeout:3000
        });
    }
    */                                  
    
    function getTopic(topicId, callback){
        $.mobile.loading("show");
        $.ajax({
            type: 'GET',
            url: apidomain+"/topics/"+topicId,
            dataType: "json",
            success: function(result) {
                $.mobile.loading("hide");
                callback(result);             
            },
            error: function(err){
                //console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                //alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
                $.mobile.loading("hide");
                navigator.notification.alert('Fehler beim Laden der Versuchsgruppen: '+err.code, null, 'Fehler', 'OK');
            },
            timeout:3000
        });
    }
    
    function getPost(postId, callback){
        $.mobile.loading("show");
        $.ajax({
            type: 'GET',
            url: apidomain+"/posts/"+postId,
            dataType: "json",
            success: function(result) {
                $.mobile.loading("hide");
                callback(result);
            },
            error: function(err){
                //console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                //alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
                $.mobile.loading("hide");
                navigator.notification.alert('Fehler beim Laden der Versuchsgruppen: '+err.code, null, 'Fehler', 'OK');
            },
            timeout:3000
        });
    }
    
    
    function getAllTopics(expId){
        $.mobile.loading("show");
        $.ajax({
            type: 'GET',
            url: apidomain+"/exptopics/"+expId,
            dataType: "json",
            success: function(result) {            
                $("#topicsList").empty();
                var topics = '';
                for(var i=0;i<result.topics.length;i++){
                    (function(i){
                        var expTopic = result.topics[i];
                        topics += '<li><a href="#topicPage" data-topicId="'+expTopic.id+'">'+ expTopic.topicTitle + '</a></li>';
                    })(i);
                }
                $('#topicsList').append(topics);
                $('#topicsList').listview('refresh');
                $.mobile.loading("hide");
            },
            error: function(err){
                //console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                //alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
                $.mobile.loading("hide");
                navigator.notification.alert('Fehler beim Laden der Versuchsgruppen: '+err.code, null, 'Fehler', 'OK');
            },
            timeout:3000                                                                                             
        });        
    }
    
    function getAllPosts(topicId){            
        $.mobile.loading("show");
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
                                        postContent += '<a href="#" id="deletePostButton" data-postId="'+post.id+'" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all"></a>';
                                        postContent += '<a href="#" id="editPostButton" data-postId="'+post.id+'" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all"></a>';
                                    } else {
                                        postContent += '<div class="post float-right ui-corner-all ui-shadow">';
                                    }
                                    postContent += '<img src="http://placehold.it/100/ff0" />';
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
                //console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                //alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
                $.mobile.loading("hide");
                navigator.notification.alert('Fehler beim Laden der Versuchsgruppen: '+err.code, null, 'Fehler', 'OK');
            },
            timeout:3000
        });    
    }