
    $.mobile.document.on('pagecreate', '#videoPage', function(e){
        e.preventDefault();
        //$("#videoHeadline").html("Video");
        $("#videoContent").removeClass("ui-content");
        $("#videoContent").addClass("no-padding");
    });
    
    
    $(document).on('pagebeforeshow', '#videoPage', function(e) {
        $("#videoContent").empty();                       
        getExp(localStorage["expGroupNumber"], localStorage["expNumber"], function(result){
            console.log(result.videolink);                    
            $("#videoContent").append('<iframe id="video" src="https://www.youtube.com/embed/'+result.videolink+'" frameborder="0" allowfullscreen></iframe>');
            //$("#videoContent").append('<iframe id="video" src="https://www.youtube.com/embed/OTglg05fyHg" frameborder="0" allowfullscreen></iframe>');
            reloadVideoFrame();
        });                                             
    });
    
    function reloadVideoFrame(){    
        $('#video').css({ width: $(window).width() + 'px', height: $(window).height() + 'px' });
    }       