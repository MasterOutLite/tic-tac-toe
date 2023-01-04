"use strict";

class Player {
  #_type;

  get type() {
    return this.#_type;
  }

  constructor(type) {
    this.#_type = type;
  }
}

class GameSaves {
  #_allWinKey = "ALL_WIN";
  #_currentWinKey = "CURRENT_WIN";

  getWins() {
    let allWins = JSON.parse(localStorage.getItem(this.#_allWinKey));
    let currentWins = JSON.parse(sessionStorage.getItem(this.#_currentWinKey));

    if (!currentWins) {
      currentWins = { playerOne: 0, playerTwo: 0 };
    }

    if (!allWins) {
      allWins = { playerOne: 0, playerTwo: 0 };
    }

    return { currentWins, allWins };
  }

  addWins(winer, player) {
    const wins = this.getWins();

    if (winer.toLowerCase() === player.type.toLowerCase()) {
      wins.allWins.playerOne++;
      wins.currentWins.playerOne++;
    } else {
      wins.allWins.playerTwo++;
      wins.currentWins.playerTwo++;
    }

    this.setWins(wins);
    return wins;
  }

  setWins(wins) {
    let allWins = JSON.stringify(wins.allWins);
    let currentWins = JSON.stringify(wins.currentWins);

    localStorage.setItem(this.#_allWinKey, allWins);
    sessionStorage.setItem(this.#_currentWinKey, currentWins);
  }
}

class Property {
  get fieldAllWin() {
    return document.querySelector("#all-win");
  }

  get fieldCurrentWin() {
    return document.querySelector("#current-win");
  }

  get fieldWinner() {
    return document.querySelector("#end-game__out");
  }

  get blockEndGame() {
    return document.querySelector(".block-end-game");
  }

  get blockOptions() {
    return document.querySelector(".block-options");
  }

  get wrapper() {
    return document.querySelector(".wrapper");
  }

  get gameField() {
    return document.querySelector(".game-field");
  }

  get buttonOptions() {
    return document.querySelector(".block-options__button");
  }

  get numberField() {
    return document.querySelector("#number-field");
  }

  get numberFieldsToWin() {
    return document.querySelector("#number-field-to-win");
  }
}

class TicTacToe {
  #_isFirstStepPlayer = true;
  #listFields;

  #_playerOne;
  #_playerTwo;

  #_property;
  #_numberField;
  #_counterSteps = 0;
  #_numberFieldsToWin = 3;

  get sizeList() {
    return this.#listFields.length;
  }

  get counterFields() {
    return this.#_numberField * this.#_numberField;
  }

  get playerOne() {
    return this.#_playerOne;
  }

  get playerTwo() {
    return this.#_playerTwo;
  }

  constructor(numberField, property, numberFieldsToWin) {
    this.#_numberField = numberField;
    this.#_property = property;

    if (numberFieldsToWin >= 3) {
      this.#_numberFieldsToWin = numberFieldsToWin;
    }

    this.#_playerOne = new Player("X");
    this.#_playerTwo = new Player("0");
  }

  start() {
    this.#_property.gameField.style.grid = `repeat(${this.#_numberField}, 1fr) / repeat(${this.#_numberField}, 1fr)`;
    this.#createGameField(this.#_numberField);
  }

  changeSide(target) {
    if (target.textContent != "") return;

    if (this.#_isFirstStepPlayer == true) {
      target.textContent = this.playerOne.type;
    } else {
      target.textContent = this.playerTwo.type;
    }

    this.#_isFirstStepPlayer = !this.#_isFirstStepPlayer;
    this.#checkWiner(this.#_numberField);
    this.#_counterSteps++;
    if (this.#_counterSteps >= this.counterFields) {
      this.#_property.blockEndGame.classList.add("active");
      this.#_property.fieldWinner.textContent = "Winer is none";
    }
  }

  #createGameField(numberField) {
    for (let i = 0; i < numberField * numberField; i++) {
      const field = document.createElement("div");
      field.classList.add("field");
      this.#_property.gameField.append(field);
    }

    this.#listFields = document.querySelectorAll(".field");
    this.changeFontSize();
    this.changeSizeField();
  }

  changeSizeField() {
    const bound = document.querySelector(".field").getBoundingClientRect();
    const size = Math.min(bound.height, bound.width);
    this.#_property.gameField.style.grid = `repeat(${this.#_numberField}, ${size}px) / repeat(${this.#_numberField}, ${size}px)`;
  }

  changeFontSize() {
    const bound = document.querySelector(".field").getBoundingClientRect();
    const size = Math.min(bound.height, bound.width);
    const fontSize = Math.floor(size - size * 0.2);
    this.#_property.gameField.style.fontSize = fontSize + "px";
  }

  #checkWiner(widthField) {
    for (let i = 0; i < this.#listFields.length; i++) {
      let typeField = this.#listFields[i].textContent;
      if (typeField === "") continue;

      if (this.checkDiagonalRight(i)) {
        this.#endGame(i, this.#_numberField + 1, typeField);
        return;
      }

      if (this.checkDiagonalLeft(i)) {
        this.#endGame(i, this.#_numberField - 1, typeField);
        return;
      }

      if (this.checkDiagonalVertical(i)) {
        this.#endGame(i, this.#_numberField, typeField);
        return;
      }

      if (this.checkDiagonalHorizontal(i)) {
        this.#endGame(i, 1, typeField);
        return;
      }
    }
  }

  checkDiagonalRight(index) {
    for (let field = index, i = 0; i < this.#_numberFieldsToWin; field += this.#_numberField + 1, i++) {
      if (!this.#checkLimit(field)) {
        return false;
      }

      if (!this.#checkTypeFields(index, field)) {
        return false;
      }
    }

    return true;
  }

  checkDiagonalLeft(index) {
    for (let field = index, i = 0; i < this.#_numberFieldsToWin; field += this.#_numberField - 1, i++) {
      if (!this.#checkLimit(field)) {
        return false;
      }

      if (!this.#checkLimitStart(index) && i != 0) {
        return false;
      }

      if (!this.#checkTypeFields(index, field)) {
        return false;
      }
    }
    return true;
  }

  checkDiagonalVertical(index) {
    for (let field = index, i = 0; i < this.#_numberFieldsToWin; field += this.#_numberField, i++) {
      if (!this.#checkLimit(field)) {
        return false;
      }

      if (!this.#checkTypeFields(index, field)) {
        return false;
      }
    }

    return true;
  }

  checkDiagonalHorizontal(index) {
    for (let field = index, i = 0; i < this.#_numberFieldsToWin; field += 1, i++) {
      if (!this.#checkLimit(field)) {
        return false;
      }

      if (!this.#checkLimitEnd(field) && field != index) {
        return false;
      }

      if (!this.#checkTypeFields(index, field)) {
        return false;
      }
    }
    return true;
  }

  #checkTypeFields(first, second) {
    if ((!first || !second) && first != 0 && second != 0) {
      throw Error("Error");
    }

    return this.#listFields[first].textContent === this.#listFields[second].textContent;
  }

  #checkLimit(value) {
    return value >= 0 && value <= this.#listFields.length - 1;
  }

  #checkLimitEnd(value) {
    for (let i = 1; i <= this.#_numberField; i++) {
      const step = this.#_numberField * i;
      if (value === step) {
        return false;
      }
    }
    return true;
  }

  #checkLimitStart(value) {
    for (let i = 0; i < this.#listFields.length; i += this.#_numberField) {
      if (value == i || value == i + 1) {
        return false;
      }
    }

    return true;
  }

  #endGame(startIndex, stepWin, winer) {
    for (let i = 0, step = startIndex; i < this.#_numberFieldsToWin; i++, step += stepWin) {
      console.log(step);
      this.#listFields[step].classList.add("winner");
    }

    this.#_property.blockEndGame.classList.add("active");
    this.#_property.wrapper.classList.add("block");
    this.#_property.fieldWinner.textContent = "Переможцем є: " + winer;

    const gameSave = new GameSaves();
    const wins = gameSave.addWins(winer, this.#_playerOne);

    this.#_property.fieldAllWin.textContent = `Всього перемог: x = ${wins.allWins.playerOne}. 0 = ${wins.allWins.playerTwo}.`;
    this.#_property.fieldCurrentWin.textContent = `Всього перемог в сеансі: х = ${wins.currentWins.playerOne}. 0 = ${wins.currentWins.playerTwo}.`;
  }
}

const property = new Property();

const button = property.buttonOptions;
button.addEventListener("click", () => {
  let numberField = document.querySelector("#number-field").value;
  numberField = parseInt(numberField);

  let numberFieldsToWin = document.querySelector("#number-field-to-win").value;
  numberFieldsToWin = parseInt(numberFieldsToWin);

  if (numberField >= 3 && numberField <= 100) {
    property.blockOptions.classList.remove("active");

    const game = new TicTacToe(numberField, property, numberFieldsToWin);
    game.start();

    property.gameField.addEventListener("click", function (event) {
      if (event.target.closest(".field")) {
        game.changeSide(event.target);
      }
    });

    window.addEventListener("resize", () => {
      game.changeFontSize();
    });
  }
});
