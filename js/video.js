
    $.mobile.document.on('pagecreate', '#videoPage', function(e){
        e.preventDefault();
        //$("#videoHeadline").html("Video");
        $("#videoContent").removeClass("ui-content");
        $("#videoContent").addClass("no-padding");
    });
    
    
    $(document).on('pagebeforeshow', '#videoPage', function(e) {
        $("#videoContent").empty();        
        //$("#videoContent").append('<iframe id="player" type="text/html" width="320" height="250" src="http://www.youtube.com/embed/u1zgFlCw8Aw?enablejsapi=1&origin=http://example.com" frameborder="0" allowfullscreen></iframe>');
        $("#videoContent").append('<iframe id="video" src="http://www.youtube.com/embed/OTglg05fyHg" frameborder="0" allowfullscreen></iframe>');
        reloadVideoFrame();                         
    });
    
    function reloadVideoFrame(){    
        $('#video').css({ width: $(window).width() + 'px', height: $(window).height() + 'px' });
    }
  
    
    //Versuch 1.3
    //https://www.youtube.com/watch?v=OTglg05fyHg
    
    //Versuch 1.6
    //https://www.youtube.com/watch?v=1_QZq5mOCL0                                 