class UIControler {
  atribute;

  constructor(atribut) {
    this.atribute = atribut;
  }

  setPlayerStep(playerStep) {
    this.atribute.playerStep.textContent = `Зараз хід: ${playerStep}`;
  }

  setPlayerWin(type) {
    this.atribute.playerStep.textContent = `Переміг: ${type}`;
  }
}
