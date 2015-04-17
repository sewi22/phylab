    
    function createNewTopic(topicTitle, expId, postText, topicIsActive, postIsActive){        
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
                navigator.notification.alert(err.message, alertCallback, ['Fehler'], ['OK']);                
            }
        });
    }
    
    function editTopic(topicId, topicTitle, username, expId, isActive){
        $.ajax({
            type: "PUT",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);
            },
            url: apidomain+"/topics/"+topicId,
            data: "topicTitle=" + topicTitle + "&username=" + username + "&expId=" + expId + "&isActive=" + isActive,
            success: function(msg){                
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){
                //okDialog(err.message, function(){});
                navigator.notification.alert(err.message, alertCallback, ['Fehler'], ['OK']);
            }
        });   
    }        

    function deleteTopic(topicId, username){
        navigator.notification.confirm("Soll dieses Thema und enthaltenen alle Beitr&auml;ge gel&ouml;scht werden?", confirmDeleteTopic, 'Löschen', ['Ja','Nein']);                    
    }
    
    function confirmDeleteTopic(btnind){
        if(btnind == 1){         
            $.ajax({
                type: "DELETE",
                beforeSend: function (request){
                    request.setRequestHeader("Authorization", localStorage.apiKey);
                },
                url: apidomain+"/topics/"+topicId,
                data: "username=" + username,
                success: function(msg){
                    //deleteAllPosts(topicId);
                    $(':mobile-pagecontainer').pagecontainer('change', '#startPage');
                    //okDialog("Thema wurde erfolgreich gelöscht", function(){});
                    navigator.notification.alert('Thema wurde erfolgreich gelöscht', alertCallback, ['Erfolg'], ['OK']);
                },
                error: function(err){
                    //okDialog(err.message, function(){});
                    navigator.notification.alert(err.message, alertCallback, ['Fehler'], ['OK']);
                }
            });
        }
    }
            
        
    function createNewPost(topicId, postText, isActive){
        $.ajax({
            type: "POST",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);
            },
            url: apidomain+"/posts",
            data: "topicId=" + topicId + "&postText=" + postText + "&isActive="+ isActive,
            success: function(p){
                sessionStorage.setItem("topicId", topicId);
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){                
                //okDialog("Es wurde keine Nachricht eingetragen.", function(){});
                navigator.notification.alert('Der Beitrag konnte nicht gespeichert werden.', alertCallback, ['Fehler'], ['OK']);
            }
        });    
    }
    
    function editPost(postId, postText, username, isActive){        
        $.ajax({
            type: "PUT",
            beforeSend: function (request){
                request.setRequestHeader("Authorization", localStorage.apiKey);
            },
            url: apidomain+"/posts/"+postId,
            data: "postText=" + postText + "&username=" + username + "&isActive=" + isActive,
            success: function(p){
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){
                //okDialog(err.message, function(){});
                navigator.notification.alert(err.message, alertCallback, ['Fehler'], ['OK']);
            }
        });
    }
    
    function deletePost(postId, username){
        navigator.notification.confirm("Soll dieses Thema und enthaltenen alle Beitr&auml;ge gel&ouml;scht werden?", confirmDeletePost, 'Löschen', ['Ja','Nein']);                                        
    }
    
    function confirmDeletePost(btnind){
        if(btnind == 1){
            $.ajax({
                type: "DELETE",
                beforeSend: function (request){
                    request.setRequestHeader("Authorization", localStorage.apiKey);
                },
                url: apidomain+"/posts/"+postId,
                data: "username=" + username,
                success: function(p){
                    $(':mobile-pagecontainer').pagecontainer('change', '#topicPage', {allowSamePageTransition: true});
                },
                error: function(err){
                    //okDialog(err.message, function(){console.log(err)});
                    navigator.notification.alert(err.message, alertCallback, ['Fehler'], ['OK']);
                }
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
            }
        });
    }
    */
    
    function getTopic(topicId, callback){
        $.ajax({
            type: 'GET',
            url: apidomain+"/topics/"+topicId,
            dataType: "json",
            success: function(result) {
                callback(result);             
            },
            error: function(err){
                //console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                //alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
                navigator.notification.alert('Fehler beim Laden der Versuchsgruppen: '+err.code, alertCallback, ["Fehler"], ['OK']);
            }
        });
    }
    
    function getPost(postId, callback){
        $.ajax({
            type: 'GET',
            url: apidomain+"/posts/"+postId,
            dataType: "json",
            success: function(result) {
                callback(result);
            },
            error: function(err){
                //console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                //alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
                navigator.notification.alert('Fehler beim Laden der Versuchsgruppen: '+err.code, alertCallback, ["Fehler"], ['OK']);
            }
        });
    }
    
    
    function getAllTopics(expId){
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
            },
            error: function(err){
                //console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                //alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
                navigator.notification.alert('Fehler beim Laden der Versuchsgruppen: '+err.code, alertCallback, ["Fehler"], ['OK']);
            }                                                                                             
        });        
    }
    
    function getAllPosts(topicId){            
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
                        
                    })(i);
                }
            },
            error: function(err){
                //console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                //alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
                navigator.notification.alert('Fehler beim Laden der Versuchsgruppen: '+err.code, alertCallback, ["Fehler"], ['OK']);
            }
        });    
    }