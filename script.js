//getting all required element
var start_btn = document.querySelector(".start_button button");
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = document.querySelector(".buttons .restart");

//If Start Quiz Button Clicked
start_btn.onClick = ()=>{
    info_box.classList.add("activeInfo")
}

//If Exit Button Clicked
exit_btn.onClick = ()=>{
    info_box.classList.remove("activeInfo")
}