const days_div = document.getElementById("days");
const months_div = document.getElementById("months");
const defaultDate_input = document.getElementById("default-date-input");
const selectionDate_input = document.getElementById("selection-date-input");
const i_select = document.getElementById("i-selector");
const save_div = document.getElementById("save");
const save_button = document.getElementById("save-button");

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
  months_div.innerHTML = `Calving date: ${result[1]}`;
}

function calculateDays(){
  var days;
  var dueDate;  
  var msPerDay = 24 * 60 * 60 * 1000;
  var gestTime = 283 * msPerDay;
  
  var defaultDate = new Date(defaultDate_input.value);
  var defaultTime = defaultDate.getTime();
  var userDate = new Date(selectionDate_input.value);
  var userTime = userDate.getTime();
  if(userDate == "Invalid Date"){
    return ['-','-']
  }
  switch(activeSelection){
    case Selection.BULLSIN:
    case Selection.BULLSOUT:
    case Selection.AI:
      days = Math.round((defaultTime - userTime) / msPerDay); //Starts at day 0
      dueDate = userTime + gestTime;
      break;
    case Selection.EMBRYO:
      days = Math.round((defaultTime - userTime) / msPerDay) + 7; //Starts at day 0
      dueDate = userTime + gestTime - 7 * msPerDay;
      break;
    case Selection.DUEDATE:
      days = 283 - Math.round((userTime - defaultTime) / msPerDay) + 2;
      dueDate = userTime + msPerDay;     
      break;
  }
  
  if(days <= 0){
    days = '-';
    dueDate = '-';
  }
  else{    
    dueDate = new Date(dueDate).toDateString().substring(4);
  }  

  return [days, dueDate];
}

function updateSelection() {
  activeSelection = i_select.selectedIndex;
  updateDays();
}

function saveValues(){
  var saveString = i_select.options[activeSelection].textContent + ': ' + days_div.textContent.toLowerCase() + '; ' + months_div.textContent.substring(14);  

  var para = document.createElement("p");
  var node = document.createTextNode(saveString);
  para.appendChild(node);  
  save_div.appendChild(para);  
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

  save_button.addEventListener('click', function(){
    saveValues();
  })
}

main();
