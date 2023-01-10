"use strict";

class Atribute {
  get gameArea() {
    return document.querySelector("#game__area");
  }

  gameFieldSize = document.querySelector("#game-field-size");
  amauntToWin = document.querySelector("#amaunt-fields-to-win");

  playerStep = document.querySelector("#player-step");

  buttonApply = document.querySelector("#game__apply");
}
