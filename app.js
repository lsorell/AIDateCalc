const days_div = document.getElementById("days");
const months_div = document.getElementById("months");
const defaultDate_input = document.getElementById("default-date-input");
const selectionDate_input = document.getElementById("selection-date-input");
const i_select = document.getElementById("i-selector");

var activeSelection;

function updateDays() {
  var userDate = new Date(selectionDate_input.value);
  var result = calculateDays()

  days_div.innerHTML = `${result[0]} Days`;
  months_div.innerHTML = `${result[1]} Months`;
}

function calculateDays(){
  var days;
  var now = new Date().getTime();
  var msPerDay = 24 * 60 * 60 * 1000;

  var userDate = new Date(selectionDate_input.value);
  var userTime = userDate.getTime();
  if(userDate == "Invalid Date"){
    return [0,0]
  }
  switch(activeSelection){
    case 0:
    case 1:
    case 2:
      days = Math.round((now - userTime) / msPerDay) - 1; //Starts at day 0
      break;
    case 3:
      days = Math.round((now - userTime) / msPerDay) + 7 - 1; //Starts at day 0
      break;
    case 4:
      days = 283 - Math.round((userTime - now) / msPerDay) + 1;
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
  defaultDate_input.value = Date.now().toISOString().substring(0,10);

  selectionDate_input.addEventListener('change', function(){
    updateDays();
  })

  i_select.addEventListener('change', function(){
    updateSelection()
  })
}

main();
