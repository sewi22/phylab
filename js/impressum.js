    
    $.mobile.document.on('pagecreate', '#impressumPage', function(e) {
        e.preventDefault();
        $("#impressumHeadline").html("Impressum");
        var appendText = '';
        appendText += '<h4 class="textheader">Ersteller:</h4>Sebastian Winterling<br/>';
        appendText += '<h4 class="textheader">Kontakt:</h4>sebastian.winterling@iem.thm.de<br/>';
        appendText += '<h4 class="textheader"><p>Weitere Informationen:</h4>Diese Anwendung wurde im Rahmen einer Masterarbeit des Studienganges &quot;Medieninformatik&quot; an der Technischen Hochschule Mittelhessen erstellt.</p><p>Sollten Sie Fragen, Anregungen o.ä. haben, nutzen Sie bitte die o.g. Kontaktinformationen.</p>';
        $("#impressumContent").append(appendText);
    });
    
    
    $.mobile.document.on('pagebeforeshow', '#impressumPage', function(e){
        e.preventDefault();
    });