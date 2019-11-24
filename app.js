const days_div = document.getElementById("days");
const months_div = document.getElementById("months");
const defaultDate_input = document.getElementById("default-date-input");
const selectionDate_input = document.getElementById("selection-date-input");
const i_select = document.getElementById("i-selector");

var Selection = {
  BULLSIN: 0,
  BULLSOUT: 1,
  AI: 2,
  EMBRYO: 3,
  DUEDATE: 4
}

var activeSelection;

function updateDays() {  
  var result = calculateDays()

  days_div.innerHTML = `${result[0]} Days`;
  months_div.innerHTML = `${result[1]} Months`;
}

function calculateDays(){
  var days;  
  var msPerDay = 24 * 60 * 60 * 1000;
  
  var defaultDate = new Date(defaultDate_input.value);
  var defaultTime = defaultDate.getTime();
  var userDate = new Date(selectionDate_input.value);
  var userTime = userDate.getTime();
  if(userDate == "Invalid Date"){
    return [0,0]
  }
  switch(activeSelection){
    case Selection.BULLSIN:
    case Selection.BULLSOUT:
    case Selection.AI:
      days = Math.round((defaultTime - userTime) / msPerDay); //Starts at day 0
      break;
    case Selection.EMBRYO:
      days = Math.round((defaultTime - userTime) / msPerDay) + 7; //Starts at day 0
      break;
    case Selection.DUEDATE:
      days = 283 - Math.round((userTime - defaultTime) / msPerDay) + 2;
      break;
  }
  if(days < 0)
    days = 0;
  var months = Math.round(days / 30 * 10) / 10;
  return [days, months];
}

function updateSelection() {
  activeSelection = i_select.selectedIndex;
  updateDays();
}

function setDefaultDate(){
  var now = new Date();
  return now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay();
}

function main() {
  var now = new Date();
  defaultDate_input.value = now.toISOString().substring(0,10);

  updateSelection();

  defaultDate_input.addEventListener('change', function(){
    updateDays();
  })

  selectionDate_input.addEventListener('change', function(){
    updateDays();
  })

  i_select.addEventListener('change', function(){
    updateSelection()
  })
}

main();
