const todoList = document.getElementById('todo-input');
const time = document.getElementById('time');
const metaText = document.getElementById('meta');
const metaBox = document.getElementById('meta-input');
const frase = document.getElementById('frase');
const autor = document.getElementById('autor');
let amPm = false;

//Set time
function displayTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  //Set am or pm
  let setAmPm = () => {
    if (amPm) {
      let amOrPm = hour >= 12 ? "AM" : "PM";
      hour = hour % 12 || 12;
      return amOrPm;
    } else {
      return "";
    }
  };

  //Set 24 hrs
  let set24 = () => {
    hour = today.getHours();
  };

  //Display Time on Dom
  if (amPm) {
    setAmPm();
  } else {
    set24();
  }

  if (min < 10 && sec < 10) {
    time.innerHTML = `${hour}:0${min}:0${sec}  ${setAmPm()}`;
  } else if (min < 10) {
    time.innerHTML = `${hour}:0${min}:${sec}  ${setAmPm()}`;
  } else if (sec < 10) {
    time.innerHTML = `${hour}:${min}:0${sec}  ${setAmPm()}`;
  } else {
    time.innerHTML = `${hour}:${min}:${sec}  ${setAmPm()}`;
  }

  setTimeout(displayTime, 1000);
}

displayTime();
