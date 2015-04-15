    
    function createNewTopic(topicTitle, expId, authorId, authorType, postText, topicIsActive, postIsActive){        
        $.ajax({
            type: "POST",
            url: apidomain+"/topics",
            data: "topicTitle=" + topicTitle + "&expId=" + expId  + "&authorId=" + authorId + "&authorType=" + authorType + "&isActive=" + topicIsActive,
            success: function(msg){
                createNewPost(msg.topicId, postText, authorId, authorType, postIsActive);                    
            },
            error: function(err){
                okDialog(err.message, function(){});
            }
        });
    }
    
    function editTopic(topicId, topicTitle, expId, authorId, authorType, isActive){
        $.ajax({
            type: "PUT",
            url: apidomain+"/topics/"+topicId,
            data: "topicTitle=" + topicTitle + "&expId=" + expId  + "&authorId=" + authorId + "&authorType=" + authorType + "&isActive=" + isActive,
            success: function(msg){                
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){
                okDialog(err.message, function(){});
            }
        });   
    }        

    function deleteTopic(topicId){
        confirmDialog("Soll dieses Thema und enthaltenen alle Beitr&auml;ge gel&ouml;scht werden?", function(){
            $.ajax({
                type: "DELETE",
                url: apidomain+"/topics/"+topicId,            
                success: function(msg){                                
                    deleteAllPosts(topicId);                
                },
                error: function(err){
                    okDialog(err.message, function(){});
                }
            });    
        });            
    }

    function createNewPost(topicId, postText, authorId, authorType, isActive){
        $.ajax({
            type: "POST",
            url: apidomain+"/posts",
            data: "topicId=" + topicId + "&postText=" + postText  + "&authorId=" + authorId + "&authorType=" + authorType + "&isActive="+ isActive,
            success: function(p){
                sessionStorage.setItem("topicId", topicId);
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){                
                okDialog("Es wurde keine Nachricht eingetragen.", function(){});
            }
        });    
    }
    
    function editPost(postId, postText, authorId, authorType, isActive){        
        $.ajax({
            type: "PUT",
            url: apidomain+"/posts/"+postId,
            data: "postText=" + postText  + "&authorId=" + authorId + "&authorType=" + authorType + "&isActive=" + isActive,
            success: function(p){
                $(':mobile-pagecontainer').pagecontainer('change', '#topicPage');
            },
            error: function(err){
                okDialog(err.message, function(){});
            }
        });
    }
    
    function deletePost(postId){
        confirmDialog("Soll dieser Eintrag gel&ouml;scht werden?", function(){
            $.ajax({
                type: "DELETE",
                url: apidomain+"/posts/"+postId,            
                success: function(p){                                
                    $(':mobile-pagecontainer').pagecontainer('change', '#topicPage', {allowSamePageTransition: true});                
                },
                error: function(err){
                    okDialog(err.message, function(){});
                }
            });    
        });                                
    }
    
    function deleteAllPosts(topicId){
        $.ajax({
            type: "DELETE",
            url: apidomain+"/topicposts/"+topicId,
            success: function(msg){
                $(':mobile-pagecontainer').pagecontainer('change', '#topicsListPage');
            },
            error: function(err){
                okDialog(err.message, function(){});
            }
        });
    }
    
    function getTopic(topicId, callback){
        $.ajax({
            type: 'GET',
            url: apidomain+"/topics/"+topicId,
            dataType: "json",
            success: function(result) {
                callback(result);             
            },
            error: function(err){
                console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
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
                console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
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
                console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
            }
        });        
    }
    
    function getAllPosts(topicId){
        // TODO: check user
        //var userID = (authResponse) ? authResponse.userID : '';
        $.ajax({
            type: 'GET',
            url: apidomain+"/topicposts/"+topicId,
            dataType: "json",
            success: function(result) {
                for(var i=0;i<result.posts.length;i++){
                    (function(i){
                        var post = result.posts[i];
                        console.log(post);
                                            
                            //post.authorId,
                            
                                    var timestamp = convertTimestamp(post.created);
                                    var postContent = "";                                    
                                    if(post.authorId == localStorage.username){
                                        postContent += '<div class="post float-left ui-corner-all ui-shadow">';
                                        postContent += '<a href="#" id="deletePostButton" data-postId="'+post.id+'" class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all"></a>';
                                        postContent += '<a href="#" id="editPostButton" data-postId="'+post.id+'" class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all"></a>';
                                    } else {
                                        postContent += '<div class="post float-right ui-corner-all ui-shadow">';
                                    }
                                    postContent += '<img src="http://placehold.it/100/ff0" />';
                                    postContent += '<div class=postText>'+post.postText;
                                    postContent += '<p class="postFrom">von '+ post.authorId+ '<br/>am ' + timestamp +' Uhr</p>';
                                    postContent += '</div>';
                                    postContent += '</div>';
                                    $('#topicContent').append(postContent);
                                    $('#topicContent').enhanceWithin();                                                            
                        
                    })(i);
                }
            },
            error: function(err){
                console.log('Fehler beim Laden der Versuchsgruppen: '+err.code);
                alert('Fehler beim Laden der Versuchsgruppen: '+err.code);
            }
        });    
    }