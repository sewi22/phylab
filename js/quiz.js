
    // TODO: Anzeige auf 10 Fragen beschränken oder Höchstzahl der vorhandenen Fragen, dass Auswertung anzeigen

    $.mobile.document.on('pagecreate', '#quizPage', function(e){
        e.preventDefault();
        addContextMenuButton(e.target.id);
        //addExpFooterNavbar(e.target.id);
    });
    
    $.mobile.document.on('pagecreate', '#quizFormPage', function(e){
        e.preventDefault();        
        //addContextMenuButton(e.target.id);        
    });
    
    // Create QuizPage before show
    $(document).on('pagebeforeshow', '#quizPage', function(e) {
        if(checkConnection()){
            fillQuestionTable();
            fillAnswerTable();
        } else {
            navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');
        }
        var expGroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");
        var headline = "Quiz";
        $("#quizHeadline").html(headline);
        fillContextMenu(function(link){            
            link += '<a href="#" id="contextMenuBackButton" data-theme="a" data-role="button">zur&uuml;ck</a>';
            if(localStorage.username && localStorage.apiKey){
                link += '<a href="#" id="contextMenuAddQuiz" data-role="button">Frage erstellen</a>';    
            }            
            return link;
        });
        $("#quizContent").empty();
        checkUserLogin();
        getQuizQuestions(expGroupNumber, expNumber, function(questions){

            if(questions.length == 0){
                // Alle Fragen wurden beantwortet, Erstellen einer Quiz Auswertung

                getAllQuestionsForExp(expGroupNumber, expNumber, function(allQ){

                    if(allQ.length == 0){
                        // Es existieren keine Fragen zu diesem Experiment                        
                        $("#quizContent").append('<ul><li>Zu diesem Versuch wurden noch keine Fragen erstellt.</li></ul>');
                        $('#quizContent').enhanceWithin();                       
                    } else {
                        // Erstellung der Fragen-Auswertung zu diesem Experiment
                        countQ = allQ.length; // Anzahl aller Fragen zu diesem Experiment

                        //$("#quizContent").append('Sie haben <span id="quizPercent"></span>% der Fragen richtig beantwortet');
                        $("#quizContent").append('<ul data-role="listview" id="quizResultList" data-inset="true"></ul>');
                        $("#quizContent").append('<a href="#" data-role="button" id="quizResetButton">Antworten l&ouml;schen</a>').enhanceWithin();
                        $('#quizResultList').removeClass('ui-shadow');
                        for(var i=0; i<countQ; i++){
                            $("#quizResultList").append('<li id="quizResultListItem-'+allQ.item(i).id+'" class="ui-body ui-body-a ui-corner-all"><h2>'+allQ.item(i).question+'</h2></li>');

                            qId = allQ.item(i).id;

                            getQuestionsAnswers(qId, function(qa){
                                countA = qa.length;
                                qId = qa.questionId;

                                rightAnswers = [];
                                rightAnswerIds = [];
                                givenAnswers = [];
                                givenAnswerIds = [];

                                for(var ind=0; ind<countA; ind++){
                                    ans = qa.item(ind);                                    
                                    if(ans.questionType == "mc"){

                                        if(ans.answerIsCorrect == 1){
                                            rightAnswerIds.push(ans.aid);
                                            rightAnswers.push(ans.answer);
                                        }

                                        if(ind == 0){
                                            var givenAnswerIds = ans.givenAnswerId.split(',');
                                            for(var i=0; i<givenAnswerIds.length;i++) givenAnswerIds[i] = parseInt(givenAnswerIds[i], 10);
                                        }

                                        if(givenAnswerIds.indexOf(ans.aid) != -1){
                                            givenAnswers.push(ans.answer);
                                        }

                                        if(ind == countA-1){
                                            if($(givenAnswerIds).not(rightAnswerIds).length === 0 && $(rightAnswerIds).not(givenAnswerIds).length === 0){
                                                // Both Arrays are the same
                                                allA = rightAnswers.join(", ");
                                                $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.aid+'"><strong>Antworten: '+allA+'</strong></p>');
                                                $("#quizResultListItem-"+ans.questionId).addClass('quiz_result_right');
                                            } else {
                                                // Arrays are different
                                                allGA = givenAnswers.join(", ");
                                                $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.aid+'"><strong>Gegebene Antworten: '+allGA+'</strong></p>');
                                                allRA = rightAnswers.join(", ");
                                                $("#quizResultListItem-"+ans.questionId).append('<p class="correctAnswer" data-answer="'+ans.aid+'"><strong>Richtige Antworten: '+allRA+'</strong></p>');
                                                $("#quizResultListItem-"+ans.questionId).addClass('quiz_result_wrong');
                                            }
                                        }

                                    } else if (ans.questionType == "text") {

                                        rightAnswers.push(ans.answer);                                        
                                        
                                        if(ind == countA-1){                                        
                                            var a = 0;
                                            while (a < rightAnswers.length){

                                                var cmp1 = rightAnswers[a].toLowerCase().replace(/[\!|\?|\-|\_|\<|\>|\#|\+|\*|\=|\/|\&|\%|\$|\§|\s]+/g, '');
                                                var cmp2 = ans.givenAnswerText.toLowerCase().replace(/[\!|\?|\-|\_|\<|\>|\#|\+|\*|\=|\/|\&|\%|\$|\§|\s]+/g, '');

                                                if(cmp1 == cmp2){
                                                    $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.aid+'"><strong>Antwort: '+ans.givenAnswerText+'</strong></p>');
                                                    $("#quizResultListItem-"+ans.questionId).addClass('quiz_result_right');
                                                    break;                                                
                                                } else if (a  == rightAnswers.length-1) {
                                                    $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.aid+'"><strong>Gegebene Antwort: '+ans.givenAnswerText+'</strong></p>');
                                                    $("#quizResultListItem-"+ans.questionId).append('<p class="correctAnswer" data-answer="'+ans.aid+'"><strong>Richtige Antwort: '+rightAnswers[0]+'</strong></p>');
                                                    $("#quizResultListItem-"+ans.questionId).addClass('quiz_result_wrong');
                                                }
                                                a++;
                                            }
                                        }

                                    } else if (ans.questionType == "number") {
                                        var max = ans.answerNumber + ans.plus;
                                        var min = ans.answerNumber - ans.minus;

                                        if(ans.givenAnswerNumber >= min && ans.givenAnswerNumber <= max){
                                            $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.id+'"><strong>Antwort: '+ans.givenAnswerNumber+'</strong></p>');
                                            $("#quizResultListItem-"+ans.questionId).addClass('quiz_result_right');
                                        } else {
                                            $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.id+'"><strong>Gegebene Antwort: '+ans.givenAnswerNumber+'</strong></p>');
                                            $("#quizResultListItem-"+ans.questionId).append('<p class="correctAnswer" data-answer="'+ans.id+'"><strong>Richtige Antwort: '+ans.answerNumber+'</strong></p>');
                                            $("#quizResultListItem-"+ans.questionId).addClass('quiz_result_wrong');
                                        }

                                    } else {
                                        alert("Unbekannter Quiztyp!");
                                        console.log("Unbekannter Quiztyp!");
                                    }
                                }
                            });                            
                        }
                    }
                });

            } else {
                // Anzeigen einer Frage
                var rand = Math.floor(Math.random() * (questions.length-1 - 0 + 1)) + 0;
                var question = questions.item(rand);                
                $("#quizContent").append(question.question);                
                if (question.questionType == "mc") {
            
                    getQuestionsAnswers(question.id, function(answers){                        
                        answersArr = new Array();                                                
                        for(var a=0; a<answers.length; a++){                          
                            answersArr[a] = {
                                id: answers.item(a).aid,
                                answer: answers.item(a).answer,
                                answerIsCorrect: answers.item(a).answerIsCorrect,
                                helpText: answers.item(a).helpText,
                                questionId: answers.item(a).questionId
                            }
                        }                                                                                                        
                        answersArr = shuffle(answersArr);                                     
                                                
                        var html = '';                        
                        html += '<form><fieldset id="quizCheckboxGroup" data-role="controlgroup">';                        
                        for(var i=0; i<answersArr.length; i++){                                                                                                                                                              
                                                    
                            var ans = answersArr[i];                            
                            html += '<input type="checkbox" name="quizCheckbox-'+ans.id+'" id="quizCheckbox-'+ans.id+'" value="'+ans.id+'" questionId="'+question.id+'"><label for="quizCheckbox-'+ans.id+'">'+ans.answer+'</label>'; 
                        }
               
                        html += '</fieldset></form>';                                           
                        html += '<a href="#" data-role="button" data-questiontype="mc" id="quizCheckButton">Antwort pr&uuml;fen</a>';                        
                        $("#quizContent").append(html);
                        $("#quizContent").enhanceWithin();
                    });
                } else if (question.questionType == "text") {
                    // Darstellung einer Freitext Frage
                    $("#quizContent").append('<input type="text" value="" id="quizInputText" questionId="'+question.id+'">').enhanceWithin();
                    $("#quizContent").append('<a href="#" data-role="button" data-questiontype="text" id="quizCheckButton">Antwort pr&uuml;fen</a>').enhanceWithin();
                } else if (question.questionType == "number") {
                    // Darstellung einer Number Frage
                    $("#quizContent").append('<input type="number" value="" id="quizInputNumber" questionId="'+question.id+'">').enhanceWithin();
                    $("#quizContent").append('<a href="#" data-role="button" data-questiontype="number" id="quizCheckButton">Antwort pr&uuml;fen</a>').enhanceWithin();
                } else {
                    alert("Unbekannter Quiztyp!");
                    console.log("Unbekannter Quiztyp!");
                }
            }
        });
    });

    // Auswertung einer Frage bei Click on quizCheckButton
    $(document).on("click", "#quizCheckButton", function(){

        var quiztype = $("#quizCheckButton").attr("data-questiontype");

        if (quiztype == "mc") {                        
            var answerIds = [];
            var questionId = $('input[type=checkbox]:checked', '#quizCheckboxGroup').attr('questionId');

            $("input:checkbox[type=checkbox]:checked").each(function() {
                answerIds.push($(this).val());
            });

            if(answerIds.length != 0) {

                setGivenAnswerMc(questionId, answerIds.join(","));
                $("#quizCheckboxGroup").addClass("ui-disabled");

                getQuestionsAnswers(questionId, function(answers){

                    for(var i=0; i<answers.length; i++){
                        if(answerIds.indexOf(answers.item(i).aid.toString()) != -1){
                            if(answers.item(i).answerIsCorrect == 1){
                                // Richtige Antwort, die ausgewählt wurde
                                var label = $('#quizCheckbox-'+answers.item(i).aid).prop('labels');
                                $(label).addClass('rightanswer');
                            } else {
                                // Falsche Antwort, die ausgewählt wurde
                                var label = $('#quizCheckbox-'+answers.item(i).aid).prop('labels');
                                $(label).addClass('wronganswer');
                            }
                        } else {
                            if(answers.item(i).answerIsCorrect == 1){
                                // Richtige Antwort, die nicht ausgewählt wurde
                                var label = $('#quizCheckbox-'+answers.item(i).aid).prop('labels');
                                $(label).addClass('otheranswer');
                            } else {
                                // Falsche Antwort, die nicht ausgewählt wurde
                                //var label = $('#quizCheckbox-'+answers.item(i).aid).prop('labels');
                                //$(label).addClass('rightanswer');
                            }
                        }
                    }
                });
                $("#quizCheckButton").remove();
                $("#quizContent").append('<a href="#quizPage" data-role="button" id="quizNextButton">Weiter</a>').enhanceWithin();
            } else {                                
                navigator.notification.alert('Bitte w&auml;hlen Sie eine Antwort aus.', null, 'Fehler', 'OK');                                                            
            }

        } else if (quiztype == "text") {

            var answer = $("#quizInputText").val();
            var questionId = $('#quizInputText').attr('questionId');

            if (answer != "") {
                setGivenAnswerText(questionId, answer);
                $("#quizInputText").addClass("ui-disabled");

                getQuestionsAnswers(questionId, function(answers){
                    var a = 0;
                    while(a<answers.length){
                        var cmp1 = answers.item(a).answer.toLowerCase().replace(/[\!|\?|\-|\_|\<|\>|\#|\+|\*|\=|\/|\&|\%|\$|\§|\s]+/g, '');
                        var cmp2 = answer.toLowerCase().replace(/[\!|\?|\-|\_|\<|\>|\#|\+|\*|\=|\/|\&|\%|\$|\§|\s]+/g, '');
                        if(cmp1 == cmp2){
                            $("#quizInputText").addClass("rightanswer");
                            break;
                        } else {
                            if(a == answers.length-1){
                                $("#quizInputText").addClass("wronganswer");
                            }
                        }
                        a++;
                    }
                });

                $("#quizCheckButton").remove();
                $("#quizContent").append('<a href="#quizPage" data-role="button" id="quizNextButton">Weiter</a>').enhanceWithin();

            }  else {                
                navigator.notification.alert('Bitte geben Sie eine Antwort ein.', null, 'Fehler', 'OK');                                                         
            }

        } else if (quiztype == "number") {

            var answer = $("#quizInputNumber").val();
            var questionId = $('#quizInputNumber').attr('questionId');

            if (answer != "") {

                setGivenAnswerNumber(questionId, answer);
                $("#quizInputNumber").addClass("ui-disabled");

                getQuestionsAnswers(questionId, function(answers){
                    var max = answers.item(0).answerNumber + answers.item(0).plus;
                    var min = answers.item(0).answerNumber - answers.item(0).minus;

                    if(answer >= min && answer <= max){
                        $("#quizInputNumber").addClass("rightanswer");
                    } else {
                        $("#quizInputNumber").addClass("wronganswer");
                    }
                });

                $("#quizCheckButton").remove();
                $("#quizContent").append('<a href="#quizPage" data-role="button" id="quizNextButton">Weiter</a>').enhanceWithin();

            }  else {                
                navigator.notification.alert('Bitte geben Sie eine Antwort ein.', null, 'Fehler', 'OK');                                            
            }

        } else {
            alert("Unbekannter Quiztyp!");
            console.log("Unbekannter Quiztyp!");
        }
    });
    
    
    $(document).on('pagebeforeshow', '#quizFormPage', function(e) {
        // Formular für Fragen
        $("#quizFormHeadline").html("Frage erstellen");
        $("#quizFormContent").empty();
        var quizform = '';
        quizform += '<form id="quizform">';
        quizform += '<select name="quiztypes" id="quiztypes">';
        quizform += '</select>';
        quizform += '<label id="question-label" for="question-input">Frage:</label>';
        quizform += '<input name="question-input" id="question-input" type="text">';
        
        // Multiple Choice
        quizform += '<div id="mc-form">';
	    quizform += '<div class="ui-grid-a quiz-mc-header">';
        quizform += '<div class="ui-block-a"></div>';
        quizform += '<div class="ui-block-b">Antwort</div>';
        quizform += '<div class="ui-block-c">Richtig?</div>';
        quizform += '</div>';

	    quizform += '<div class="ui-grid-a quiz-mc-grid">';
        quizform += '<div class="grid-row">';
        quizform += '<div class="ui-block-a">';
        quizform += '<button type="button" class="deleteMcAnswer ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">Delete</button>';
        quizform += '</div>';
        quizform += '<div class="ui-block-b">';
        quizform += '<input class="quiz-mc-input" type="text">';
        quizform += '</div>';
        quizform += '<div class="ui-block-c">';
        quizform += '<select id="flip-select" name="flip-select" data-role="flipswitch">';
        quizform += '<option value="0">Nein</option>';
        quizform += '<option value="1">Ja</option>';
        quizform += '</select>';
        quizform += '</div>';
        quizform += '</div>';
        quizform += '</div>';
        quizform += '<div class="ui-grid-b quiz-mc-button">';
        quizform += '<div class="ui-block-d"><input type="button" id="addMcAnswer" value="weitere Antwort"/></div>';
        quizform += '<div class="ui-block-d"><input type="submit" id="submit" value="Senden"/></div>';
        quizform += '</div>';
        quizform += '</div>';

        // Freier Text
        quizform += '<div id="text-form" style="display:none;">';
        quizform += '<div class="ui-grid-a quiz-text-header">';
        quizform += '<div class="ui-block-a"></div>';
        quizform += '<div class="ui-block-b">Richtige Antworten:</div>';
        quizform += '</div>';

	    quizform += '<div class="ui-grid-b quiz-text-grid">';
        quizform += '<div class="grid-row">';
        quizform += '<div class="ui-block-a">';
        quizform += '<button type="button" class="deleteMcAnswer ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">Delete</button>';
        quizform += '</div>';
        quizform += '<div class="ui-block-b">';
        quizform += '<input class="quiz-text-input" type="text">';
        quizform += '</div>';
        quizform += '</div>';
        quizform += '</div>';
        
        quizform += '<div class="ui-grid-b quiz-text-button">';
        quizform += '<div class="ui-block-d"><input type="button" id="addTextAnswer" value="Antwort hinzuf&uuml;gen"/></div>';
        quizform += '<div class="ui-block-d"><input type="submit" id="submit" value="Frage senden"/></div>';
        quizform += '</div>';
        quizform += '</div>';

        // Nummerneingabe
        quizform += '<div id="number-form" style="display:none;">';
        quizform += '<div class="ui-grid-a quiz-number-grid">';
        quizform += '<div class="ui-block-a">korrekter Wert:</div>';
        quizform += '<div class="ui-block-b"><input id="quiz-number-input" type="tel"></div>';
        quizform += '<div class="ui-block-a">pos. Abweichung:</div>';
        quizform += '<div class="ui-block-b"><input id="quiz-plus-input" type="tel"></div>';
        quizform += '<div class="ui-block-a">neg. Abweichung:</div>';
        quizform += '<div class="ui-block-b"><input id="quiz-minus-input" type="tel"></div>';
        quizform += '</div>';                                                    

        quizform += '<div class="ui-grid-c quiz-number-button">';        
        quizform += '<div class="ui-block-d"><input type="submit" id="submit" value="Frage senden"/></div>';
        quizform += '</div>';        
        quizform += '</div>';
        quizform += '</form>';
        $("#quizFormContent").append(quizform);
        addQuizTypes();
        $("#quizFormContent").enhanceWithin();                        
    });

    $(document).on("click", ".deleteMcAnswer", function(e){
        var deleteObj = e.target.parentElement.parentElement;
        $(deleteObj).remove();
        $("#quizFormContent").enhanceWithin();
    });
        
    $(document).on("click", "#addMcAnswer", function(){            
        var answer = '';
        answer += '<div class="grid-row">';
        answer += '<div class="ui-block-a">';
        answer += '<button type="button" class="deleteMcAnswer ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">Delete</button>';
        answer += '</div>';
        answer += '<div class="ui-block-b">';
        answer += '<input class="quiz-mc-input">';
        answer += '</div>';
        answer += '<div class="ui-block-c">';
        answer += '<select id="flip-select" name="flip-select" data-role="flipswitch">';
        answer += '<option value="0">Nein</option>';
        answer += '<option value="1">Ja</option>';
        answer += '</select>';
        answer += '</div>';
        answer += '</div>';
        $(".quiz-mc-grid").append(answer);
        $(".quiz-mc-grid").enhanceWithin();
    });

    $(document).on("click", ".deleteTextAnswer", function(e){
        var deleteObj = e.target.parentElement.parentElement;
        $(deleteObj).remove();
        $("#quizFormContent").enhanceWithin();
    });

    $(document).on("click", "#addTextAnswer", function(){
        var answer = '';
        answer += '<div class="grid-row">';
        answer += '<div class="ui-block-a">';
        answer += '<button type="button" class="deleteTextAnswer ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all">Delete</button>';
        answer += '</div>';
        answer += '<div class="ui-block-b">';
        answer += '<input class="quiz-text-input">';
        answer += '</div>';
        answer += '</div>';
        $(".quiz-text-grid").append(answer);
        $(".quiz-text-grid").enhanceWithin();
    });

    $("#quizform").submit(function(){
        var type = $("#quiztypes")[0].value;
        var q = $("#question-input")[0].value;

            switch(type){
                case "mc":
                if(checkConnection()){
                $.mobile.loading("show", {text: "Frage wird gespeichert.", textVisible: true});
                $.ajax({
                    type: "POST",
                    beforeSend: function (request){
                        request.setRequestHeader("Authorization", localStorage.apiKey);
                    },
                    url: apidomain+"/questions",
                    data:{
                        expGroupNumber: localStorage.expGroupNumber,
                        expNumber: localStorage.expNumber,
                        question: q,
                        questionType: type,
                        isActive: 0
                    },
                    success: function(suc){
                        for (var i=0; i<$(".quiz-mc-grid")[0].childElementCount; i++){
                            var ans = $(".quiz-mc-grid")[0].children[i].children[1].children[0].children[0].value;
                            var correct = $(".quiz-mc-grid")[0].children[i].children[2].children[0].children[2].value;
                            if(ans != ""){
                                $.mobile.loading("show", {text: "Antworten werden gespeichert.", textVisible: true});
                                $.ajax({
                                    type: "POST",
                                    beforeSend: function (request){
                                        request.setRequestHeader("Authorization", localStorage.apiKey);
                                    },
                                    url: apidomain+"/answers",
                                    data:{
                                        questionId: suc.qId,
                                        answer: ans,
                                        answerIsCorrect: correct
                                    },
                                    success: function(suc){
                                        $.mobile.loading("hide");
                                        //navigator.notification.alert(suc.message, function(){$("#submit").button("enable"); $(':mobile-pagecontainer').pagecontainer('change', '#quizPage');}, 'Kontakt', 'OK');
                                    },
                                    error: function(err){
                                        $.mobile.loading("hide");
                                        navigator.notification.alert("Eine Antwort konnte nicht übertragen werden. Bitte versuchen Sie es erneut.", function(){$("#submit").button("enable");}, 'Frage einsenden', 'OK');
                                        //$("#quizform").submit();
                                    },
                                    timeout:10000
                                });

                            }
                        }
                        $.mobile.loading("hide");
                        navigator.notification.alert("Die Frage wurde erfolgreich übertragen.", function(){$("#submit").button("enable"); $(':mobile-pagecontainer').pagecontainer('change', '#quizPage');}, 'Frage einsenden', 'OK');
                    },
                    error: function(err){
                        $.mobile.loading("hide");
                        navigator.notification.alert("Die Frage konnte nicht übertragen werden. Bitte versuchen Sie es erneut.", function(){$("#submit").button("enable");}, 'Frage einsenden', 'OK');
                        $("#quizform").submit();
                    },
                    timeout:10000
                });
                } else {
                    navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');
                }
                break;
                case "text":
                if(checkConnection()){
                $.mobile.loading("show", {text: "Frage wird gespeichert.", textVisible: true});
                $.ajax({
                    type: "POST",
                    beforeSend: function (request){
                        request.setRequestHeader("Authorization", localStorage.apiKey);
                    },
                    url: apidomain+"/questions",
                    data:{
                        expGroupNumber: localStorage.expGroupNumber,
                        expNumber: localStorage.expNumber,
                        question: q,
                        questionType: type,
                        isActive: 0
                    },
                    success: function(suc){
                        for (var i=0; i<$(".quiz-text-grid")[0].childElementCount; i++){
                            var ans = $(".quiz-text-grid")[0].children[i].children[1].children[0].children[0].value;
                            if(ans != ""){
                                $.mobile.loading("show", {text: "Antworten werden gespeichert.", textVisible: true});
                                $.ajax({
                                    type: "POST",
                                    beforeSend: function (request){
                                        request.setRequestHeader("Authorization", localStorage.apiKey);
                                    },
                                    url: apidomain+"/answers",
                                    data:{
                                        questionId: suc.qId,
                                        answer: ans,
                                        answerIsCorrect: 1
                                    },
                                    success: function(suc){
                                        $.mobile.loading("hide");
                                        //navigator.notification.alert(suc.message, function(){$("#submit").button("enable"); $(':mobile-pagecontainer').pagecontainer('change', '#quizPage');}, 'Kontakt', 'OK');
                                    },
                                    error: function(err){
                                        $.mobile.loading("hide");
                                        navigator.notification.alert("Eine Antwort konnte nicht übertragen werden. Bitte versuchen Sie es erneut.", function(){$("#submit").button("enable");}, 'Frage einsenden', 'OK');
                                        //$("#quizform").submit();
                                    },
                                    timeout:10000
                                });

                            }
                        }
                        $.mobile.loading("hide");
                        navigator.notification.alert("Die Frage wurde erfolgreich übertragen.", function(){$("#submit").button("enable"); $(':mobile-pagecontainer').pagecontainer('change', '#quizPage');}, 'Frage einsenden', 'OK');
                    },
                    error: function(err){
                        $.mobile.loading("hide");
                        navigator.notification.alert("Die Frage konnte nicht übertragen werden. Bitte versuchen Sie es erneut.", function(){$("#submit").button("enable");}, 'Frage einsenden', 'OK');
                        $("#quizform").submit();
                    },
                    timeout:10000
                });
                } else {
                    navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');
                }
                break;
                case "number":
                if(checkConnection()){
                $.mobile.loading("show", {text: "Frage wird gespeichert.", textVisible: true});
                var answerVal   = $(".quiz-number-grid")[0].children[1].children[0].children[0].value;
                var plusVal  = $(".quiz-number-grid")[0].children[3].children[0].children[0].value;
                var minusVal = $(".quiz-number-grid")[0].children[5].children[0].children[0].value;
                answerVal = (answerVal=='') ? 0 : answerVal;
                plusVal   = (plusVal=='')   ? 0 : plusVal;
                minusVal  = (minusVal=='')  ? 0 : minusVal;
                $.ajax({
                    type: "POST",
                    beforeSend: function (request){
                        request.setRequestHeader("Authorization", localStorage.apiKey);
                    },
                    url: apidomain+"/questions",
                    data:{
                        expGroupNumber: localStorage.expGroupNumber,
                        expNumber: localStorage.expNumber,
                        question: q,
                        questionType: type,
                        isActive: 0
                    },
                    success: function(suc){
                        $.mobile.loading("show", {text: "Antworten werden gespeichert.", textVisible: true});
                        $.ajax({
                            type: "POST",
                            beforeSend: function (request){
                                request.setRequestHeader("Authorization", localStorage.apiKey);
                            },
                            url: apidomain+"/answers",
                            data:{
                                questionId: suc.qId,
                                answerNumber: answerVal,
                                plus: plusVal,
                                minus: minusVal,
                                answerIsCorrect: 1
                            },
                            success: function(suc){
                                $.mobile.loading("hide");
                            },
                            error: function(err){
                                $.mobile.loading("hide");
                                navigator.notification.alert("Eine Antwort konnte nicht übertragen werden. Bitte versuchen Sie es erneut.", function(){$("#submit").button("enable");}, 'Frage einsenden', 'OK');
                            },
                            timeout:10000
                        });
                        $.mobile.loading("hide");
                        navigator.notification.alert("Die Frage wurde erfolgreich übertragen.", function(){$("#submit").button("enable"); $(':mobile-pagecontainer').pagecontainer('change', '#quizPage');}, 'Frage einsenden', 'OK');
                    },
                    error: function(err){
                        $.mobile.loading("hide");
                        navigator.notification.alert("Die Frage konnte nicht übertragen werden. Bitte versuchen Sie es erneut.", function(){$("#submit").button("enable");}, 'Frage einsenden', 'OK');
                        $("#quizform").submit();
                    },
                    timeout:10000
                });
                } else {
                    navigator.notification.alert("Bitte überprüfen Sie Ihre Internetverbindung.", function(){}, 'Verbindungsfehler', 'OK');
                }
                break;
        }
        return false;
    });

    // Click on quizNextButton
    $(document).on("click", "#quizNextButton", function(){
        $('#quizPage').trigger('pagebeforeshow');
    });


    // Reset der beantworteten Fragen in der DB
    $(document).on("click", "#quizResetButton", function(){        
        navigator.notification.confirm("Alle gegebenen Antworten zurücksetzen\nund Quiz neu starten?", function(buttonIndex){
            confirmResetQuiz(buttonIndex);
        }, 'Quiz neu starten?', ['Ja','Nein']);
    });
    
    $(document).on("change", "#quiztypes", function(){
        var qt = $("#quiztypes")[0].value;
        switch(qt){
            case "mc":
                $("#mc-form").show();
                $("#text-form").hide();
                $("#number-form").hide();
            break;
            case "text":
                $("#mc-form").hide();
                $("#text-form").show();
                $("#number-form").hide();
            break;
            case "number":
                $("#mc-form").hide();
                $("#text-form").hide();
                $("#number-form").show();
            break;
        }
    });
    
    function confirmResetQuiz(buttonIndex){
        switch(buttonIndex){
            case 1:
            resetGivenAnswer(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"));
            $('#quizPage').trigger('pagebeforeshow');
            break;    
        }            
    }
    
    function addQuizTypes(){
        $('#quiztypes').empty();
        var optMc = '<option value="mc">Multiple Choice</option>';        
        var optText = '<option value="text">Freier Text</option>';        
        var optNumber = '<option value="number">Nummerneingabe</option>';
        $('#quiztypes').append(optMc);
        $('#quiztypes').append(optText);
        $('#quiztypes').append(optNumber);

        var selectedOpt = $($("option", $('#quiztypes')).get(0));
        selectedOpt.attr('selected', 'selected');

        $('#quiztypes').selectmenu();
        $('#quiztypes').selectmenu('refresh', true);
    }