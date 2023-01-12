class WindowControler {
  atribute;

  constructor(atribut) {
    this.atribute = atribut;
  }

  changeSizeField(sizeArea) {
    this.atribute.gameArea.style.grid = `repeat(${sizeArea}, 1fr) / repeat(${sizeArea}, 1fr)`;

    const bound = document.querySelector(".field").getBoundingClientRect();

    const size = Math.min(bound.height, bound.width);
    this.atribute.gameArea.style.grid = `repeat(${sizeArea}, ${size}px) / repeat(${sizeArea}, ${size}px)`;
  }

  changeFontField() {
    const bound = document.querySelector(".field").getBoundingClientRect();
    const size = Math.min(bound.height, bound.width);
    const fontSize = Math.floor(size - size * 0.2);
    this.atribute.gameArea.style.fontSize = fontSize + "px";
  }
}
