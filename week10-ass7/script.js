let display = document.getElementById('display');

function appendNumber(num) {
  display.value += num;
}

function appendOperator(operator) {
  display.value += operator;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    alert("Invalid Expression!");
    display.value = '';
  }
}

function square() {
  if (display.value === '') {
    alert("Please enter a number first!");
  } else {
    display.value = Math.pow(eval(display.value), 2);
  }
}

function cube() {
  if (display.value === '') {
    alert("Please enter a number first!");
  } else {
    display.value = Math.pow(eval(display.value), 3);
  }
}
