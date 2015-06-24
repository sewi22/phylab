
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
        //var w = $(window).width();
        //var h = $(window).height();
        reloadVideoFrame(h,w);                         
    });
    
    function reloadVideoFrame(){
        //console.log("height: "+h+"; width: "+w);        
        //$("#videoContent").append('<iframe id="video" type="text/html" width="'+w+'" height="'+h+'" src="http://www.youtube.com/embed/OTglg05fyHg?enablejsapi=1&origin=http://example.com" frameborder="0" allowfullscreen></iframe>');
        //$("#videoContent").append('<iframe id="video" src="http://www.youtube.com/embed/OTglg05fyHg" frameborder="0" allowfullscreen></iframe>');
        //$("#videoContent").enhanceWithin();
        
        
        $('#video').css({ width: $(window).width() + 'px', height: $(window).height() + 'px' });
        //$('#video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });
        
        
        //var expGroupNumber = localStorage.getItem("expGroupNumber");
        //var expNumber = localStorage.getItem("expNumber");
        //getExp(expGroupNumber, expNumber, function(result){
            //alert(result.videolink);
            //$("#videoContent").append('<iframe id="player" type="text/html" src="'+result.videolink+'?enablejsapi=1" frameborder="0" allowfullscreen></iframe>');
            //$("#videoContent").enhanceWithin();
        //});    
    }
  
    
    //Versuch 1.3
    //https://www.youtube.com/watch?v=OTglg05fyHg
    
    //Versuch 1.6
    //https://www.youtube.com/watch?v=1_QZq5mOCL0                                 