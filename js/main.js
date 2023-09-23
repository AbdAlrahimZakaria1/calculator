function main() {
  let prevNumber = "",
    nextNumber = "",
    operator = "",
    displayValue = "";

  const currentDisplaySelector = document.querySelector(".current-operation");
  const previousDisplaySelector = document.querySelector(".calculated-result");
  const operatorDisplaySelector = document.querySelector(".selected-operator");

  function controlOperatorInput() {
    switch (this.value) {
      case "equals":
        getFinalResult();
        break;
      case "clear":
        clearAll();
      case "delete":
        deleteDigit();
      default:
        console.log("insert correct control-operation");
        return;
    }
  }

  function deleteDigit() {
    nextNumber = nextNumber.slice(0, nextNumber.length - 1);
    currentDisplaySelector.textContent = nextNumber;
  }

  function getDigitInput() {
    if (this.value === "." && nextNumber.includes(".")) return;
    nextNumber += this.value;
    console.log(nextNumber);
    currentDisplaySelector.textContent = nextNumber;
  }

  function getFinalResult() {
    mathResult = getOperationResult();
    previousDisplaySelector.textContent = nextNumber;
    currentDisplaySelector.textContent = mathResult;
  }

  function getOperatorInput() {
    if (prevNumber && nextNumber && operator) {
      operate();
    } else if (!displayValue) {
      prevNumber = nextNumber;
      displayValue = nextNumber;
      nextNumber = "";
      previousDisplaySelector.textContent = displayValue;
    }
    operator = this.value;
    operatorDisplaySelector.textContent = operator;
  }

  function operate() {
    mathResult = getOperationResult();
    previousDisplaySelector.textContent = mathResult;
    prevNumber = mathResult;
    nextNumber = "";
  }

  function clearAll() {
    prevNumber = "";
    nextNumber = "";
    operator = "";
    displayValue = "";
    currentDisplaySelector.textContent = "";
    previousDisplaySelector.textContent = "";
    operatorDisplaySelector.textContent = "";
  }

  function getOperationResult() {
    switch (operator) {
      case "÷":
        if (+nextNumber === 0) {
          clearAll();
          return "ERROR...";
        }
        return division(prevNumber, nextNumber);
      case "x":
        return multiplication(prevNumber, nextNumber);
      case "+":
        return addition(prevNumber, nextNumber);
      case "-":
        return subtraction(prevNumber, nextNumber);
      case "%":
        return remainder(prevNumber, nextNumber);
      default:
        console.log("insert correct operation");
        return;
    }
  }

  function remainder(num1, num2) {
    return num1 % num2;
  }
  function addition(num1, num2) {
    return +num1 + +num2;
  }

  function subtraction(num1, num2) {
    return num1 - num2;
  }

  function multiplication(num1, num2) {
    return num1 * num2;
  }

  function division(num1, num2) {
    return num1 / num2;
  }

  function initEventListeners() {
    const digitButtons = document.querySelectorAll(
      ".all-buttons .btn[type='digit']"
    );
    digitButtons.forEach((button) =>
      button.addEventListener("click", getDigitInput)
    );

    const mathOperatorButtons = document.querySelectorAll(
      ".all-buttons .btn[type='math-operator']"
    );
    mathOperatorButtons.forEach((button) =>
      button.addEventListener("click", getOperatorInput)
    );

    const controlOperatorButtons = document.querySelectorAll(
      ".all-buttons .btn[type='control-operator']"
    );
    controlOperatorButtons.forEach((button) =>
      button.addEventListener("click", controlOperatorInput)
    );
  }

  initEventListeners();
}

window.onload = function () {
  main();
};
