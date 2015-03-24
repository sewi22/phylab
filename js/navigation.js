
    // START PAGE ITEMS
    $.mobile.document.on('touchend click', '#startItemQuiz', function(e){
        e.preventDefault();        
        $(':mobile-pagecontainer').pagecontainer('change', '#quizPage');
    });
   
   $.mobile.document.on('touchend click', '#startItemTopics', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#topicsListPage');
    });       
   
    $.mobile.document.on('touchend click', '#startItemTools', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#toolsListPage');      
    });     
    
    $.mobile.document.on('touchend', '#startItemScanner', function(e){
        e.preventDefault();        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan( function (result) {
            alert("Scanner result: \n" +
            "text: " + result.text + "\n" +
            "format: " + result.format + "\n" +
            "cancelled: " + result.cancelled + "\n");
        },function (error) {
            console.log("Scanning failed: ", error);
        });
    });
    
    $.mobile.document.on('touchend click', '#startItemSettings', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#settingsPage');
    });
    
    $.mobile.document.on('touchend click', '#startItemContact', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#contactPage');
    });
    
    $.mobile.document.on('touchend click', '#startItemImpressum', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#impressumPage');
    });
    
    $.mobile.document.on('touchend click', '#expDisplay', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#expListAllPage');        
    });
    
    
    
    
    // TOPICS & POSTS
    $.mobile.document.on('touchend click', '#addTopicButton', function(e){
        e.preventDefault();
        sessionStorage.setItem("add", "topic");
        $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage');
    });

    $.mobile.document.on('touchend click', '#addPostButton', function(e){
        e.preventDefault();
        sessionStorage.setItem("add", "post");
        sessionStorage.setItem("topicId", e.target.dataset.topicid);        
        $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage');
    });

    $.mobile.document.on('touchend click', '#editTopicButton', function(e){
        e.preventDefault();
        sessionStorage.setItem("edit", "topic");
        sessionStorage.setItem("topicId", e.target.dataset.topicid);
        $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage');
    });

    $.mobile.document.on('touchend click', '#editPostButton', function(e){
        e.preventDefault();        
        sessionStorage.setItem("edit", "post");
        sessionStorage.setItem("postId", e.target.dataset.postid);        
        $(':mobile-pagecontainer').pagecontainer('change', '#topicFormPage');
    });

    $.mobile.document.on('touchend click', '#deleteTopicButton', function(e){
        e.preventDefault();
        deleteTopic(e.target.dataset.topicid);
    });

    $.mobile.document.on('touchend click', '#deletePostButton', function(e){
        e.preventDefault();
        deletePost(e.target.dataset.postid);
    });
    
    
    $.mobile.document.on('touchend click', '#fbLoginButton', function(e){
        e.preventDefault();
        var afterLoginPage = sessionStorage.afterLoginPage;
        sessionStorage.removeItem("afterLoginPage");
        $(':mobile-pagecontainer').pagecontainer('change', afterLoginPage);
    });
    
    $.mobile.document.on('touchend click', '#casLoginButton', function(e){
        e.preventDefault();
        console.log("Login via CAS");
        window.location.href='http://cas.thm.de?service=http://phylab.org/app';
        //$(':mobile-pagecontainer').pagecontainer('change', 'http://cas.thm.de?service=http://phylab.org/app');
    });
    
    $.mobile.document.on('touchend click', '#logoutButton', function(e){
        e.preventDefault();
        $(':mobile-pagecontainer').pagecontainer('change', '#startPage');
    });
    
    
    
    
    // SWIPE ACTIONS   
    $.mobile.document.on('swipeleft', '#expListAllPage', function(e) {
        e.preventDefault();
        var next = '#' + $.mobile.activePage.next('[data-role=page]')[0].id;
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', next);//, {transition: 'none', reverse: false});
            e.handled = true;
        }
    });
    
    $.mobile.document.on('swiperight', '#expListFavPage', function(e) {
        e.preventDefault();
        var prev = '#' + $.mobile.activePage.prev('[data-role=page]')[0].id;
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', prev);//, {transition: 'none', reverse: true});
            e.handled = true;
        }
    });
         
    $.mobile.document.on('swipeleft', '#detailsPage', function(e){
        e.preventDefault();
        var next = '#' + $.mobile.activePage.next('[data-role=page]')[0].id;
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', next);//, {transition: 'none', reverse: false});
            e.handled = true;
        }
    });

    $.mobile.document.on('swiperight', '#quizPage', function(e){
        e.preventDefault();
        var prev = '#' + $.mobile.activePage.prev('[data-role=page]')[0].id;
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', prev);//, {transition: 'none', reverse: true});
            e.handled = true;
        }
    });
 



    // FOOTER ITEMS
       
    // Click on Fav Tab
    $.mobile.document.on('touchend', '#footerNavbarItemListFav', function(e){
        e.preventDefault();
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#expListFavPage');//, {transition: 'none', reverse: false});
        }
    });    
    
    // Click on All Tab
    $.mobile.document.on('touchend', '#footerNavbarItemListAll', function(e){
        e.preventDefault();
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#expListAllPage');//, {transition: 'none', reverse: true});
        }
    });   

    // Click on Quiz Tab
    $.mobile.document.on('touchend', '#footerNavbarItemQuiz', function(e){
        e.preventDefault();
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#quizPage');//, {transition: 'none', reverse: false});
        }
    });
    // Click on Details Tab
    $.mobile.document.on('touchend', '#footerNavbarItemDetails', function(e){
        e.preventDefault();
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#detailsPage');//, {transition: 'none', reverse: true});
        }
    });
    