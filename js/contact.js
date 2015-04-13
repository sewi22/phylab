
    $.mobile.document.on('pagecreate', '#contactPage', function(e) {
        e.preventDefault();        
        $("#contactHeadline").html("Kontakt");
        var contactform = '';
        contactform += '<form id="contactform" action="'+apidomain+'/sendmail" method="post">';
        contactform += '<select name="recipient" id="recipient">';
        contactform += '<option value="dev">An Entwickler</option>';
        contactform += '<option value="doz">An Dozent</option>';
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

            if($("#message").val().length >= 10){
                $.ajax({
                    type: "POST",
                    url: apidomain+"/sendmail",
                    data: "recipient=" + $("#recipient").val() + "&name=" + $("#name").val() + "&email=" + $("#email").val() + "&subject=" + $("#subject").val() + "&message=" + $("#message").val(),
                    success: function(msg){
                        $("#submit").button("disable");
                        $("#recipient").val('');
                        $("#name").val('');
                        $("#email").val('');
                        $("#subject").val('');
                        $("#message").val('');

                        okDialog(msg, function(){$("#submit").button("enable"); $(':mobile-pagecontainer').pagecontainer('change', '#startPage');});
                    },
                    error: function(err){
                        okDialog(err, function(){$("#submit").button("enable");});
                    }
                });
            } else {
                okDialog("Die Nachricht ist zu kurz", function(){});
            }

            return false;
        });
    });
    
    $.mobile.document.on('pagebeforeshow', '#contactPage', function(e){
        e.preventDefault();                           
        if(sessionStorage.username && sessionStorage.usermail){
            console.log("userdata vorhanden");
            $("#contactData").show();
            $("#name").val(sessionStorage.username);
            $("#email").val(sessionStorage.usermail);            
            $("#anonymousCheckbox").prop('disabled', false).checkboxradio('refresh');    
            $("#anonymousCheckbox").prop('checked', false).checkboxradio('refresh');                                         
        } else {
            $("#contactData").hide();
            $("#name").val("");
            $("#email").val("");
            $("#anonymousCheckbox").prop('disabled', true).checkboxradio('refresh');
            $("#anonymousCheckbox").prop('checked', true).checkboxradio('refresh');
        }
    });
    
    $.mobile.document.on('touchend', '#anonymousLabel', function(e){
        e.preventDefault();                
        $("#contactData").slideToggle("fast");        
        if($("#anonymousCheckbox").is(':checked')){            
            $("#anonymousCheckbox").prop('checked', false).checkboxradio('refresh');                              
            $("#name").val(sessionStorage.username);
            $("#email").val(sessionStorage.usermail);
        } else {                                    
            $("#anonymousCheckbox").prop('checked', true).checkboxradio('refresh');
            $("#name").val("");
            $("#email").val("");
        }
    });
    