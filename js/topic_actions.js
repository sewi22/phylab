    
    function createNewTopic(topicTitleVal, expIdVal, postTextVal, topicIsActiveVal, postIsActiveVal){        
        $.mobile.loading("show");
        $("#submit").button("disable");
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
                //createNewPost(msg.topicIdVal, postTextVal, postIsActiveVal);
                sessionStorage.setItem("topicId", msg.topicId);
                $.mobile.loading("hide");
                $("#submit").button("enable");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');                    
            },
            error: function(err){                
                $.mobile.loading("hide");
                $("#submit").button("enable");
                navigator.notification.alert("Der Eintrag konnte nicht gespeichert werden./nBitte versuchen Sie es noch einmal.", null, 'Fehler', 'OK');                
            },
            timeout:2000
        });
    }
    
    function editTopic(topicIdVal, topicTitleVal, usernameVal, expIdVal, isActiveVal){
        $.mobile.loading("show");
        $("#submit").button("disable");
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
                $("#submit").button("enable");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){                
                $.mobile.loading("hide");
                $("#submit").button("enable");
                navigator.notification.alert("Die Änderung konnte nicht gespeichert werden./nBitte versuchen Sie es noch einmal.", null, 'Fehler', 'OK');
            },
            timeout:2000
        });   
    }        

    function deleteTopic(topicIdVal, usernameVal){
        navigator.notification.confirm("Soll dieses Thema und alle enthaltenen Beiträge gelöscht werden?", function(buttonIndex){
            confirmDeleteTopic(buttonIndex, topicIdVal, usernameVal);
        }, 'Thema löschen', ['Ja','Nein']);                    
    }
    
    function confirmDeleteTopic(buttonindex, topicIdVal, usernameVal){        
        switch(buttonindex){
            case 1:                    
            $.mobile.loading("show");
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
                    //deleteAllPosts(topicIdVal);
                    $.mobile.loading("hide");
                    $(':mobile-pagecontainer').pagecontainer('change', '#startPage');                    
                    //navigator.notification.alert('Das Thema wurde erfolgreich gelöscht', null, 'Thema löschen', 'OK');
                },
                error: function(err){                    
                    $.mobile.loading("hide");
                    navigator.notification.alert("Dieser Beitrag konnte nicht gelöscht werden./nBitte versuchen Sie es noch einmal.", null, 'Fehler', 'OK');
                },
                timeout:2000
            });
            break;
        }
    }
    
    
    function deleteAllPosts(topicIdVal){
        $.ajax({
            type: "DELETE",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);
            },
            url: apidomain+"/topicposts/"+topicIdVal,
            success: function(msg){
                $.mobile.loading("hide");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicsListPage');
                navigator.notification.alert('Das Thema wurde erfolgreich gelöscht', null, 'Thema löschen', 'OK');
            },
            error: function(err){
                $.mobile.loading("hide");
                navigator.notification.alert(err.message, null, 'Fehler', 'OK');
            },
            timeout:2000
        });
    }
               
        
    function createNewPost(topicIdVal, postTextVal, isActiveVal){
        $.mobile.loading("show");
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
            //contentType: "application/x-www-form-urlencoded",            
            //dataType: "json",        
            success: function(p){
                sessionStorage.setItem("topicId", topicIdVal);
                $.mobile.loading("hide");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){                                
                $.mobile.loading("hide");
                navigator.notification.alert('Der Beitrag konnte nicht gespeichert werden. '+err.message, null, 'Fehler', 'OK');
            },
            timeout:2000
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
            data: {
                postText:postTextVal,
                username:usernameVal,
                isActive:isActiveVal  
            },
            //contentType: "application/x-www-form-urlencoded",
            //dataType:"json",
            success: function(p){
                $.mobile.loading("hide");
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){                
                $.mobile.loading("hide");
                navigator.notification.alert(err.message, null, 'Fehler', 'OK');
            },
            timeout:2000
        });
    }
    
    function deletePost(postId, username){    
        navigator.notification.confirm("Soll dieser Beitrag gelöscht werden?", function(buttonIndex){
            confirmDeletePost(buttonIndex, postId, username);
        }, 'Beitrag löschen', ['Ja','Nein']);                                        
    }
    
    
    function confirmDeletePost(buttonindex, postIdVal, usernameVal){                
        if(buttonindex === 1){            
            $.mobile.loading("show");
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
                    $(':mobile-pagecontainer').pagecontainer('change', '#topicPage', {allowSamePageTransition: true});
                },
                error: function(err){                    
                    $.mobile.loading("hide");
                    navigator.notification.alert(err.message, null, 'Fehler', 'OK');
                },
                timeout:2000
            });
        }    
    }
                                     
    
    function getTopic(topicIdVal, callback){
        $.mobile.loading("show");
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
                navigator.notification.alert('Fehler beim Laden der Beiträge./nBitte versuchen Sie es erneut.'+err.code, null, 'Fehler', 'OK');
            },
            timeout:2000
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
                $.mobile.loading("hide");
                navigator.notification.alert('Fehler beim Laden der Beiträge./nBitte versuchen Sie es erneut.'+err.code, null, 'Fehler', 'OK');
            },
            timeout:2000
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
                $.mobile.loading("hide");
                navigator.notification.alert('Fehler beim Laden der Beiträge./nBitte versuchen Sie es erneut.'+err.code, null, 'Fehler', 'OK');
            },
            timeout:2000                                                                                             
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
                $.mobile.loading("hide");
                navigator.notification.alert('Fehler beim Laden der Beiträge./nBitte versuchen Sie es erneut.'+err.code, null, 'Fehler', 'OK');
            },
            timeout:2000
        });    
    }