//GETTING ALL REQUIRED ELEMENTS
var start_button = document.querySelector(".start_button button");
var info_box = document.querySelector(".info_box");
var quit_button = info_box.querySelector(".buttons .quit");
var continue_button = document.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".quiz_box");
var timeCount = quiz_box.querySelector(".timer .timer_sec");
var scoreTracker = 0;
var option_list = document.querySelector(".option_list");
var initials = "";

//IF START QUIZ BUTTON CLICKED
start_button.onclick = ()=>{
    info_box.classList.add("activateInfo"); // This shows the info box
}

//IF EXIT QUIZ BUTTON CLICKED
quit_button.onclick = ()=>{
    info_box.classList.remove("activateInfo"); //this hides the info box
}

//IF CONTINUE QUIZ BUTTON CLICKED
continue_button.onclick = ()=>{
    info_box.classList.remove("activateInfo"); //this hides the info box
    quiz_box.classList.add("activateQuiz"); //This shows the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(100);
}

//CREATING AN ARRAY AND PASSING THE NUMBERS, QUESTIONS, OPTIONS & ANSWER
let questions = [
    {
        numb: 1,
        question: "Commonly used data types DO NOT include?",
        answer: "Alerts",
        options: [
            "String",
            "Booleans",
            "Alerts",
            "Numbers"
        ]
    },
    {
        numb: 2,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
            "Common Style Sheet",
            "Colorful Style Sheet",
            "Computer Style Sheet",
            "Cascading Style Sheet"
        ]
    },
    {
        numb: 3,
        question: "Arrays in JavaScript can be used to store?",
        answer: "All of the above",
        options: [
            "Numbers & Strings",
            "Other Arrays",
            "Booleans",
            "All of the above"
        ]
    },
    {
        numb: 4,
        question: "The condition of an if/else statment is enclosed within?",
        answer: "Curly Brackets",
        options: [
            "Quotes",
            "Curly Brackets",
            "Parenthesis",
            "Square Brackets"
        ]
    },
    {
        numb: 5,
        question: "String values must be enclosed within _____ when being assigned to variables?",
        answer: "Quotes",
        options: [
            "Commas",
            "Curly Brackets",
            "Quotes",
            "Parenthesis"
        ]
    },
];

let que_count = 0;
var next_btn = quiz_box.querySelector(".next_btn");
let que_numb = 1;
let counter;
let timeValue = 100;



//IF NEXT CLICKED
next_btn.onclick =()=>{
    if(que_count < questions.length){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
    } else {
        console.log("Questions completed");
    }
    
}

//getting question & options from array

function showQuestions(index){
    if (index <= 4) {
    var que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question + '<span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                    +' <div class="option">'+ questions[index].options[2] +'<span></span></div>'
                    +' <div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    
    var option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    }
    if (index >= 5) { 
        recordEntry()
    }
    
}



function recordEntry() {
    timeValue = 0;
    var que_text = document.querySelector(".que_text");
    var initials = document.querySelector(".initials");
    que_text.textContent = "Please enter your initials!";
    option_list.style.display = "none";
    initials.style.display = "block";
    next_btn.textContent = "Submit!"
    next_btn.onclick =()=>{
        console.log(entryStorage);
    }
}
function entryStorage() {
    initials = localStorage.getItem("initials")
    scoreTracker = localStorage.getItem("scoreboard")
    userInitialsSpan.textContent = initials;
    userScoreboardSpan.textContent = scoreboard;
    
}
//NEED MORE PRACTCE/TIME SPENT ON LOCAL STORAGE.. UNABLE TO SUCCESSFULL CODE THIS//

function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns) {
        answer.classList.add("correct");
        console.log("Answer is Correct!");
        scoreTracker++;
        
    } else {
        answer.classList.add("incorrect")
        console.log("Answer is Wrong!");
        timeValue -= 15;

           
    
  

        //IF ANSWERS ARE INCORRECT THEN AUTOMATICALLY SELECT THE CORRECT ANSWER
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }
    
    //ONCE USER SELECTED DISABLE ALL OPTIONS
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
}

function startTimer(){
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = timeValue;
        timeValue--;
        if (timeValue < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
            alert("The game is over!")
        }
    }
}






function queCounter(index){
    if (index <=5) {
    var bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>Of<p>'+ questions.length +'</p>Points</span>'
    bottom_ques_counter.innerHTML = totalQuesCountTag;
    }
}