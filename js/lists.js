
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
                                $('#list'+expGroup.expGroupNumber).append('<li><a href="#detailsPage" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');
                                //li += '<li><a href="#detailsPage" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>';                                
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
    