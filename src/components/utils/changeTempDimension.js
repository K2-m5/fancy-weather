function changeKtoC(t) {
  return (Math.round(t - 273.15) + '' + String.fromCharCode(176));
}

function changeKtoF(t) {
  return ((Math.round(t * 1.8 - 459.67) + '' + String.fromCharCode(176)));
}

function updateTemperature(arr) {
  const arrNew = document.querySelectorAll('.day_block--temp');
  for (let i = 0; i < arr.length; i += 1) {
    arrNew[i].innerText = arr[i];
  }
}

export { changeKtoC, changeKtoF, updateTemperature };
