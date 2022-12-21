"use strict";

let isStepCross = false;
let score = 9;
const pointWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const whoseElement = document.querySelector("#whose");
const scoreElement = document.querySelector("#score");

function printSData() {
  whoseElement.textContent =
    "Зараз хід: " + (isStepCross ? "хрестика" : "нолика");
  scoreElement.textContent = "Залишилося ходів: " + score;
}

const fields = document.querySelectorAll(".field");
fields.forEach((element) => {
  element.addEventListener("click", function () {
    if (element.getAttribute("data-is-empty").toLowerCase() === "false") {
      return;
    }

    if (isStepCross == true) {
      element.classList.add("cross");
      element.textContent = "x";
    } else {
      element.classList.add("circle");
      element.textContent = "0";
    }
    score--;
    isStepCross = isStepCross ? false : true;
    printSData();
    checkWiner();

    element.setAttribute("data-is-empty", "false");
  });
});

printSData();

function checkWiner() {
  pointWin.forEach((element) => {
    let numberMatches = 1;
    const typeField = fields[element[0]].textContent;

    if (typeField === "") {
      return;
    }

    for (let i = 1; i < element.length; i++) {
      if (fields[element[i]].textContent === typeField) {
        numberMatches++;
        if (numberMatches >= 3) {
          whoseElement.textContent = "Переможцем є: " + typeField;
          console.log("Переможцем є: " + typeField);
        }
      }
    }
  });
}
