"use strict";

const atribute = new Atribute();
let game;

atribute.gameArea.addEventListener("click", function (event) {
  if (event.target.closest(".field") && game) {
    game.changeSide(event.target);
  }
});

resizeGameArea();
window.addEventListener("resize", resizeGameArea);
function resizeGameArea() {
  const gameAreaBounding = atribute.gameArea.getBoundingClientRect();

  atribute.gameArea.style.height = gameAreaBounding.width + "px";
  if (game) {
    game.changeSizeField();
    game.changeFontField();
  }
}

atribute.buttonApply.addEventListener("click", applyGameProperties);
function applyGameProperties() {
  const fieldsSize = Number(atribute.gameFieldSize.value);
  const amauntToWin = Number(atribute.amauntToWin.value);

  if (fieldsSize > 100 || fieldsSize < 3 || amauntToWin > fieldsSize || amauntToWin < 2) {
    return;
  }

  if (game) {
    game.restart(fieldsSize, amauntToWin);
    return;
  }

  game = new TicTacToe(atribute, fieldsSize, amauntToWin);

  game.createGameArea();
  game.changeSizeField();
  game.changeFontField();
  game.saveData();
}

game = new TicTacToe(atribute, 0, 0);
const data = game.loadData();
if (data) {
  atribute.gameFieldSize.value = data.sizeArea;
  atribute.amauntToWin.value = data.amauntFieldsToWin;
}
