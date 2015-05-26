
    $.mobile.document.on('pagecreate', '#videoPage', function(e){
        e.preventDefault();
        $("#videoHeadline").html("Video");
    });
    
    
    $(document).on('pagebeforeshow', '#videoPage', function(e) {
        $("#videoContent").append('<iframe id="player" type="text/html" width="640" height="390"src="https://www.youtube.com/watch?v=L057nHcpPTE?enablejsapi=1" frameborder="0"></iframe>');
        $('#quizContent').enhanceWithin();
                           
    });

