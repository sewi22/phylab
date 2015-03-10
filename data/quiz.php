<?php

    $callback = $_REQUEST['callback'];
    
    // Create the output object.    
    $output = array('quiz' => array(
        array(
            'expGroupNumber' => 1,
            'expNumber' => 1,
            'questions' => array(              
                array(
                    'question' => 'Welches Obst schmeckt am besten?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "Apfel",
                            "correct" => true,                
                            "helpText" => "Das ist richtig"
                        ),
                        array(
                            "answer" => "Banane",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "Orange",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "Kiwi",
                            "correct" => true,
                            "helpText" => "Das ist richtig"
                        ),
                        array(
                            "answer" => "Zitrone",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        )
                    )                
                ),
                array(
                    'question' => 'Wieviele Seiten hat ein W&uuml;rfel?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "sechs",
                            "correct" => true,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "vier",
                            "correct" => false,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "sechs",
                            "correct" => true,
                            "helpText" => "Logisch"
                        ),
                        array(
                            "answer" => "acht",
                            "correct" => false,
                            "helpText" => "Falsch"
                        )
                    )
                ),
                array(
                    'question' => 'Wieviele Bundesl&auml;nder hat Deutschland?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "sechs",
                            "correct" => false,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "sechzehn",
                            "correct" => true,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "zwanzig",
                            "correct" => true,
                            "helpText" => "Logisch"
                        ),
                        array(
                            "answer" => "hundert",
                            "correct" => false,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "zehn",
                            "correct" => true,
                            "helpText" => "Logisch"
                        ),
                        array(
                            "answer" => "vier",
                            "correct" => false,
                            "helpText" => "Falsch"
                        )
                    )
                ),
                array(
                    'question' => 'Welches ist der erste Buchstabe im Alphabet?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "A",
                            "correct" => true,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "B",
                            "correct" => false,
                            "helpText" => "Falsch"
                        ),
                        array(
                            "answer" => "C",
                            "correct" => true,
                            "helpText" => "Logisch"
                        )
                    )
                ),            
                array(
                    'question' => 'Ab welcher Temperatur kocht Wasser?',
                    'questionType' => 'number',
                    'answers' => array(100.5),
                    'plus' => 3,
                    'minus' => 2.2                     
                ),
                array(
                    'question' => 'Welches ist das wertvollste Unternehmen der Welt?',
                    'questionType' => 'text',
                    'answers' => array('Apple')
                )
            )
        ),
        array(
            'expGroupNumber' => 1,
            'expNumber' => 2,
            'questions' => array(
                array(
                    'question' => 'Wieviele Bundesl&auml;nder hat Deutschland?',
                    'questionType' => 'number',
                    'answers' => array(16)                    
                ),
                array(
                    'question' => 'Wieviele Monate haben 28 Tage?',
                    'questionType' => 'text',
                    'answers' => array('Jeder', 'alle', '12', 'zw&ouml;lf')                    
                ),
                array(
                    'question' => 'Welche deutsche Stadt hat derzeit keinen Fu&szlig;ball Erstligisten?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "Frankfurt",
                            "correct" => false,
                            "helpText" => "Jeder Monat hat 28 Tage"
                        ),
                        array(
                            "answer" => "Hamburg",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "K&ouml;ln",
                            "correct" => false,
                            "helpText" => "Stimmt nicht"
                        ),
                        array(
                            "answer" => "Leipzig",
                            "correct" => true,
                            "helpText" => "Das wird auch so bleiben"
                        )
                    )
                ),
                array(
                    'question' => 'Wer wird Deutscher Meister?',
                    'questionType' => 'mc',
                    'answers' => array(
                        array(
                            "answer" => "Eintracht Frankfurt",
                            "correct" => true,
                            "helpText" => "Wer sonst"
                        ),
                        array(
                            "answer" => "Eintracht Frankfurt",
                            "correct" => true,
                            "helpText" => "Die Bayern nicht"
                        )
                    )
                )
            )
        )       
    ));
        
    //start output    
    if ($callback) {
        header('Content-Type: text/javascript');        
        echo $callback . '(' . json_encode($output) . ');';
    } else {
        header('Content-Type: application/x-json');
        echo json_encode($output);
    }    
    
?>