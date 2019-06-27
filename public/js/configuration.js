const colorBox = document.getElementById('color-box');
const body = document.getElementsByTagName('body')[0];
const inputBorders = document.getElementsByClassName('input-border');
const hrs24 = document.getElementById('hrs24');
const settingBox = document.querySelector('.settings-box');
const settingIcon = document.getElementById('settings');
const imageUpload = document.getElementById('image-upload');
const tempForm = document.querySelector('.temp-form');
const tempSwitch = document.getElementById('temperature');

let boxOpen = false;

//Open Settings
settingIcon.addEventListener('click', () => {
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

//Change color
colorBox.addEventListener('change', () => {
  let colorValue = colorBox.value;
  body.style.color = colorValue;
  for (let item of inputBorders) {
    item.style.borderBottom = `2px solid ${colorValue}`;
    item.style.color = colorValue;
  }
});

//Activate/Deactivate 24hrs
hrs24.addEventListener('change', () => {
  if (amPm) {
    amPm = false;
  } else {
    amPm = true;
  }
});

//Change BG Images

imageUpload.addEventListener('change', () => {
  let readImg = new FileReader();
  let image = imageUpload.files[0];

  readImg.onloadend = ()=>{
    body.style.backgroundImage = `url('${readImg.result}')`;
  };

  if (image) {
    readImg.readAsDataURL(image);
  } else {
    preview.src = "";
  }
});

//Geolocation
window.addEventListener('load',()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getPosition);
  }
});

function getPosition(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log("latitud", lat);
  console.log("longitud", lon);
}

//temperature
temperature.addEventListener('change',()=>{
  tempForm.submit();
});
