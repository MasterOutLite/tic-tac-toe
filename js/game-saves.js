"use strict";

class GameData {
  isFirstStepPlayer = true;
  amauntFieldsToWin = 3;
  sizeArea = 3;
  listFields = [];

  constructor(sizeArea, amauntFieldsToWin, listFields, isFirstStepPlayer) {
    this.sizeArea = sizeArea;
    this.amauntFieldsToWin = amauntFieldsToWin;
    this.listFields = listFields;
    this.isFirstStepPlayer = isFirstStepPlayer;
  }
}

class GameSaves {
  static saveData(key, game) {
    const listSave = [];
    for (let i = 0; i < game.listFields.length; i++) {
      listSave.push(game.listFields[i].textContent);
    }

    const data = new GameData(game.areaSize, game.amauntFieldsToWin, listSave, game.isFirstStepPlayer);

    const save = JSON.stringify(data);
    localStorage.setItem(key, save);
  }

  static loadData(key) {
    const save = localStorage.getItem(key);
    const data = JSON.parse(save);

    if (!data) {
      return null;
    }

    const atribut = new Atribute();
    const game = new TicTacToe(atribut, data.sizeArea, data.amauntFieldsToWin);
    game.isFirstStepPlayer = data.isFirstStepPlayer;
    game.createGameArea();
    game.setDataInFields(data.listFields);
    game.checkWiner();
    game.setPlayerStep();
    return game;
  }
}
