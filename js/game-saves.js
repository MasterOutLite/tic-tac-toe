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
  static saveData(key, data) {
    const save = JSON.stringify(data);
    localStorage.setItem(key, save);
  }

  static loadData(key) {
    const save = localStorage.getItem(key);
    const data = JSON.parse(save);
    return data;
  }
}
