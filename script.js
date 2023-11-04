
/**
 * this class generates the questions and returns the full question as an object to be used in the game itself
 * {@param} takes two integers as arguments 
 * {@returns} an object that contains all the information to generate the question.
 */
class Question {
    #firstNum;
    #secondNum;
    #answer;
    #answerIndex;
    #answerArr = new Array(4);
    #randomInterval;
    #plusMinus;

    constructor(num1, num2) {
        this.#firstNum = num1;
        this.#secondNum = num2;
        this.#answer =  num1 * num2;
        this.#answerArr.fill(-1);
        this.#answerIndex = Math.floor(Math.random() * 4);
        this.#answerArr[this.#answerIndex] = this.#answer;
        for (let index = 0; index < this.#answerArr.length; index++) {;
            if(index === this.#answerIndex){
                continue;
            } else {
                this.#randomInterval = Math.floor(Math.random() * 5) + 1;
                this.#plusMinus = Math.random() * 10;
                if (this.#plusMinus > 5) {
                    this.#answerArr[index] = this.#answer + this.#randomInterval;
                } else {
                    this.#answerArr[index] = this.#answer - this.#randomInterval;
                }
            }
        }
    }

    get firstNum() {
        return this.#firstNum;
    }

    get secondNum() {
        return this.#secondNum;
    }

    get answerArr() {
        return this.#answerArr;
    }

    get answerIndex() {
        return this.#answerIndex;
    }
}

const questions = new Array(5);
let questionIndex = 0;
let numberCorrect = 0;

/**
 * initGame initializes the game to generate all the new question objects to be used later on in the code
 */
function initGame() {
    console.log('game initialized!');
    numberCorrect = 0;
    let num1;
    let num2;
    for (let index = 0; index < questions.length; index++) {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        questions[index] = new Question(num1, num2);
    }
}


/**
 * clearQuestion clears out the question that is present in the box currently before it is refilled by populateQuestion
 */
function clearQuestion() {
    $('.quiz-content').empty();
}

function handleQuizEnd() {
    console.log(`you got ${numberCorrect} right!`);
    $('.quiz-content').hide();
    $('.quiz-content').append(`
    <p class="quiz-finish__message">Great job on finishing the quiz!</p>
    <p class="quiz-finish__message">You got out ${numberCorrect} of ${questions.length} correct!</p>
    `);
}

function populateQuestion(question) {
 $('.quiz-content').append(`
            <div id="quiz-text">
                <p id="question-text__prompt">Pick the correct answer!</p>
                <p id="question-text__problem"></p>
            </div>
            <div id="answer-container">
            </div>
            `
 );
            $('#question-text__problem').text(`${questions[questionIndex].firstNum} x ${questions[questionIndex].secondNum}?`);
            for (let index = 0; index < questions[questionIndex].answerArr.length; index++) {
                console.log(questions[questionIndex].answerArr[index]);
                if (index === questions[questionIndex].answerIndex) {
                    $('#answer-container').append(`<button class="answer-button correct">${questions[questionIndex].answerArr[index]}</button>`);
                } else {
                    $('#answer-container').append(`<button class="answer-button incorrect">${questions[questionIndex].answerArr[index]}</button>`);
                }
            }
            if (questionIndex < questions.length - 1) {
                $('.quiz-content').append(`<button class="next-question__button" disabled>Next Question</button>`);
            } else {
                $('.quiz-content').append(`<button class="next-question__button" disabled>Finish Quiz</button>`);
            }
            $('.answer-button').click(function (e) { 
                e.preventDefault();
                if ($(e.target).hasClass("correct")) {
                    $(e.target).addClass('green-background');
                    $('.answer-button').off();
                    numberCorrect++;
                } else {
                    $(e.target).addClass('red-background');
                    $('.answer-button').off();
                }
                $('.next-question__button').removeAttr('disabled');
                $('.next-question__button').click(function (e) { 
                    e.preventDefault();
                    $('.quiz-content').fadeOut(500);
                    clearQuestion();
                    questionIndex++;
                    if (questionIndex < questions.length) {
                        populateQuestion(questions[questionIndex]);
                    } else {
                        handleQuizEnd();

                    }
                    $('.quiz-content').fadeIn(500);
                    
                });
            });
}


initGame();
console.log(questions[0].answerArr.length);

console.log(questions[0].answerArr);

$('.quiz-start__button').on('click', function(){
    populateQuestion(questions[questionIndex]);
    $('.quiz-start-page').hide();
    $('.quiz-content').fadeIn(500);
    
        // $('.answer-button').on("click", function (e) { 
        //     e.preventDefault();
        //     if ($(e.target).hasClass("correct")) {
        //         $(e.target).addClass('green-background');
        //         $('.answer-button').off();
        //     } else {
        //         $(e.target).addClass('red-background');
        //         $('.answer-button').off();
        //     }
        //     $('.next-question__button').removeAttr('disabled');
        //     $('.next-question__button').click(function (e) { 
        //         e.preventDefault();
        //         $('.quiz-content').fadeOut(500);
        //         clearQuestion();
        //         questionIndex++;
        //         populateQuestion(questions[questionIndex]);
        //         $('.quiz-content').fadeIn(500);
        //     });
    // }); 
});