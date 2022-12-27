"use strict";

let button = document.querySelector(".block-options__button");
button.addEventListener("click", () => {
  let numberField = document.querySelector("#number-field").value;
  numberField = parseInt(numberField);

  if (numberField >= 3 && numberField <= 100) {
    document.querySelector(".block-options").classList.remove("active");

    let gameField = document.querySelector(".game-field");
    gameField.style.grid = `repeat(${numberField},100px) / repeat(${numberField},100px)`;

    let game = new TicTacToe(numberField);
    game.createField();
  }
});

class TicTacToe {
  constructor(numberField) {
    this.numberField = numberField;
  }

  #cross = "x";
  #zero = "0";
  #isCrossStep = true;
  #listFields;

  createField() {
    let gameField = document.querySelector(".game-field");

    for (let i = 0; i < this.numberField * this.numberField; i++) {
      const field = document.createElement("button");
      field.classList.add("field");

      field.addEventListener("click", () => {
        if (field.textContent != "") return;

        if (this.#isCrossStep == true) {
          field.textContent = this.#cross;
        } else {
          field.textContent = this.#zero;
        }
        this.#isCrossStep = !this.#isCrossStep;

        this.checkWiner(this.numberField);
      });

      gameField.append(field);
    }

    this.#listFields = document.querySelectorAll(".field");
  }

  checkWiner(widthField) {
    for (let i = 0; i < this.#listFields.length; i++) {
      let typeField = this.#listFields[i].textContent;
      if (typeField === "") continue;

      let secondPoint = i + widthField + 1;
      if (this.#checkLimit(secondPoint) && this.#listFields[secondPoint].textContent === typeField) {
        let thridPoint = secondPoint + widthField + 1;
        if (this.#checkLimit(thridPoint) && this.#listFields[thridPoint].textContent === typeField) {
          this.#endGame([i, secondPoint, thridPoint], typeField);

          return;
        }
      }

      secondPoint = i + widthField - 1;
      if (this.#checkLimit(secondPoint) && this.#listFields[secondPoint].textContent === typeField) {
        if (i != 0) {
          let thridPoint = secondPoint - 1 + widthField;
          if (this.#checkLimit(thridPoint) && this.#listFields[thridPoint].textContent === typeField) {
            this.#endGame([i, secondPoint, thridPoint], typeField);

            return;
          }
        }
      }

      secondPoint = i + 1;
      if (this.#checkLimit(secondPoint) && this.#listFields[secondPoint].textContent === typeField) {
        let thridPoint = secondPoint + 1;
        if (this.#checkLimit(thridPoint) && this.#listFields[thridPoint].textContent === typeField) {
          if (this.#checkSideField(widthField, secondPoint, thridPoint)) {
            this.#endGame([i, secondPoint, thridPoint], typeField);

            return;
          }
        }
      }

      secondPoint = i + widthField;
      if (this.#checkLimit(secondPoint) && this.#listFields[secondPoint].textContent === typeField) {
        let thridPoint = secondPoint + widthField;
        if (this.#checkLimit(thridPoint) && this.#listFields[thridPoint].textContent === typeField) {
          this.#endGame([i, secondPoint, thridPoint], typeField);

          return;
        }
      }
    }
  }

  #checkLimit(value) {
    return value >= 0 && value < this.#listFields.length - 1;
  }

  #checkSideField(widthField, secondPoint, thridPoint) {
    for (let i = 1; i <= widthField; i++) {
      if (thridPoint === widthField * i || secondPoint === widthField * i) {
        return false;
      }
    }
    return true;
  }

  #endGame(arrIndexField, winer) {
    arrIndexField.forEach((element) => {
      this.#listFields[element].classList.add("winner");
    });

    document.querySelector(".block-end-game").classList.add("active");

    let text = document.querySelector("#end-game__out");
    text.textContent = "Переможцем є: " + winer;

    const gameSave = new GameSave();
    let wins = gameSave.getWins();

    if (winer.toLowerCase() === "x") {
      wins.allWins.cross++;
      wins.currentWins.cross++;
    } else {
      wins.allWins.zero++;
      wins.currentWins.zero++;
    }

    document.querySelector("#all-win").textContent =
      `Всього перемог: x = ${wins.allWins.cross}. 0 = ${wins.allWins.zero}.`;

    document.querySelector("#current-win").textContent =
      `Всього перемог в сеансі: х = ${wins.currentWins.cross}. 0 = ${wins.currentWins.zero}.`;

    gameSave.setWins(wins);
  }
}

class GameSave {

  #ALL_WIN_KEY = "ALL_WIN";
  #CURRENT_WIN_KEY = "CURRENT_WIN";

  getWins() {
    let allWins = JSON.parse(localStorage.getItem(this.#ALL_WIN_KEY));
    let currentWins = JSON.parse(sessionStorage.getItem(this.#CURRENT_WIN_KEY));

    if (!currentWins) {
      currentWins = { cross: 0, zero: 0 };
    }

    if (!allWins) {
      allWins = { cross: 0, zero: 0 };
    }

    return { currentWins, allWins };
  }

  setWins(wins) {
    let allWins = JSON.stringify(wins.allWins);
    let currentWins = JSON.stringify(wins.currentWins);

    localStorage.setItem(this.#ALL_WIN_KEY, allWins);
    sessionStorage.setItem(this.#CURRENT_WIN_KEY, currentWins);
  }
}