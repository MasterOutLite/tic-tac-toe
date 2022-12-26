"use strict";

let button = document.querySelector(".block-options__button");
button.addEventListener("click", () => {
  let numberField = document.querySelector("#number-field").value;
  numberField = parseInt(numberField);
  if (numberField >= 3 && numberField < 101) {
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

  #isCrossStep = true;
  #listFields;
  #ALL_WIN = "ALL_WIN";
  #CURRENT_WIN = "CURRENT_WIN";

  createField() {
    let gameField = document.querySelector(".game-field");

    for (let i = 0; i < this.numberField * this.numberField; i++) {
      const field = document.createElement("button");
      field.classList.add("field");
      field.addEventListener("click", () => {
        if (field.textContent != "") return;
        if (this.#isCrossStep == true) {
          field.textContent = "X";
        } else {
          field.textContent = "0";
        }
        this.#isCrossStep = this.#isCrossStep ? false : true;

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
      if (secondPoint > this.#listFields.length - 1 == false) {
        if (this.#listFields[secondPoint].textContent === typeField) {
          let thridPoint = secondPoint + widthField + 1;
          if (thridPoint > this.#listFields.length - 1 == false) {
            if (this.#listFields[thridPoint].textContent === typeField) {
              this.#endGame([i, secondPoint, thridPoint], typeField);
              return;
            }
          }
        }
      }

      secondPoint = i + widthField - 1;
      if (secondPoint > 0 && secondPoint < this.#listFields.length - 1) {
        if (i != 0) {
          if (this.#listFields[secondPoint].textContent === typeField) {
            let thridPoint = secondPoint - 1 + widthField;
            if (thridPoint > 0 && thridPoint < this.#listFields.length - 1) {
              if (this.#listFields[thridPoint].textContent === typeField) {
                this.#endGame([i, secondPoint, thridPoint], typeField);
                return;
              }
            }
          }
        }
      }

      secondPoint = i + 1;
      if (secondPoint > this.#listFields.length - 1 == false) {
        if (this.#listFields[secondPoint].textContent === typeField) {
          let thridPoint = secondPoint + 1;
          if (thridPoint > this.#listFields.length - 1 == false) {
            if (this.#listFields[thridPoint].textContent === typeField) {
              let isWiner = true;
              for (let i = 1; i <= widthField; i++) {
                if (
                  (thridPoint === widthField * i) |
                  (secondPoint === widthField * i)
                ) {
                  isWiner = false;
                  break;
                }
              }

              if (isWiner == true) {
                this.#endGame([i, secondPoint, thridPoint], typeField);
                return;
              }
            }
          }
        }
      }

      secondPoint = i + widthField;
      if (secondPoint > this.#listFields.length - 1) continue;
      if (this.#listFields[secondPoint].textContent === typeField) {
        let thridPoint = secondPoint + widthField;
        if (thridPoint > this.#listFields.length - 1) continue;
        if (this.#listFields[thridPoint].textContent === typeField) {
          this.#endGame([i, secondPoint, thridPoint], typeField);
          return;
        }
      }
    }
  }

  #endGame(arrIndexField, winer) {
    arrIndexField.forEach((element) => {
      this.#listFields[element].classList.add("winner");
    });
    document.querySelector(".block-end-game").classList.add("active");

    let text = document.querySelector("#end-game__out");
    text.textContent = "Переможцем є: " + winer;

    let wins = this.#getWins();

    if (winer.toLowerCase() === "x") {
      wins.allWins.cross++;
      wins.currentWins.cross++;
    } else {
      wins.allWins.zero++;
      wins.currentWins.zero++;
    }

    document.querySelector("#all-win").textContent =
      "Всього перемог: x = " +
      wins.allWins.cross +
      ". 0 = " +
      wins.allWins.zero;
    document.querySelector("#current-win").textContent =
      "Всього перемог в сеансі: х = " +
      wins.currentWins.cross +
      ". 0 = " +
      wins.currentWins.zero;

    this.#setWins(wins);
  }

  #getWins() {
    let allWins = JSON.parse(localStorage.getItem(this.#ALL_WIN));
    let currentWins = JSON.parse(sessionStorage.getItem(this.#CURRENT_WIN));

    if (
      currentWins === null ||
      currentWins === undefined ||
      currentWins == "undefined"
    ) {
      currentWins = { cross: 0, zero: 0 };
    }

    if (allWins == null || allWins == undefined || allWins == "undefined") {
      allWins = { cross: 0, zero: 0 };
    }

    return { currentWins, allWins };
  }

  #setWins(wins) {
    let allWins = JSON.stringify(wins.allWins);
    let currentWins = JSON.stringify(wins.currentWins);

    localStorage.setItem(this.#ALL_WIN, allWins);
    sessionStorage.setItem(this.#CURRENT_WIN, currentWins);
  }
}
