
    // Swipe on expListAllPage to Left
    $.mobile.document.on('swipeleft', '#expListAllPage', function(e) {
        e.preventDefault();
        var next = '#' + $.mobile.activePage.next('[data-role=page]')[0].id;
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', next);//, {transition: 'none', reverse: false});
            e.handled = true;
        }
    });
    // Click on Fav Tab
    $.mobile.document.on('touchend', '#footerNavbarItemListFav', function(e){
        e.preventDefault();
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#expListFavPage');//, {transition: 'none', reverse: false});
        }
    });
    // Swipe on expListFavPage to Right
    $.mobile.document.on('swiperight', '#expListFavPage', function(e) {
        e.preventDefault();
        var prev = '#' + $.mobile.activePage.prev('[data-role=page]')[0].id;
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', prev);//, {transition: 'none', reverse: true});
            e.handled = true;
        }
    });
    // Click on All Tab
    $.mobile.document.on('touchend', '#footerNavbarItemListAll', function(e){
        e.preventDefault();
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#expListAllPage');//, {transition: 'none', reverse: true});
        }
    });
    
    // Swipe on detailsPage to Left
    $.mobile.document.on('swipeleft', '#detailsPage', function(e){
        e.preventDefault();
        var next = '#' + $.mobile.activePage.next('[data-role=page]')[0].id;
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', next);//, {transition: 'none', reverse: false});
            e.handled = true;
        }
    });
    // Swipe on expListFavPage to Right
    $.mobile.document.on('swiperight', '#quizPage', function(e){
        e.preventDefault();
        var prev = '#' + $.mobile.activePage.prev('[data-role=page]')[0].id;
        if(e.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', prev);//, {transition: 'none', reverse: true});
            e.handled = true;
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
    