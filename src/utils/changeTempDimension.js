export function changeKtoC(t) {
  return Math.round(((t - 32) * 5) / 9);
}

export function changeKtoF(t) {
  return Math.round((t * 9) / 5) + 32;
}

export function updateTemperature(arr) {
  const arrNew = document.querySelectorAll('.day_block--temp');
  for (let i = 0; i < arr.length; i += 1) {
    arrNew[i].innerText = arr[i];
  }
}
