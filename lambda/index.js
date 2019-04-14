const Alexa = require('ask-sdk-core');

var currentScore = 0;
var highScore = 0;
var lastHighScore = 0;
var livesLeft = 0;
var minval = 0;
var maxval = 0;

var prevNumber = 0;
var currentNumber = 0;
var gameUnderProgress = 0;

function genRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function genRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startNewGame(difficulty) {
    if(difficulty === 0) {
        minval = 0;
        maxval = 100;
        livesLeft = 3;
    }
    else if(difficulty === 1) {
        minval = -100;
        maxval = 100;
        livesLeft = 2;
    }
    else if(difficulty === 2) {
        minval = -1000;
        maxval = 1000;
        livesLeft = 1;
    }
    gameUnderProgress = 1;
    currentScore = 0;
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to high or low! You can start a new game or get help with the rules.' ;
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const highIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'highIntent';
    },
    handle(handlerInput) {
        var speechText = '';
        var speechChoices = ['Great!', 'Good!', 'Correct!', 'Nice going!', 'You\'re doing good!', 'Awesome!'];
        if(gameUnderProgress === 1){
          if(currentNumber >= prevNumber) {
              prevNumber = currentNumber;
              currentNumber = genRandomNumber(minval, maxval);
              currentScore = currentScore +5;
              if(currentScore > highScore) {
                  highScore = currentScore;
              }
              speechText = speechChoices[genRandomInt(speechChoices.length)]+' '+currentNumber;
          }

          else {
              currentNumber = genRandomNumber(minval, maxval);
              speechText = 'Oops! That was wrong. ';
              livesLeft = livesLeft -1;
              if(livesLeft > 0) {
                  speechText = speechText + 'Your new number is '+currentNumber;
              }
              else {
                  speechText = speechText + 'You have no lives left. Game Over.';
                  gameUnderProgress = 0;
                  lastHighScore = highScore;
              }
          }
        }
        else {
          speechText = 'Try saying start or help.'
        }
        const timeoutText = 'Please be prompt in your answer.'
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(timeoutText)
            .getResponse();
    }
};

const lowIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'lowIntent';
    },
    handle(handlerInput) {
        var speechText = '';
        var speechChoices = ['Great!', 'Good!', 'Correct!', 'Nice going!', 'You\'re doing good!', 'Awesome!'];
        if(gameUnderProgress === 1) {
          if(currentNumber <= prevNumber) {
              prevNumber = currentNumber;
              currentNumber = genRandomNumber(minval, maxval);
              currentScore = currentScore +5;
              if(currentScore > highScore) {
                  highScore = currentScore;
              }
              speechText = speechChoices[genRandomInt(speechChoices.length)]+' '+currentNumber;
          }

          else {
              currentNumber = genRandomNumber(minval, maxval);
              speechText = 'Oops! That was wrong. ';
              livesLeft = livesLeft -1;
              if(livesLeft > 0) {
                  speechText = speechText + 'Your new number is '+currentNumber;
              }
              else {
                  speechText = speechText + 'You have no lives left. Game Over.';
                  gameUnderProgress = 0;
                  lastHighScore = highScore;
              }
          }
        }
        else {
          speechText = 'Try saying start or help.'
        }
        const timeoutText = 'Please be prompt in your answer.'
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(timeoutText)
            .getResponse();
    }
};

const startNewGameIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'startNewGameIntent';
    },
    handle(handlerInput) {
        var speechText = '';
        if(gameUnderProgress === 0) {
            speechText = 'Before we start, select a difficulty level. You can go with beginner, moderate or hard.';
        }
        else {
            speechText = 'You cannot start a new game as a game is currently under progress. You can either continue with the current game or exit it and then start a new one.';
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const beginnerDifficultyIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'beginnerDifficultyIntent';
    },
    handle(handlerInput) {
        var speechText = '';
        if(gameUnderProgress === 0) {
            startNewGame(0);
            prevNumber = genRandomNumber(minval, maxval);
            currentNumber = genRandomNumber(minval, maxval);
            speechText = 'Okay. Let\'s start. The first number is '+prevNumber+' and the second one is '+currentNumber+'. Say high or low.';
        }
        else {
            speechText = 'You cannot change the difficulty as the game is currently under progress. You can either continue with the current game or exit it and then start a new one.';
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const moderateDifficultyIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'moderateDifficultyIntent';
    },
    handle(handlerInput) {
        var speechText = '';
        if(gameUnderProgress === 0) {
            startNewGame(1);
            prevNumber = genRandomNumber(minval, maxval);
            currentNumber = genRandomNumber(minval, maxval);
            speechText = 'Okay. Let\'s start. The first number is '+prevNumber+' and the second one is '+currentNumber+'. Say high or low.';
        }
        else {
            speechText = 'You cannot change the difficulty as the game is currently under progress. You can either continue with the current game or exit it and then start a new one.';
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const hardDifficultyIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'hardDifficultyIntent';
    },
    handle(handlerInput) {
        var speechText = '';
        if(gameUnderProgress === 0) {
            startNewGame(2);
            prevNumber = genRandomNumber(minval, maxval);
            currentNumber = genRandomNumber(minval, maxval);
            speechText = 'Okay. Let\'s start. The first number is '+prevNumber+' and the second one is '+currentNumber+'. Say high or low.';
        }
        else {
            speechText = 'You cannot change the difficulty as the game is currently under progress. You can either continue with the current game or exit it and then start a new one.';
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const endGameIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'endGameIntent';
    },
    handle(handlerInput) {
        var speechText = '';
        if(gameUnderProgress === 0) {
            speechText = 'No game is under progress now. There\'s nothing to end.';
        }
        else {
            gameUnderProgress = 0;
            speechText = 'Okay. The current game has ended. You can start a new game or exit high or low. Your score was '+currentScore+'. ';
            if(currentScore > lastHighScore) {
                speechText = speechText+'That\'s the new high score in this session. You did it.'
            }
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const checkScoreIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'checkScoreIntent';
    },
    handle(handlerInput) {
        var speechText = '';
        if(gameUnderProgress === 0) {
            speechText = 'The last game\'s score was '+currentScore+'. The high score for this session is '+highScore;
        }
        else {
            speechText = 'You can\'t check the score while the game is under progress.';
        }
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Playing High or Low is easy. I will tell you a number in each turn and all you need to do is to tell high if it\'s greater than the number I told in the previous turn or low if it\'s smaller than the number I told in the previous turn. The game has 3 difficulty levels, namely beginner, moderate, and hard. You\'ll get 3 lives in beginner, 2 lives in moderate and a single life in hard. Also, in beginner difficulty, you get only positive numbers but in the other two difficulty levels, you\'ll get both positive and negative numbers. You get a +5 in each turn if your answer is correct. That\'s enough intro. Tell me to start when you are ready to play.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt()
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        startNewGameIntentHandler,
        beginnerDifficultyIntentHandler,
        moderateDifficultyIntentHandler,
        hardDifficultyIntentHandler,
        endGameIntentHandler,
        checkScoreIntentHandler,
        highIntentHandler,
        lowIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();
