    
    function addExpFooterNavbar(page){
        var navbarId, footerId = "";//, addClassAll, addClassFav = "";
        var classDetails, classTools, classPdf, classTopicsList, classQuiz = "";
        if (page == "detailsPage"){
            navbarId = "#detailsNavbar";
            footerId = "#detailsFooter";
            classDetails = ' class="ui-btn-active ui-state-persist"';                    
        } else if (page == "toolsListPage"){
            navbarId = "#toolsListNavbar";
            footerId = "#toolsListFooter";            
            classTools = ' class="ui-btn-active ui-state-persist"';        
        } else if (page == "pdfPage"){
            navbarId = "#pdfNavbar";
            footerId = "#pdfFooter";            
            classPdf = ' class="ui-btn-active ui-state-persist"';        
        } else if (page == "topicsListPage"){
            navbarId = "#expTopicsListNavbar";
            footerId = "#topicsListFooter";            
            classTopicsList = ' class="ui-btn-active ui-state-persist"';
        } else if (page == "quizPage"){
            navbarId = "#expQuizNavbar";
            footerId = "#quizFooter";            
            classQuiz = ' class="ui-btn-active ui-state-persist"';
        }
        
        var navContent = '';
        navContent += '<div id="'+navbarId+'" class="expPageNavbar" data-role="navbar" data-iconpos="bottom"><ul>';
        navContent += '<li><a id="footerNavbarItemDetails" href="#detailsPage" data-theme="a" data-icon="info"'+classDetails+'>Details</a></li>';
        navContent += '<li><a id="footerNavbarItemTools" href="#toolsListPage" data-theme="a" data-icon="phone"'+classTools+'>Tools</a></li>';
        navContent += '<li><a id="footerNavbarItemPdf" href="#pdfPage" data-theme="a" data-icon="heart"'+classPdf+'>PDF</a></li>';        
        navContent += '<li><a id="footerNavbarItemTopicsList" href="#topicsListPage" data-theme="a" data-icon="comment"'+classTopicsList+'>Topics</a></li>';
        navContent += '<li><a id="footerNavbarItemQuiz" href="#quizPage" data-theme="a" data-icon="check"'+classQuiz+'>Quiz</a></li>';        
        navContent += '</ul></div>';

        var navbar = $(navContent).appendTo(footerId);
        $(footerId).append(navbar).trigger('create');
    }


    // Add a NavBar to footer in ExpLists
    function addExpListFooterNavbar(page){
        var navbar, navbarId, footerId, addClassAll, addClassFav = "";
        if (page == "expListAllPage"){
            navbarId = "#expListAllNavbar";footerId = "#expListAllFooter";addClassAll = 'class="ui-btn-active ui-state-persist"'; addClassFav = '';
        } else if (page == "expListFavPage"){
            navbarId = "#expListFavNavbar";footerId = "#expListFavFooter";addClassAll = ''; addClassFav = 'class="ui-btn-active ui-state-persist"';
        }
        var navbar = $('<div id="'+navbarId+'" class="expListNavbar" data-role="navbar" data-iconpos="bottom"><ul><li><a id="footerNavbarItemListAll" href="#expListAllPage" '+addClassAll+' data-theme="a" data-icon="bullets">Alle</a></li><li><a id="footerNavbarItemListFav" href="#expListFavPage" '+addClassFav+' data-theme="a" data-icon="star">Favoriten</a></li></ul></div>').appendTo(footerId);
        $(footerId).append(navbar).trigger('create');
    }
    
    
       
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