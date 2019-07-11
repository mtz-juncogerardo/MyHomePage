const colorBox = document.getElementById("color-box");
const body = document.getElementsByTagName("body")[0];
const miMeta = document.getElementById("meta-input");
const hrs24 = document.getElementById("hrs24");
const settingBox = document.querySelector(".settings-box");
const settingIcon = document.getElementById("settings");
const imageUpload = document.getElementById("image-upload");
const tempFormat = document.getElementById("temp-format");
const tempSwitch = document.getElementById("temperature");
const metaSpan = document.getElementById("metaSpan");
const apodo = document.getElementById("apodo");
const temperatura = document.getElementById('temperatura');
const tempIcon = document.getElementById("temp-icon");

let celcius = true;
let boxOpen = false;
let today = `${new Date().getYear()}/${new Date().getMonth()}/${new Date().getYear()}`;

//Get Location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getWeather);
} else {
  alert(
    "No pudimos obtener acceso a tu ubicación el servicio de clima estara deshabilitado"
  );
}

//Get the weather
async function getWeather(position){

  let coords ={
    lat: position.coords.latitude,
    long: position.coords.longitude
  }

  const rawResponse = await fetch('http://localhost:3000/weather', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(coords)
  });
  let content = await rawResponse.json();
  let data = JSON.parse(content);

  if(celcius){
    temperatura.innerText = data.current.temp_c + " °C";
  }
  else{
    temperatura.innerText = data.current.temp_f + "°F";
  }

  tempIcon.src = data.current.condition.icon;

}

//Get DB data
async function getData() {
  const options = {
    method: "POST",
    body: "request",
    headers: {
      "Content-Type": "aplication/json"
    }
  };

  let response = await fetch("http://localhost:3000/home", options);
  let data = await response.json();

  return data;
}

getData().then(data => {
  body.style.color = data.colorCode;
  colorBox.value = data.colorCode;
  apodo.innerText = data.apodo;
});


//Set Bg Image & Check localStorage

if (localStorage.image) {
  body.style.backgroundImage = localStorage.image;
}

if (localStorage.meta) {
  let myGoal = JSON.parse(localStorage.meta);

  if (myGoal.time === today) {
    miMeta.value = myGoal.goal;
  }
}

//Open Settings
settingIcon.addEventListener("click", () => {
  if (boxOpen) {
    settingBox.style.transform = "translateX(50vw)";
    boxOpen = false;
  } else {
    settingBox.style.transform = "translateX(0)";
    boxOpen = true;
  }

  settingIcon.classList.remove("animate");
  void settingIcon.offsetWidth; // trigger a DOM reflow
  settingIcon.classList.add("animate");
});

//Set goal
miMeta.addEventListener("blur", () => {
  if (miMeta.value !== "") {
    metaSpan.innerText = "Vamos por todo!";

    let myGoal = {
      goal: miMeta.value,
      time: today
    };

    localStorage.setItem("meta", JSON.stringify(myGoal));
  }
});

miMeta.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    miMeta.blur();
  }
});

//Change color
colorBox.addEventListener("change", () => {
  let colorValue = colorBox.value;
  body.style.color = colorValue;
  miMeta.style.borderBottom = `2px solid ${colorValue}`;
  miMeta.style.color = colorValue;
});

//Change BG Images

imageUpload.addEventListener("change", () => {
  let readImg = new FileReader();
  let image = imageUpload.files[0];

  readImg.onloadend = () => {
    localStorage.setItem("image", `url('${readImg.result}')`);
  };

  if (image) {
    readImg.readAsDataURL(image);
  } else {
    preview.src = "";
  }
});

//Prevent Tab Key
window.addEventListener("keydown", e => {
  if (e.keyCode === 9) {
    e.preventDefault();
  }
});

//Change Temperature Format
tempFormat.addEventListener('change', ()=>{

  if(celcius){
    celcius = false;
  }
  else{
    celcius = true;
  }

  navigator.geolocation.getCurrentPosition(getWeather);
});
