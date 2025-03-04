
// eslint-disable-next-line no-undef
const rlSync = require('readline-sync');

function readability(move) {
  switch (move) {
    case 'ro':
      return 'rock';
    case 'pa':
      return 'paper';
    case 'sc':
      return 'scissors';
    case 'sp':
      return 'spock';
    case 'li':
      return 'lizard';
    default:
      return move;
  }
}




const moveHistory = {
  pastHuman: [],

  pastComputer: [],

  trackMove(winner, game) {
    if (winner === 'human') {
      this.pastHuman.push(game.human.move.toUpperCase())
    } else if (winner === 'computer') {
        this.pastComputer.push(game.computer.move.toUpperCase())
    }
  }

}


class RPSGame {

  constructor() {
    this.human = new createHuman();
    this.computer = new createComputer();
    this.winner = null;
  }
  
  SCORE = {
    humanScore: 0,
    computerScore: 0,
    winningScore: 3,
  
    resetScore() {
      this.humanScore = 0;
      this.computerScore = 0;
    },
  
    incrementScore(result) {
      if (result === 'tie') return 'tie';
      result === 'human' ? this.humanScore += 1 : this.computerScore += 1;
    },
  
    checkScore() {
      if (this.humanScore === this.winningScore || this.computerScore === this.winningScore) return true;
    },
  
    displayScore() {
      console.log(`The score is,\nHuman: ${this.humanScore}\nComputer: ${this.computerScore}`)
    },
  }


  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors, Spock, Lizard');
  }

  displayGoodbyeMessage() {
    console.log(`Computer winning choices: ${moveHistory.pastComputer.join(', ')}\nHuman winning choices: ${moveHistory.pastHuman.join(', ')}\n\nThe final score is\nHuman: ${this.SCORE.humanScore}\nComputer: ${this.SCORE.computerScore}\nThanks for playing Rock, Paper, Scissors, Spock, Lizard. Goodbye!`);
  }

  displayWinner() {
    if (this.winner === 'human') {
      console.log('YOU WIN!');
    } else if (this.winner === 'computer') {
      console.log('COMPUTER WINS!');
    } else {
      console.log("It's a tie");
    }
  }

  displaySeriesWinner() {
    console.log(`${this.winner === 'human' ? 'YOU are' : 'The COMPUTER is'} the WINNER!!!!!`);
  }

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = rlSync.question();
    return answer.toLowerCase()[0] === 'y';
  }

  determineWinner() {
    let humanMove = this.human.move.slice(0, 2);
    let computerMove = this.computer.move.slice(0, 2);
    
  
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);
  
    if ((humanMove === 'ro' && ['sc', 'li'].includes(computerMove)) ||
        (humanMove === 'pa' && ['sp', 'ro'].includes(computerMove)) ||
        (humanMove === 'sc' && ['pa', 'li'].includes(computerMove)) ||
        (humanMove === 'li' && ['sp', 'pa'].includes(computerMove)) ||
        (humanMove === 'sp' && ['ro', 'sc'].includes(computerMove))) {
      this.winner = 'human';
    } else if ((computerMove === 'ro' && ['sc', 'li'].includes(humanMove)) ||
              (computerMove === 'pa' && ['sp', 'ro'].includes(humanMove)) ||
              (computerMove === 'sc' && ['pa', 'li'].includes(humanMove)) ||
              (computerMove === 'li' && ['sp', 'pa'].includes(humanMove)) ||
              (computerMove === 'sp' && ['ro', 'sc'].includes(humanMove))) {
      this.winner = 'computer';
    } else {
      this.winner = 'tie';
    }
  }

  play() {
    console.clear();
    
    while (true) {
      console.clear();
      this.displayWelcomeMessage();
      this.SCORE.resetScore();
      
      while (true) {
        
        this.human.choose();
        this.computer.choose();
        console.clear();
        this.determineWinner();
        this.displayWinner();
        this.SCORE.incrementScore(this.winner);
        this.SCORE.displayScore();
        
        moveHistory.trackMove(this.winner, this);
        if (this.SCORE.checkScore()) break;
      }
      console.clear();
      this.displaySeriesWinner();
      if (!this.playAgain()) break;
      
      }
      console.clear();
      this.displayGoodbyeMessage();
    }
}

RPSGame.prototype.constructor = RPSGame;


// parent to the players

class Player {
  constructor () {
      this.move = null;
  }
}


// human function

class createHuman extends Player {
  constructor() {
    super();
  }


  choose() {
    let choice;
    
    while (true) {
      console.log('Please choose (ro)ck, (pa)per, (sc)issors, (sp)ock, or (li)zard:');
      choice = rlSync.question();
      if (['rock', 'ro', 'paper', 'pa', 'scissors', 'sc', 'spock', 'sp', 'lizard', 'li'].includes(choice)) break;
      console.log('Sorry, invalid choice.');
    }

    this.move = readability(choice);
  };
}

// computer function

class createComputer extends Player {
  constructor() {
    super();
  }


  choose() {
    const choices = ['ro', 'pa', 'sc', 'sp', 'li'];
    let randomIndex = Math.floor(Math.random() * choices.length);
    this.move = readability(choices[randomIndex]);
  }
}


let game = new RPSGame();

// console.log(game.SCORE.computerScore)
game.play();