
    $("body").bind("pagecontainerchangefailed", function(e, ui) {
        e.preventDefault();
        $.mobile.loading('hide');
        alert("pagecontainerchangefailed");
        console.log(e);
        console.log(ui);
    });
    $("body").bind("changefailed", function(e, ui) {
        e.preventDefault();
        $.mobile.loading('hide');
        alert("changefailed");
        console.log(e);
        console.log(ui);
    });
    $("body").bind("pagechangefailed", function(e, ui) {
        e.preventDefault();
        $.mobile.loading('hide');
        alert("pagechangefailed");
        console.log(e);
        console.log(ui);
    });
    $.mobile.document.on('click', '#setSwntUser', function(e){
        e.preventDefault();
        localStorage.setItem("username", "swnt24");
        localStorage.setItem("apiKey", "3831621407f42f3290403bff5b57460c");
        $(':mobile-pagecontainer').pagecontainer('change', '#startPage', {allowSamePageTransition:true});
    });
    $.mobile.document.on('click', '#setMmstUser', function(e){
        e.preventDefault();
        localStorage.setItem("username", "mmst99");
        localStorage.setItem("apiKey", "1234567890");
        $(':mobile-pagecontainer').pagecontainer('change', '#startPage', {allowSamePageTransition:true});
    });
    $.mobile.document.on('click', '#setNoUser', function(e){
        e.preventDefault();
        localStorage.removeItem("username");
        localStorage.removeItem("apiKey");
        $(':mobile-pagecontainer').pagecontainer('change', '#startPage', {allowSamePageTransition:true});
    });