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
}

class TicTacToe {
	#_isFirstStepPlayer = true;
	#listFields;

	#_playerOne;
	#_playerTwo;

	#_property;
	#_numberField;
	#_counterSteps = 0;

	get counterFields() {
		return this.#_numberField * this.#_numberField;
	}

	get playerOne() {
		return this.#_playerOne;
	}

	get playerTwo() {
		return this.#_playerTwo;
	}

	constructor(numberField, property) {
		this.#_numberField = numberField;
		this.#_property = property;

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
		const fontSize = Math.floor(size - (size * 0.2));
		this.#_property.gameField.style.fontSize = fontSize + "px";
	}

	#checkWiner(widthField) {
		for (let i = 0; i < this.#listFields.length; i++) {
			let typeField = this.#listFields[i].textContent;
			if (typeField === "") continue;

			let secondPoint = i + widthField + 1;
			if (this.#checkLimit(secondPoint) && this.#listFields[secondPoint].textContent === typeField) {
				let thridPoint = secondPoint + widthField + 1;
				if (this.#checkLimit(thridPoint) && this.#listFields[thridPoint].textContent === typeField) {
					this.#endGame([i, secondPoint, thridPoint], typeField);
					console.log("win1");
					return;
				}
			}

			secondPoint = i + widthField - 1;
			if (this.#checkLimit(secondPoint) && this.#listFields[secondPoint].textContent === typeField) {
				if (i != 0 && this.#checkLimitStart(i)) {
					let thridPoint = secondPoint + widthField - 1;
					if (this.#checkLimit(thridPoint) && this.#listFields[thridPoint].textContent === typeField) {
						this.#endGame([i, secondPoint, thridPoint], typeField);
						console.log("win2");
						console.log(i, secondPoint, thridPoint);
						return;
					}
				}
			}

			secondPoint = i + 1;
			if (this.#checkLimit(secondPoint) && this.#listFields[secondPoint].textContent === typeField) {
				let thridPoint = secondPoint + 1;
				if (this.#checkLimit(thridPoint) && this.#listFields[thridPoint].textContent === typeField) {
					if (this.#checkSideLimit(secondPoint, thridPoint)) {
						this.#endGame([i, secondPoint, thridPoint], typeField);
						console.log("win3");
						return;
					}
				}
			}

			secondPoint = i + widthField;
			if (this.#checkLimit(secondPoint) && this.#listFields[secondPoint].textContent === typeField) {
				let thridPoint = secondPoint + widthField;
				if (this.#checkLimit(thridPoint) && this.#listFields[thridPoint].textContent === typeField) {
					this.#endGame([i, secondPoint, thridPoint], typeField);
					console.log("win4");
					return;
				}
			}
		}
	}

	#checkLimit(value) {
		return value >= 0 && value <= this.#listFields.length - 1;
	}

	#checkSideLimit(first, second) {
		for (let i = 1; i <= this.#_numberField; i++) {
			const step = this.#_numberField * i;
			if (first === step || second === step) {
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

	#endGame(arrIndexField, winer) {
		arrIndexField.forEach((element) => {
			this.#listFields[element].classList.add("winner");
		});

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

	if (numberField >= 3 && numberField <= 100) {
		property.blockOptions.classList.remove("active");

		const game = new TicTacToe(numberField, property);
		game.start();

		property.gameField.addEventListener("click", function (event) {
			if (event.target.closest(".field")) {
				game.changeSide(event.target);
			}
		});

		window.addEventListener("resize", () => {
			game.changeFontSize();
			game.changeSizeField();
		});
	}
});
