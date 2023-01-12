"use strict";

class TicTacToe {
  isPlaying = true;
  isFirstStepPlayer = true;
  listFields;

  playerOne;
  playerTwo;

  areaSize = 3;
  amauntFieldsToWin = 3;

  atribute;
  uiControler;

  constructor(atribute, fieldsSize, amauntFieldsToWin) {
    this.atribute = atribute;
    this.areaSize = fieldsSize;
    this.amauntFieldsToWin = amauntFieldsToWin;

    this.playerOne = new Player("X");
    this.playerTwo = new Player("0");
    this.uiControler = new UIControler(atribute);
  }

  restart(resizeCallBack, fieldsSize, amauntFieldsToWin) {
    this.#clearFields();
    this.areaSize = fieldsSize;
    this.amauntFieldsToWin = amauntFieldsToWin;
    this.createGameArea();
    resizeCallBack(this.areaSize);
  }

  #clearFields() {
    let element = document.getElementById("game__area");
    while (element.firstChild) {
      element.firstChild.remove();
    }
  }

  setDataInFields(listSave) {
    for (let i = 0; i < this.listFields.length; i++) {
      this.listFields[i].textContent = listSave[i];
    }
  }

  createGameArea() {
    for (let i = 0; i < this.areaSize * this.areaSize; i++) {
      const field = document.createElement("div");
      field.classList.add("field");
      this.atribute.gameArea.append(field);
    }
    this.listFields = document.querySelectorAll(".field");
    this.setPlayerStep();
    this.isPlaying = true;
  }

  changeSide(target) {
    if (target.textContent != "") return;
    if (!this.isPlaying) return;

    if (this.isFirstStepPlayer == true) {
      target.textContent = this.playerOne.type;
    } else {
      target.textContent = this.playerTwo.type;
    }

    this.isFirstStepPlayer = !this.isFirstStepPlayer;
    this.setPlayerStep();

    this.amauntSteps++;
    this.checkWiner();
  }

  checkWiner() {
    for (let i = 0; i < this.listFields.length; i++) {
      let typeField = this.listFields[i].textContent;
      if (!typeField) continue;

      if (this.checkDiagonalRight(i)) {
        this.#endGame(i, this.areaSize + 1, typeField);
        return;
      }

      if (this.checkDiagonalLeft(i)) {
        this.#endGame(i, this.areaSize - 1, typeField);
        return;
      }

      if (this.checkDiagonalVertical(i)) {
        this.#endGame(i, this.areaSize, typeField);
        return;
      }

      if (this.checkDiagonalHorizontal(i)) {
        this.#endGame(i, 1, typeField);
        return;
      }
    }
  }

  checkDiagonalRight(index) {
    for (let field = index, i = 0; i < this.amauntFieldsToWin; field += this.areaSize + 1, i++) {
      if (!this.#checkLimit(field) || !this.#checkTypeFields(index, field)) {
        return false;
      }
    }

    return true;
  }

  checkDiagonalLeft(index) {
    for (let field = index, i = 0; i < this.amauntFieldsToWin; field += this.areaSize - 1, i++) {
      if (!this.#checkLimit(field) || !this.#checkTypeFields(index, field) || (!this.#checkLimitStart(index) && i != 0)) {
        return false;
      }
    }

    return true;
  }

  checkDiagonalVertical(index) {
    for (let field = index, i = 0; i < this.amauntFieldsToWin; field += this.areaSize, i++) {
      if (!this.#checkLimit(field) || !this.#checkTypeFields(index, field)) {
        return false;
      }
    }

    return true;
  }

  checkDiagonalHorizontal(index) {
    for (let field = index, i = 0; i < this.amauntFieldsToWin; field += 1, i++) {
      if (!this.#checkLimit(field) || (!this.#checkLimitEnd(field) && field != index) || !this.#checkTypeFields(index, field)) {
        return false;
      }
    }

    return true;
  }

  #checkTypeFields(first, second) {
    if ((!first || !second) && first != 0 && second != 0) {
      throw Error("Error");
    }

    return this.listFields[first].textContent === this.listFields[second].textContent;
  }

  #checkLimit(value) {
    return value >= 0 && value <= this.listFields.length - 1;
  }

  #checkLimitEnd(value) {
    for (let i = 1; i <= this.areaSize; i++) {
      const step = this.areaSize * i;
      if (value === step) {
        return false;
      }
    }

    return true;
  }

  #checkLimitStart(value) {
    for (let i = 0; i < this.listFields.length; i += this.areaSize) {
      if (value == i || value == i + 1) {
        return false;
      }
    }

    return true;
  }

  #endGame(startIndex, stepWin, winer) {
    for (let i = 0, step = startIndex; i < this.amauntFieldsToWin; i++, step += stepWin) {
      this.listFields[step].classList.add("winner");
    }

    this.uiControler.setPlayerWin(winer);
    this.isPlaying = false;
  }

  setPlayerStep() {
    this.uiControler.setPlayerStep(this.isFirstStepPlayer ? this.playerOne.type : this.playerTwo.type);
  }
}
