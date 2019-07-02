const todoList = document.getElementById('todo-input');
const time = document.getElementById('time');
const metaText = document.getElementById('meta');
const metaBox = document.getElementById('meta-input');
const frase = document.getElementById('frase');
const autor = document.getElementById('autor');
let amPm = false;
let amPmVar = "";

hrs24.addEventListener('change', () => {
  if (amPm) {
    amPm = false;
  } else {
    amPm = true;
  }
});

//Set time
function displayTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();


  //Set 24 hrs
  let set24 = () => {
    hour = today.getHours();
    amPmVar = "";
  };


  //Set am or pm
    if (amPm) {
    hour = changeFormat();
    } else {
      set24();
    }


  if (min < 10 && sec < 10) {
    time.innerHTML = `${hour}:0${min}:0${sec}  ${amPmVar}`;
  } else if (min < 10) {
    time.innerHTML = `${hour}:0${min}:${sec}  ${amPmVar}`;
  } else if (sec < 10) {
    time.innerHTML = `${hour}:${min}:0${sec}  ${amPmVar}`;
  } else {
    time.innerHTML = `${hour}:${min}:${sec}  ${amPmVar}`;
  }

  //Activate/Deactivate 24hrs

  setTimeout(displayTime, 1000);
}

displayTime();

function changeFormat(){
  let timeFormat = new Date();
  let currHour = timeFormat.getHours();

  if(currHour < 12){
    amPmVar = "AM"
  }
  else{
    amPmVar = "PM"
  }
  if(currHour === 0){
    currHour = 12;
  }
  if(currHour > 12){
    currHour -= 12;
  }

  return currHour;
}
