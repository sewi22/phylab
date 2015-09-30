
    $.mobile.document.on('pagecreate', '#videoPage', function(e){
        e.preventDefault();
        //$("#videoHeadline").html("Video");
        $("#videoContent").removeClass("ui-content");
        $("#videoContent").addClass("no-padding");
    });
    
    
    $(document).on('pagebeforeshow', '#videoPage', function(e) {
        $("#videoContent").empty();        
        if (localStorage["expGroupNumber"] && localStorage["expNumber"]) {               
            getExp(localStorage["expGroupNumber"], localStorage["expNumber"], function(result){                    
                $("#videoContent").append('<iframe id="video" src="'+result.videolink+'" frameborder="0" allowfullscreen></iframe>');
                reloadVideoFrame();
            });
        } else {
            console.log("Kein Versuch ausgewählt.")
        }                                     
    });
    
    function reloadVideoFrame(){    
        $('#video').css({ width: $(window).width() + 'px', height: $(window).height() + 'px' });
    }                        