// eslint-disable-next-line no-undef
const rlSync = require('readline-sync');


class Board {
  constructor() {
    this.reset();
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |  ");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    console.clear();
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.isUnusedSquare(key));
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  counterMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }
}

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  toString() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  getScore() {
    return this.score;
  }

  incrementScore() {
    this.score += 1;
  }

}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }

}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static MATCH_GOAL = 3;
  static POSSIBLE_WINNING_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
  ]

  static joinOr(arr, separator = ", ", word = "or") {
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) {
      return `${arr[0]} ${word} ${arr[1]}`;
    }
    let lastNumber = arr[arr.length - 1];
    
    let phrase = arr.slice(0, -1).join(separator);
    
    return `${phrase}${separator} ${word} ${lastNumber}`;
  }
  
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = this.human;

  }

  play() {
    console.clear();
    this.displayWelcomeMessage();

    this.playMatch();
    
    this.board.display();
    
    console.log("")
    this.displayGoodbyeMessage()


  }  
  
  playOneGame() {

    let currentPlayer = this.firstPlayer;
    this.board.reset();
    this.board.display();

      while (true) {
      
      this.playerMoves(currentPlayer);
      
      if (this.gameOver()) break;
      this.board.displayWithClear();
      currentPlayer = this.togglePlayer(currentPlayer);
    }
  }  
  
  playMatch() {
    console.log(`First player to get ${TTTGame.MATCH_GOAL} points wins the match.`);

    while (true) {
      this.playOneGame();
      this.countScore();
      this.displayScore();

      if (this.matchOver()) break;
      if (!this.playAgain()) break;
      this.firstPlayer = this.togglePlayer(this.firstPlayer);
    }

    this.displayMatchResult();
    
  }

  displayWelcomeMessage() {
    console.log("Welcome to my Tic Tac Toe game!!!")
  }

  displayGoodbyeMessage() {
    console.log("Thank you for play Tic Tac Toe! Goodbye...for now.")
  }

  displayResult() {
    if (this.isWinner(this.human)) {
      console.log("You beat a computer that is randomly picking. Congratulations?");
    } else if (this.isWinner(this.computer)) {
      console.log("I won. And I wasn't even trying....")
    } else {
      console.log("A tie game? Were you also picking at random???")
    }
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square between |${TTTGame.joinOr(validChoices)}|: `;
      choice = rlSync.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, you picked an invalid number.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());


  }

  computerMoves() {

  

    let choice = this.pickMiddleSquare() || this.offensiveComputerMove() || this.defensiveComputerMove();

    if (!choice) {
      let validChoices = this.board.unusedSquares();

      do {
        choice = Math.floor((9 * Math.random()) + 1).toString();
      } while (!validChoices.includes(choice));
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  defensiveComputerMove() {
    return this.findCriticalSquare(this.human);
  }

  offensiveComputerMove() {
    return this.findCriticalSquare(this.computer);
  }

  findCriticalSquare(player) {
    for (let idx = 0; idx < TTTGame.POSSIBLE_WINNING_ROWS.length; ++idx) {
      let row = TTTGame.POSSIBLE_WINNING_ROWS[idx];
      let key = this.criticalSquare(row, player);
      if (key) return key;
    }
    return null;  
  }

  criticalSquare(row, player) {
    if (this.board.counterMarkersFor(player, row) === 2) {
      let idx = row.findIndex(key => this.board.isUnusedSquare(key));
      if (idx >= 0) return row[idx];
    }
    return null;  
  }


  pickMiddleSquare() {
    if (this.board.unusedSquares().includes('5')) {
      return 5;
    }
    return null;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  countScore() {
    if (this.isWinner(this.human)) {
      this.human.incrementScore();
    } else if (this.isWinner(this.computer)) {
      this.computer.incrementScore();
    }
  }

  displayScore() {
    console.log(`Human: ${this.human.getScore()}, Computer: ${this.computer.getScore()}`)
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.counterMarkersFor(player, row) === TTTGame.MATCH_GOAL;
    });
  } 

  isMatchWinner(player) {
    return player.getScore() >= TTTGame.MATCH_GOAL;
  }

  matchOver() {
    return this.isMatchWinner(this.human) || this.isMatchWinner(this.computer);
  }

  togglePlayer(player) {
    return player === this.human ? this.computer : this.human;
  }

  playerMoves(currentPlayer) {
    if (currentPlayer === this.human) {
      this.humanMoves();
    } else {
      this.computerMoves();
    }
  }

  displayMatchResult() {
    if (this.human.getScore() > this.computer.getScore()) {
      console.log("You won this Match! Good for you...")
    } else if (this.human.getScore() < this.computer.getScore()) {
      console.log("Thats too bad. Better practice your tic tac toe skills...")
    }
  }

  playAgain() {
    this.board.display();
    let answer;
    while (true) {
      answer = rlSync.question("Would you like to play again??  ")

      if (answer === 'y') {
        break;
      } else if (answer === 'n') {
        break;
      } else {
        console.log("I need a 'y' or a 'n'  ");
        console.log('');
      }
    
    }
    
    return answer === 'y';

  }
}

let game = new TTTGame();
game.play();