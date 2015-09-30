
    /*
    // Create ExpLists (All and Fav)
    $.mobile.document.on('pagecreate', '.expListPage', function(e) {
        e.preventDefault();
        $('.expList').delegate("li a", "click", function (){
            localStorage.setItem("expGroupNumber", $(this).jqmData('expgroupnumber'));
            localStorage.setItem("expNumber", $(this).jqmData('expnumber'));
            getExp(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"), function(result){
                localStorage.setItem("expId", result.id);
            });
        });
    });
    */

    $.mobile.document.on('change', '#expSelect', function(e){        
        e.preventDefault();        
        var array = $(this).val().split('.');                
        localStorage.setItem("expGroupNumber", array[0]);
        localStorage.setItem("expNumber", array[1]);
            $("#videoLink a").removeClass("ui-state-disabled");
            $("#toolsLink a").removeClass("ui-state-disabled");
            $("#termsLink a").removeClass("ui-state-disabled");
            $("#topicsLink a").removeClass("ui-state-disabled");
            $("#pdfLink a").removeClass("ui-state-disabled");
            $("#quizLink a").removeClass("ui-state-disabled");
        getExp(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"), function(result){
            localStorage.setItem("expId", result.id);            
        });        
    });



    // Add Navbar Footer to expListAllPage
    $.mobile.document.on('pagecreate', '#expListAllPage', function(e) {
        e.preventDefault();
        //addExpListFooterNavbar(e.target.id);
        //addExpListContextMenuButton(e.target.id);
        //fillExpListContextMenu();
        $("#expListAllHeadline").html("PhyLab");
        checkUserLogin();

        getExpGroups(function (expGroups){
            var html = '';
            for(var i=0; i<expGroups.length; i++) {
                (function(i){
                    var expGroup = expGroups.item(i);
                    html += '<div data-role="collapsible"><h3>'+ expGroup.expGroupName + '</h3><ul id="list'+expGroup.expGroupNumber+'" class="expList" data-role="listview">';
                    getAllExpFromGroup(expGroup.expGroupNumber, function (res){
                        for(var e=0; e<res.length; e++){
                        (function(e){
                            var exp = res.item(e);
                            var li = "";
                            if(exp.expIsActive == 1){
                                $('#list'+expGroup.expGroupNumber).append('<li data-icon="false"><a href="#" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');
                                //li += '<li><a href="#experimentPage" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>';
                            } else {
                                $('#list'+expGroup.expGroupNumber).append('<li>'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>');
                                //li += '<li>'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>';
                            }
                        })(e);
                        }
                        if(i == expGroups.length-1){
                            $('ul[data-role=listview]').listview('refresh');
                            // Wechsel zu Experimentliste ALT
                            //$(':mobile-pagecontainer').pagecontainer('change', '#expListAllPage', {});
                        }
                    });
                    html += '</ul></div>';
                })(i);
            }
            $('#expListAll').append(html).enhanceWithin();

            $("#expListAll").delegate("li a", "click", function (){
                localStorage.setItem("expGroupNumber", $(this).jqmData('expgroupnumber'));
                localStorage.setItem("expNumber", $(this).jqmData('expnumber'));
                getExp(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"), function(result){                   
                    localStorage.setItem("expId", result.id);
                    localStorage.setItem("expName", result.expName);
                    $(':mobile-pagecontainer').pagecontainer('change', '#startPage');                
                });        
            });
        });

    });

    /*
    // Add Navbar Footer to expListFavPage
    $.mobile.document.on('pagecreate', '#expListFavPage', function(e) {
        e.preventDefault();
        addExpListFooterNavbar(e.target.id);
        addExpListContextMenuButton(e.target.id);
        //addExpListContextMenu(e.target.id);
    });
    */
    
    
    // Favoritenliste
    $.mobile.document.on('pagebeforeshow', '#expListFavPage', function(e) {
        e.preventDefault();
        $('#expListFav').empty();
        checkUserLogin();
        getFavExp(function (res){
            if(res.length != 0){
                for(var e=0; e<res.length; e++){
                    var exp = res.item(e);
                    if(exp.expIsActive == 1){
                        $('#expListFav').append('<li><a href="#experimentPage" data-expGroupNumber="'+exp.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ exp.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');
                    } else {
                        $('#expListFav').append('<li>'+ exp.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>');
                    }
                }
                $('#expListFav').listview('refresh');
            } else {
                $('#expListFav').append('<li>Es wurden noch keine Versuche als Favorit gespeichert.</li>');
                $('#expListFav').listview('refresh');
            }
        });
    });
    
    // Diese Funktion wird im Moment nicht genutzt. Inhalt ist in pagecreate expListAll zu finden.
    function createExpListAll(){
        getExpGroups(function (expGroups){
            var html = '';
            for(var i=0; i<expGroups.length; i++) {
                (function(i){
                    var expGroup = expGroups.item(i);
                    html += '<div data-role="collapsible"><h3>'+ expGroup.expGroupName + '</h3><ul id="list'+expGroup.expGroupNumber+'" class="expList" data-role="listview">';
                    getAllExpFromGroup(expGroup.expGroupNumber, function (res){
                        for(var e=0; e<res.length; e++){
                        (function(e){
                            var exp = res.item(e);
                            var li = "";
                            if(exp.expIsActive == 1){
                                $('#list'+expGroup.expGroupNumber).append('<li><a href="#experimentPage" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');
                                //li += '<li><a href="#experimentPage" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>';
                            } else {
                                $('#list'+expGroup.expGroupNumber).append('<li>'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>');
                                //li += '<li>'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>';
                            }
                        })(e);
                        }
                        if(i == expGroups.length-1){
                            $('ul[data-role=listview]').listview('refresh');
                            // Wechsel zu Experimentliste ALT
                            //$(':mobile-pagecontainer').pagecontainer('change', '#expListAllPage', {});
                        }
                    });
                    html += '</ul></div>';
                })(i);
            }
            $('#expListAll').append(html).enhanceWithin();
        });
    }

    function fillExpSelect(){

        getExpGroups(function (expGroups){                                    
            for(var i=0; i<expGroups.length; i++){
                var expGroup = expGroups.item(i);
                $('#expSelect2').append('<optgroup label="'+expGroup.expGroupName+'" id="expOptGroup-'+expGroup.expGroupNumber+'" />');
                //console.log(expGroup.expGroupName);
                getAllExpFromGroup(expGroup.expGroupNumber, function (res){                    
                    for(var e=0; e<res.length; e++){
                        var exp = res.item(e);
                        $('#expOptGroup-1').append('<option value="'+exp.expNumber+'">'+exp.expName+'</option>');
                        //$('#expOptGroup-'+exp.expGroupNumber).append(new Option("expOpt-"+exp.expGroupNumber+"."+exp.expNumber, exp.expGroupNumber+"."+exp.expNumber+" "+exp.expName));
                        //$('#expOptGroup-'+exp.expGroupNumber).append('<option value="'+exp.expGroupNumber+'.'+exp.expNumber+'>'+exp.expGroupNumber+'.'+exp.expNumber+' '+exp.expName+'</option>');
                        //console.log(exp.expName);
                    }
                    $("#expSelect2").trigger("change");                    
                    $("#expSelect2").selectmenu("refresh");
                    $('#startPage').page();
                });
                $("#expSelect2").trigger("change");
                $("#expSelect2").selectmenu("refresh");
                $('#startPage').page();               
            }           
        });                
        
            /*
                    
            var html = '';
            for(var i=0; i<expGroups.length; i++) {
                (function(i){
                    var expGroup = expGroups.item(i);
                    html += '<optgroup id="optgroup-'+expGroup.expGroupNumber+'" label="'+expGroup.expGroupName+'"></optgroup>';
                    //console.log(expGroup.expGroupName);
                    getAllExpFromGroup(expGroup.expGroupNumber, function (res){
                        for(var e=0; e<res.length; e++){
                        (function(e){
                            var exp = res.item(e);
                            //var li = "";
                            if(exp.expIsActive == 1){
                                
                                //$('#ostgroup-'+expGroup.expGroupNumber).append('<option data-icon="false" value="">'+exp.expGroupNumber+'.'+exp.expNumber+' '+exp.expName+'</option>');
                                //li += '<li><a href="#experimentPage" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>';
                            } else {
                            
                                //$('#list'+expGroup.expGroupNumber).append('<li>'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>');
                                //li += '<li>'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>';
                            }
                        })(e);
                        }
                        if(i == expGroups.length-1){
                            //$('ul[data-role=listview]').listview('refresh');
                            $('#expSelect').listview('refresh');
                            // Wechsel zu Experimentliste ALT
                            //$(':mobile-pagecontainer').pagecontainer('change', '#expListAllPage', {});
                        }
                    });
                    //html += '</ul></div>';
                })(i);
            }
            console.log(html);            
            $('#expSelect').selectmenu("refresh");
            */
            
            /*
            $("#expListAll").delegate("li a", "click", function (){
                localStorage.setItem("expGroupNumber", $(this).jqmData('expgroupnumber'));
                localStorage.setItem("expNumber", $(this).jqmData('expnumber'));
                getExp(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"), function(result){
                    localStorage.setItem("expId", result.id);
                    localStorage.setItem("expName", result.expName);
                    $(':mobile-pagecontainer').pagecontainer('change', '#startPage');
                });
            });
            */          
    }