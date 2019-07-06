const days_div = document.getElementById("days");
const months_div = document.getElementById("months");
const bullsIn_div = document.getElementById("bulls-in");
const bullsOut_div = document.getElementById("bulls-out");
const ai_div = document.getElementById("ai");
const embryo_div = document.getElementById("embryo");
const dueDate_div = document.getElementById("due-date");
const date_input = document.getElementById("date-input");

var activeButton = [1,0,0,0,0];

function updateDays() {
  var userDate = new Date(date_input.value);
  var result = calculateDays()

  days_div.innerHTML = `${result[0]} Days`;
  months_div.innerHTML = `${result[1]} Months`;
}

function calculateDays(){
  var selected = activeButton.indexOf(1);
  var days;
  var now = new Date().getTime();
  var msPerDay = 24 * 60 * 60 * 1000;

  var userDate = new Date(date_input.value);
  if(userDate == "Invalid Date"){
    return [0,0]
  }
  switch(selected){
    case 0:
    case 1:
    case 2:
      days = Math.round((now - userDate.getTime()) / msPerDay) - 1; //Starts at day 0
      break;
    case 3:
      days = Math.round((now - userDate.getTime()) / msPerDay) + 7 - 1; //Starts at day 0
      break;
    case 4:
      days = 283 - Math.round((userDate.getTime() - now) / msPerDay) + 1;
      break;
  }
  if(days < 0)
    days = 0;
  var months = Math.round(days / 30 * 10) / 10;
  return [days, months];
}

function updateButtons(buttonNum) {
  activeButton = [0,0,0,0,0];
  activeButton[buttonNum] = 1;
  var buttons = [bullsIn_div, bullsOut_div, ai_div, embryo_div, dueDate_div];
  for(var i = 0; i < buttons.length; i++){
    var button = buttons[i];
    if(activeButton[i] == 0){
      styleButtonDeselect(button)
    }
    else{
      styleButtonSelect(button)
    }
  }
  updateDays();
}

function styleButtonSelect(htmlElement){
  htmlElement.style.background = 'white';
  htmlElement.style.color = '#24272E';
}

function styleButtonDeselect(htmlElement){
  htmlElement.style.background = '#24272E';
  htmlElement.style.color = 'white';
}

function main() {
  styleButtonSelect(bullsIn_div);

  date_input.addEventListener('change', function(){
    updateDays();
  })

  bullsIn_div.addEventListener('click', function() {
    updateButtons(0);
  })

  bullsOut_div.addEventListener('click', function() {
    updateButtons(1);
  })

  ai_div.addEventListener('click', function() {
    updateButtons(2);
  })

  embryo_div.addEventListener('click', function() {
    updateButtons(3);
  })

  dueDate_div.addEventListener('click', function() {
    updateButtons(4);
  })
}

main();
