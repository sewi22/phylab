
    $.mobile.document.on('pagecreate', '#contactPage', function(e) {
        e.preventDefault();        
        $("#contactHeadline").html("Kontakt");
        var contactform = '';
        contactform += '<form id="contactform" action="'+apidomain+'/sendmail" method="post">';
        contactform += '<select name="recipient" id="recipient">';
        contactform += '</select>';

        contactform += '<div id="contactData" style="display:none">';
        contactform += '<label for="name">Name:</label>';
        contactform += '<input type="text" id="name" disabled="disabled" />';
        contactform += '<label for="email">Email:</label>';
        contactform += '<input type="email" id="email" disabled="disabled" />';
        contactform += '</div>';        
        contactform += '<label id="anonymousLabel"><input type="checkbox" id="anonymousCheckbox" disabled="disabled" checked="checked">anonym senden</label>';
        contactform += '<label for="subject">Betreff:</label>';
        contactform += '<input name="subject" id="subject" />';
        contactform += '<label for="message">Nachricht:</label>';
        contactform += '<textarea name="text" id="message" required ></textarea>';
        contactform += '<input type="submit" id="submit" value="Absenden"/>';
        contactform += '</form>';
        $("#contactContent").append(contactform);
        $("#contactContent").enhanceWithin();         	        

        $("#contactform").submit(function(){          
            if($("#message").val().length >= 1 && $("#subject").val().length >= 1){
                //$.mobile.loading("show");
                if(checkConnection()){                                  
                $.mobile.loading("show", {text: "Nachricht wird gesendet.", textVisible: true});
                $.ajax({
                    type: "POST",
                    url: apidomain+"/sendmail",
                    //data: "recipient=" + $("#recipient").val() + "&name=" + $("#name").val() + "&email=" + $("#email").val() + "&subject=" + $("#subject").val() + "&message=" + $("#message").val(),
                    data:{
                        recipient: $("#recipient").val(),
                        name: $("#name").val(),
                        email: $("#email").val(),
                        subject: $("#subject").val(),
                        message: $("#message").val(),                        
                    }, 
                    success: function(suc){
                        $.mobile.loading("hide");
                        $("#submit").button("disable");
                        $("#recipient").val('');
                        $("#name").val('');
                        $("#email").val('');
                        $("#subject").val('');
                        $("#message").val('');                        
                        navigator.notification.alert(suc.message, function(){$("#submit").button("enable"); $(':mobile-pagecontainer').pagecontainer('change', '#startPage');}, 'Kontakt', 'OK');
                        //alert(suc.message);
                    },
                    error: function(err){
                        $.mobile.loading("hide");
                        navigator.notification.alert(err.message, function(){$("#submit").button("enable");}, 'Kontakt', 'OK');
                        //alert(err.message);
                    },
                    timeout:2000
                });
                } else {
                    navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){$("#submit").button("enable");}, 'Kontakt', 'OK');    
                }
            } else {
                navigator.notification.alert('Bitte füllen Sie die Felder Betreff und Nachricht aus.', function(){$("#submit").button("enable");}, 'Kontakt', 'OK');
            }

            return false;
        });
    });
    
    $.mobile.document.on('pagebeforeshow', '#contactPage', function(e){
        e.preventDefault();
        addSelectOptions();
                                  
        if(localStorage.username && localStorage.apiKey){            
            $("#submit").button("enable");
            $("#contactData").show();
            $("#name").val(localStorage.username);
            $("#email").val(localStorage.mail);
            $("#subject").val("");
            $("#message").val("");            
            $("#anonymousCheckbox").prop('disabled', false).checkboxradio('refresh');    
            $("#anonymousCheckbox").prop('checked', false).checkboxradio('refresh');                                         
        } else {
            $("#submit").button("enable");
            $("#contactData").hide();
            $("#name").val("");
            $("#email").val("");
            $("#subject").val("");
            $("#message").val("");
            $("#anonymousCheckbox").prop('disabled', true).checkboxradio('refresh');
            $("#anonymousCheckbox").prop('checked', true).checkboxradio('refresh');
        }
        checkUserLogin();
    });
    
    $.mobile.document.on('click', '#anonymousLabel', function(e){
        e.preventDefault();                
        $("#contactData").slideToggle("fast");        
        if($("#anonymousCheckbox").is(':checked')){            
            $("#anonymousCheckbox").prop('checked', false).checkboxradio('refresh');                              
            $("#name").val(localStorage.username);
            $("#email").val(localStorage.mail);
        } else {                                    
            $("#anonymousCheckbox").prop('checked', true).checkboxradio('refresh');
            $("#name").val("");
            $("#email").val("");
        }
    });
    
    function addSelectOptions(){                                 
        $('#recipient').empty();
        var optDev = '<option value="dev">An Entwickler</option>';
        var optDoz = '<option value="doz">An Dozent</option>';
        $('#recipient').append(optDev);
        $('#recipient').append(optDoz);
        
        var selectedOpt = $($("option", $('#recipient')).get(0));
        selectedOpt.attr('selected', 'selected');
        
        $('#recipient').selectmenu();
        $('#recipient').selectmenu('refresh', true);
    }
    