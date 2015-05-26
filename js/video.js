
    $.mobile.document.on('pagecreate', '#videoPage', function(e){
        e.preventDefault();
        $("#videoHeadline").html("Video");
    });
    
    
    $(document).on('pagebeforeshow', '#videoPage', function(e) {
        $("#videoContent").empty();
        $("#videoContent").append('Youtube Video');
        $("#videoContent").append('<iframe id="player" type="text/html" width="320" height="250" src="http://www.youtube.com/embed/u1zgFlCw8Aw?enablejsapi=1&origin=http://example.com" frameborder="0" allowfullscreen></iframe>');
        $("#videoContent").enhanceWithin();
                           
    });                                     