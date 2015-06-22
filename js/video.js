
    $.mobile.document.on('pagecreate', '#videoPage', function(e){
        e.preventDefault();
        $("#videoHeadline").html("Video");
    });
    
    
    $(document).on('pagebeforeshow', '#videoPage', function(e) {
        $("#videoContent").empty();        
        //$("#videoContent").append('<iframe id="player" type="text/html" width="320" height="250" src="http://www.youtube.com/embed/u1zgFlCw8Aw?enablejsapi=1&origin=http://example.com" frameborder="0" allowfullscreen></iframe>');        
        $("#videoContent").append('<iframe id="player" type="text/html" src="https://www.youtube.com/watch?v=OTglg05fyHg?enablejsapi=1" frameborder="0" allowfullscreen></iframe>');        
        $("#videoContent").enhanceWithin();
        
        var expGroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");
        getExp(expGroupNumber, expNumber, function(result){
            alert(result);
            //$("#videoContent").append('<iframe id="player" type="text/html" src="'+result.videolink+'?enablejsapi=1" frameborder="0" allowfullscreen></iframe>');
            //$("#videoContent").enhanceWithin();
        });
                           
    });    
    
    //Versuch 1.3
    //https://www.youtube.com/watch?v=OTglg05fyHg
    
    //Versuch 1.6
    //https://www.youtube.com/watch?v=1_QZq5mOCL0                                 