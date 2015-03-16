    var db;
    var domain = "http://phylab.org/api/v1/index.php"
    function createDBTables() {
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ExpGroups (id INTEGER PRIMARY KEY AUTOINCREMENT, expGroupNumber INTEGER NOT NULL, expGroupName TEXT NOT NULL)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS Experiments (id INTEGER PRIMARY KEY AUTOINCREMENT, expNumber INTEGER NOT NULL, expName TEXT NOT NULL, expGroupNumber INTEGER NOT NULL, expIsActive INTEGER NOT NULL, expIsFav INTEGER NOT NULL)');

            tx.executeSql('CREATE TABLE IF NOT EXISTS Questions (id INTEGER PRIMARY KEY AUTOINCREMENT, expGroupNumber INTEGER NOT NULL, expNumber INTEGER NOT NULL, question TEXT NOT NULL, questionType TEXT NOT NULL, givenAnswerId TEXT, givenAnswerText TEXT, givenAnswerNumber REAL)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS Answers (id INTEGER PRIMARY KEY AUTOINCREMENT, questionId INTEGER NOT NULL, answer TEXT, answerNumber REAL, plus REAL, minus REAL, answerIsCorrect INTEGER, helpText TEXT)');
        });
    }
    
    function errorCB(err){
        console.log("Folgender DB Fehler ist aufgetreten: "+err.code);
        alert("Error: "+err.code);
    }
    
    function fillDBTables(){
        // Lade Daten zu ExpGroups
        $.ajax({
            type: 'GET',
            url: domain+"/expgroups",            
            dataType: "json",            
            success: function(result) {                
                db.transaction(function(tx){
                    for(var i=0;i<result.expGroups.length;i++){
                        (function(i){
                            var expGroup = result.expGroups[i];
                            tx.executeSql("SELECT * FROM ExpGroups WHERE expGroupNumber = ? AND expGroupName = ?", [expGroup.expGroupNumber, expGroup.expGroupName], function(tx, res) {
                                if(res.rows.length==0){
                                    tx.executeSql("INSERT INTO ExpGroups (expGroupNumber, expGroupName) VALUES (?,?)", [expGroup.expGroupNumber, expGroup.expGroupName], function(tx, res) {
                                    }, errorCB);
                                }
                            }, errorCB);
                        })(i);
                    }
                });                             
            },
            error: function(err){
                console.log('Fehler beim Laden der Versuchsdaten: '+err.code);
                alert('Fehler beim Laden der Versuchsdaten: '+err.code);
            }
        });
        // Lade Daten zu Experiments
        $.ajax({
            type: 'GET',
            url: domain+"/experiments",
            dataType: "json",
            success: function(result) {
                db.transaction(function(tx){
                    for(var e=0;e<result.experiments.length;e++){
                        (function(e){
                            var exp = result.experiments[e];
                            tx.executeSql("SELECT * FROM Experiments WHERE expNumber = ? AND expName = ?", [exp.expNumber, exp.expName], function(tx, res) {
                                if(res.rows.length==0){
                                    var active = (exp.expIsActive == 1) ? 1 : 0;
                                    tx.executeSql("INSERT INTO Experiments (expGroupNumber, expNumber, expName, expIsActive, expIsFav) VALUES (?,?,?,?,?)", [exp.expGroupNumber, exp.expNumber, exp.expName, active, 0], function(tx, res) {
                                    }, errorCB);
                                }
                            }, errorCB);
                        })(e);
                    }                                        
                });
                createExpListAll();
            },
            error: function(err){
                console.log('Fehler beim Laden der Versuchsdaten: '+err.code);
                alert('Fehler beim Laden der Versuchsdaten: '+err.code);
            }
        });
        // Lade Daten zu Questions
        $.ajax({
            type: 'GET',
            url: domain+"/questions",        
            dataType: "json",
            success: function(result) {
                db.transaction(function(tx){
                for(var e=0;e<result.questions.length;e++){
                    (function(e){
                        var q = result.questions[e];                                               
                        tx.executeSql("SELECT * FROM Questions WHERE question = ? AND expGroupNumber = ? AND expNumber = ?", [q.question, q.expGroupNumber, q.expNumber], function(tx, res) {
                            if(res.rows.length==0){
                                tx.executeSql("INSERT INTO Questions (expGroupNumber, expNumber, question, questionType) VALUES (?,?,?,?)", [q.expGroupNumber, q.expNumber, q.question, q.questionType], function(tx, res) {                                    
                                }, errorCB);
                            }
                        }, errorCB);
                    })(e);
                }
                });
            },
            error: function(err){
                console.log('Fehler beim Laden der Fragen: '+err.code);
                alert('Fehler beim Laden der Fragen: '+err.code);
            }
        });
        // Lade Daten zu Answers        
        $.ajax({
            type: 'GET',
            url: domain+"/answers",
            dataType: "json",
            success: function(result) {
                db.transaction(function(tx){
                for(var e=0;e<result.answers.length;e++){
                    (function(e){
                    var answer = result.answers[e];
                        tx.executeSql("SELECT * FROM Answers WHERE (answer = ? OR answerNumber = ?) AND questionId = ?", [answer.answer, answer.answerNumber, answer.questionId], function(tx, res) {
                            if(res.rows.length==0){
                                tx.executeSql("INSERT INTO Answers (questionId, answer, answerNumber, plus, minus, answerIsCorrect, helpText) VALUES (?,?,?,?,?,?,?)", [answer.questionId, answer.answer, answer.answerNumber, answer.plus, answer.minus, answer.answerIsCorrect, answer.helpText], function(tx, res) {                                    
                                }, errorCB);
                            }
                        }, errorCB);
                    })(e);
                }
                });
            },
            error: function(err){
                console.log('Fehler beim Laden der Antworten: '+err.code);
                alert('Fehler beim Laden der Antworten: '+err.code);
            }
        });        
    }