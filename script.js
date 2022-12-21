"use strict";

let isStepCross = false;
let score = 9;

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
    } else {
      element.classList.add("circle");
    }
    score--;
    isStepCross = isStepCross ? false : true;
    printSData();
    element.setAttribute("data-is-empty", "false");
  });
});

printSData();
