"use strict";

const atribute = new Atribute();
const windowControler = new WindowControler(atribute);
let game;

atribute.gameArea.addEventListener("click", function (event) {
  if (event.target.closest(".field") && game) {
    game.changeSide(event.target);
    GameSaves.saveData("local", game);
  }
});

resizeGameArea();
window.addEventListener("resize", resizeGameArea);
function resizeGameArea() {
  const gameAreaBounding = atribute.gameArea.getBoundingClientRect();

  atribute.gameArea.style.height = gameAreaBounding.width + "px";
  if (game) {
    windowControler.changeSizeField(game.areaSize);
    windowControler.changeFontField();
  }
}

eventStorage();
window.addEventListener("storage", eventStorage);
function eventStorage() {
  game = GameSaves.loadData("local");
  if (!game) {
    return;
  }
  game.checkWiner();
  atribute.gameFieldSize.value = game.areaSize;
  atribute.amauntToWin.value = game.amauntFieldsToWin;
  resizeGameArea();
}

function resizeWindow(areaSize) {
  windowControler.changeSizeField(areaSize);
  windowControler.changeFontField();
}

atribute.buttonApply.addEventListener("click", applyGameProperties);
function applyGameProperties() {
  const fieldsSize = Number(atribute.gameFieldSize.value);
  const amauntToWin = Number(atribute.amauntToWin.value);

  if (fieldsSize > 100 || fieldsSize < 3 || amauntToWin > fieldsSize || amauntToWin < 2) {
    return;
  }

  if (game) {
    game.restart(resizeWindow, fieldsSize, amauntToWin);
    GameSaves.saveData("local", game);
    return;
  }

  game = new TicTacToe(atribute, fieldsSize, amauntToWin);

  game.createGameArea();
  windowControler.changeSizeField(fieldsSize);
  windowControler.changeFontField();
  GameSaves.saveData("local", game);
}
