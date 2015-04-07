       
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
         
    $.mobile.document.on('swipeleft', '#experimentPage', function(e){
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
    