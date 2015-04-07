    
    $.mobile.document.on('pagecreate', '#experimentPage', function(e) {
        e.preventDefault();
    });
    
    $.mobile.document.on('pagebeforeshow', '#experimentPage', function(e){
        e.preventDefault();
        var expGroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");

        getExp(expGroupNumber, expNumber, function(result){
            var headline = result.expGroupNumber+"."+result.expNumber;
            $("#experimentHeadline").html(headline);
            $("#experimentContent").html(result.expName);
        });
    });