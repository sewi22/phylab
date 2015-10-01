    
    $.mobile.document.on('pagecreate', '#impressumPage', function(e) {
        e.preventDefault();
        $("#impressumHeadline").html("Impressum");
        var appendText = '';
        appendText += '<h4 class="textheader">Autor:</h4>Sebastian Winterling, B. Sc.<br/>';
        appendText += '<h4 class="textheader">Kontakt:</h4>sebastian.winterling@iem.thm.de<br/>';
        appendText += '<h4 class="textheader"><p>Weitere Informationen:</h4>Diese Anwendung wurde im Rahmen einer Masterarbeit des Studienganges &quot;Medieninformatik&quot; an der Technischen Hochschule Mittelhessen erstellt.</p><p>Sollten Sie Fragen, Anregungen o.ä. haben, nutzen Sie bitte die o.g. Kontaktinformationen.</p>';
        appendText += '<h4 class="textheader"><p>Datenschutz:</h4>Der Login erfolgt über das Central Authentication System (CAS) der THM. Dabei werden persönliche Daten wie Vor- und Zuname, Benutzername und Emailadresse übertragen.<br/>Es erfolgt keine Speicherung weiterer Daten oder Passwörter.';
        appendText += '<h4 class="textheader"><p>Rechtliches:</h4>Icons made by <a href="http://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>';

        $("#impressumContent").append(appendText);
    });
    
    
    $.mobile.document.on('pagebeforeshow', '#impressumPage', function(e){
        e.preventDefault();
        checkUserLogin();
    });