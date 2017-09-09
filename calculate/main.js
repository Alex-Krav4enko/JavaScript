var i;
var form = document.forms.calc;
var summA = form.elements.summA;
var summB = form.elements.summB;
var operation = form.elements.operation;
var result = form.elements.result;
var inputMass = document.getElementsByClassName('form__input');

function getChar(event) {
  if (event.which == null) {
    if (event.keyCode < 32) return null;
    return String.fromCharCode(event.keyCode);
  }
  if (event.which != 0 && event.charCode != 0) {
    if (event.which < 32) return null;
    return String.fromCharCode(event.which);
  }
  return null;
}

function onlyNumber(e) {
  e = e || event;
  var chr = getChar(e);
  if (e.ctrlKey || e.altKey || chr == null) return;
  if (chr < '0' || chr > '9') return false;
}

function calculate() {
  var sumA = +summA.value;
  var sumB = +summB.value;
  var selectOperation = +operation.value;
  if (!summA || !summB) return;
  if (selectOperation === 0) {
    result.value = sumA + sumB;
    result.previousSibling.textContent = 'A + B = ';
  } else if (selectOperation === 1) {
    result.value = sumA * sumB;
    result.previousSibling.textContent = 'A * B = ';
  }
}

for (i = 0; i < inputMass.length; i++) {
  inputMass[i].onkeyup = calculate;
  inputMass[i].oninput = calculate;
  inputMass[i].onkeypress = onlyNumber;
}

operation.onchange = calculate;
