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

//Change BG Images

imageUpload.addEventListener('change', () => {
  let readImg = new FileReader();
  let image = imageUpload.files[0];

  readImg.onloadend = () => {
    body.style.backgroundImage = `url('${readImg.result}')`;
  };

  if (image) {
    readImg.readAsDataURL(image);
  } else {
    preview.src = "";
  }
});

//Get geolocation
window.addEventListener('load', () => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(savePosition);
  } else {
    alert("No pudimos obtener acceso a tu ubicación el servicio de clima estara deshabilitado");
  }
});

  function savePosition(position) {
    let coords ={
      lat: position.coords.latitude,
      long: position.coords.longitude
    }

    const options ={
      method: "POST",
      body: JSON.stringify(coords),
      headers:{"Content-Type": "application/json"}
    }

    fetch('http://localhost:3000/weather/coords', options);
  }


//Prevent Tab Key
window.addEventListener('keydown', (e) => {

  if (e.keyCode === 9) {
    e.preventDefault();
  }
});
