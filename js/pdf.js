    
    $.mobile.document.on('pagecreate', '#pdfPage', function(e){
        e.preventDefault();
        $("#pdfContent").removeClass("ui-content");
        $("#pdfContent").addClass("no-padding");
        //addExpFooterNavbar(e.target.id);
        //addExpPageContextMenuButton(e.target.id);
    });
        
    $.mobile.document.on('pagebeforeshow', '#pdfPage', function(e){
        e.preventDefault();
        checkUserLogin();
        var w = $(window).width();
        var h = $(window).height();
        reloadPdfFrame(h,w);        
    });
    
    
    $(window).resize(function(e) {
        var w = $(window).width();
        var h = $(window).height();
        if(window.location.href.substr(window.location.href.indexOf("#")) == "#pdfPage"){
            reloadPdfFrame(h,w);
        }
    });
    
    function reloadPdfFrame(h, w){
        $("#pdfContent").empty();
        var expGroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");
        var url = "";
        getExp(expGroupNumber, expNumber, function(result){
            var pdfFrame = '<iframe src="http://docs.google.com/gview?url='+result.pdflink+'&embedded=true" style="width:'+w+'px; height:'+h+'px;" frameborder="0"></iframe>';
            $("#pdfContent").append(pdfFrame);
        });
    }
    