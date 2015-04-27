
    // TODO: Anzeige auf 10 Fragen beschränken oder Höchstzahl der vorhandenen Fragen, dass Auswertung anzeigen

    $.mobile.document.on('pagecreate', '#quizPage', function(e){
        e.preventDefault();
        //addExpFooterNavbar(e.target.id);
        //addExpPageContextMenuButton(e.target.id);
    });
    
    // Create QuizPage before show
    $(document).on('pagebeforeshow', '#quizPage', function(e) {
        var expGroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");
        var headline = "Quiz";
        $("#quizHeadline").html(headline);
        fillContextMenu(function(link){
            var userID = (localStorage.username) ? localStorage.username : '';
            link += '<a href="#" id="contextMenuBackButton" data-theme="a" data-role="button">zur&uuml;ck</a>';
            link += '<a href="#" id="contextMenuAddQuiz" data-role="button">Frage erstellen</a>';
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
                        $("#quizContent").html("<li>Zu diesem Versuch wurden noch keine Fragen erstellt.</li>");                        
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
                okDialog("Bitte w&auml;hlen Sie eine Antwort aus.", function(){});                                                            
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
                okDialog("Bitte geben Sie eine Antwort ein.", function(){});                                               
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
                okDialog("Bitte geben Sie eine Antwort ein.", function(){});                              
            }

        } else {
            alert("Unbekannter Quiztyp!");
            console.log("Unbekannter Quiztyp!");
        }
    });


    // Click on quizNextButton
    $(document).on("click", "#quizNextButton", function(){
        $('#quizPage').trigger('pagebeforeshow');
    });


    // Reset der beantworteten Fragen in der DB
    $(document).on("click", "#quizResetButton", function(){        
        confirmDialog("Alle gegebenen Antworten zur&uuml;cksetzen<br/>und Quiz neu starten?", function(){                       
            resetGivenAnswer(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"));
            $('#quizPage').trigger('pagebeforeshow');
        });
    });