
    $("#container").bind("pagecontainerchangefailed", function(e, ui) {
        e.preventDefault();
        $.mobile.loading('hide');
        alert("pagecontainerchangefailed");
        console.log(e);
        console.log(ui);
    });
    $("#container").bind("changefailed", function(e, ui) {
        e.preventDefault();
        $.mobile.loading('hide');
        alert("changefailed");
        console.log(e);
        console.log(ui);
    });
    $("#container").bind("pagechangefailed", function(e, ui) {
        e.preventDefault();
        $.mobile.loading('hide');
        alert("pagechangefailed");
        console.log(e);
        console.log(ui);
    });