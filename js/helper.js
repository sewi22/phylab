    
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }    
    
    function convertTimestamp(ts) {        
        var day  = ts.substr(8,2);  var month = ts.substr(5,2);  var year = ts.substr(0,4);    
        var hour = ts.substr(11,2); var min   = ts.substr(14,2); var sec  = ts.substr(17,2);        
        return day+"."+month+"."+year+" "+hour+":"+min;
    }

    function confirmDialog(text, callback){
        var popupDialogId = 'confirmDialog';
        $('<div data-role="popup" id="'+popupDialogId+'" data-confirmed="no" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:500px;"><div role="main" class="ui-content"><h3 class="ui-title">'+text+'</h3><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionCancel" data-rel="back" data-transition="flow">Nein</a><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionConfirm" data-rel="back">Ja</a></div></div>').appendTo($.mobile.pageContainer);

        var popupDialogObj = $('#' + popupDialogId);
        popupDialogObj.trigger('create');
        popupDialogObj.popup({
            afterclose: function (event, ui) {
                popupDialogObj.find(".optionConfirm").first().off('click');
                var isConfirmed = popupDialogObj.attr('data-confirmed') === 'yes' ? true : false;
                $(event.target).remove();
                if (isConfirmed && callback) {
                    callback();
                }
            }
        });

        popupDialogObj.popup('open');
        popupDialogObj.find(".optionConfirm").first().on('click', function () {
            popupDialogObj.attr('data-confirmed', 'yes');
        });
    }
    
    function okDialog(text, callback){
        var popupDialogId = 'okDialog';
        $('<div data-role="popup" id="'+popupDialogId+'" data-confirmed="no" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:500px;"><div role="main" class="ui-content"><h3 class="ui-title">'+text+'</h3><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionConfirm" data-rel="back">OK</a></div></div>').appendTo($.mobile.pageContainer);

        var popupDialogObj = $('#' + popupDialogId);
        popupDialogObj.trigger('create');
        popupDialogObj.popup({
            afterclose: function (event, ui) {
                popupDialogObj.find(".optionConfirm").first().off('click');
                var isConfirmed = popupDialogObj.attr('data-confirmed') === 'yes' ? true : false;
                $(event.target).remove();
                if (isConfirmed && callback) {
                    callback();
                }
            }
        });

        popupDialogObj.popup('open');
        popupDialogObj.find(".optionConfirm").first().on('click', function () {
            popupDialogObj.attr('data-confirmed', 'yes');
        });
    }
    