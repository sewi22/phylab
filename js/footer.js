    
    function addExpFooterNavbar(page){
        var navbar, navbarId, footerId, addClassAll, addClassFav = "";
        if (page == "detailsPage"){
            navbarId = "#detailsNavbar"; footerId = "#detailsFooter";
            classDetails = ' class="ui-btn-active ui-state-persist"';
            classQuiz = ''; classFaq = '';
        } else if (page == "faqPage"){
            navbarId = "#expFaqNavbar"; footerId = "#faqFooter";
            classDetails = ''; classQuiz = '';
            classFaq = ' class="ui-btn-active ui-state-persist"';
        } else if (page == "quizPage"){
            navbarId = "#expQuizNavbar"; footerId = "#quizFooter";
            classDetails = ''; classFaq = '';
            classQuiz = ' class="ui-btn-active ui-state-persist"';
        }
        var navbar = $('<div id="'+navbarId+'" class="expPageNavbar" data-role="navbar" data-iconpos="bottom"><ul><li><a id="footerNavbarItemDetails" href="#detailsPage" data-theme="a" data-icon="info"'+classDetails+'>Details</a></li><li><a id="footerNavbarItemFaq" href="#faqPage" data-theme="a" data-icon="comment"'+classFaq+'>FAQ</a></li><li><a id="footerNavbarItemQuiz" href="#quizPage" data-theme="a" data-icon="check"'+classQuiz+'>Quiz</a></li></ul></div>').appendTo(footerId);
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