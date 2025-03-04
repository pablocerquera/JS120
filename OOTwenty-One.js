// eslint-disable-next-line no-undef
const rl = require('readline-sync');
// eslint-disable-next-line no-undef
const chalk = require("chalk");

class Deck {
  static FULL_DECK = [['H', '2'], ['H', '3'], ['H', '4'], ['H', '5'], ['H', '6'], ['H', '7'],
  ['H', '8'], ['H', '9'],['H', '10'], ['H', 'J'], ['H', 'Q'], ['H', 'K'], ['H', 'A'],
  ['S', '2'], ['S', '3'], ['S', '4'], ['S', '5'], ['S', '6'], ['S', '7'],
  ['S', '8'], ['S', '9'],['S', '10'], ['S', 'J'], ['S', 'Q'], ['S', 'K'], ['S', 'A'],
  ['D', '2'], ['D', '3'], ['D', '4'], ['D', '5'], ['D', '6'], ['D', '7'],
  ['D', '8'], ['D', '9'],['D', '10'], ['D', 'J'], ['D', 'Q'], ['D', 'K'], ['D', 'A'],
  ['C', '2'], ['C', '3'], ['C', '4'], ['C', '5'], ['C', '6'], ['C', '7'],
  ['C', '8'], ['C', '9'],['C', '10'], ['C', 'J'], ['C', 'Q'], ['C', 'K'], ['C', 'A']];

  constructor() {
    //STUB
    //Wat sort of state does the deck need?
    // 52 Cards?
    // obviosly, we need some data structure to keep track of the cards
    this.resetDeck();
  }

  shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
      [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
    }
    return array;
  }

  resetDeck() {
    this.shuffledDeck = this.shuffle(Deck.FULL_DECK);
  }

  getCards(numberOfCards = 1) {
    let cards = this.shuffledDeck.slice(0, numberOfCards)
    this.removeCardsFromDeck(numberOfCards);
    return cards;
  }

  removeCardsFromDeck(numberOfCards) {
    for (let idx = 0; idx < numberOfCards; idx++) {
      this.shuffledDeck.shift();
    }
    
  }

}

class Participant {
  static counter = 0;


  constructor() {
    // what sort of state does a participant need?
    // Score? Hand? Amount of money available?
    // what else goes here? All the redunndant behaviors from Player and Dealer?
    this.score = 0;
    this.moneyOnHand = 5;
    this.hand = [];
  }

  getCardTotal(cards = this.hand) {
  
    // cards = [['H', '3'], ['S', 'Q'], ... ]
    let values = cards.map(card => card[1]);
  
    let sum = 0;
    values.forEach(value => {
      if (value === TwentyOneGame.ACE) {
        sum += TwentyOneGame.ACE_VALUE;
      } else if (['J', 'Q', 'K'].includes(value)) {
        sum += TwentyOneGame.FACE_CARD_VALUE;
      } else {
        sum += Number(value);
      }
    });

      // correct for Aces
    values.filter(value => value === TwentyOneGame.ACE).forEach(() => {
      if (sum > TwentyOneGame.WINNING_NUMBER) sum -= TwentyOneGame.CORRECTION_FOR_ACE;
    });

    return sum;
  }

  cardTranslation(suit, value) {
    let card = []

    switch (suit) {
      case "H":
        card.push("Hearts");
        break;
      case "S":
        card.push("Spades");
        break;
      case "D":
        card.push("Diamonds");
        break;
      case "C":
      card.push("Clubs");
      break;
    }

    switch (value) {
      case 'A':
        card.push("Ace");
        break;
      case 'K':
        card.push("King");
        break;
      case 'Q':
        card.push("Queen");
        break; 
      case 'J':
        card.push("Jack");
        break;
      default:
        card.push(value);
    }

    return `${card[1]} of ${card[0]}`;

  }

  getCardtranslation() {
    return this.hand.map(card => {
      let suit = card[0];
      let value = card[1];

      return this.cardTranslation(suit, value);

    })
  };

  resetParticipant() {
    this.resetHand();
    this.score = 0;
    this.moneyOnHand = 5;
  }

  resetHand() {
    this.hand = [];
  }

  isBust() {
      return this.getCardTotal(this.hand) > TwentyOneGame.WINNING_NUMBER
  }
  
  incrementScore() {
      this.score += 1
  }

  bet(amount) {
      this.moneyOnHand -= amount;
  }

  addMoney(amount) {
      this.moneyOnHand += amount;
  }
}

class Player extends Participant {
  constructor() {
    super()
    // What sort of state does the player need?
  }

  revealTotalOfPlayer() {
    return this.getCardTotal(this.hand)
  }
}

class Dealer extends Participant  {
  static DEALER_LIMIT = 17;
  constructor() {
    super();
  }

  dealerBets() {
    if (this.moneyOnHand < 1) return false;
    let bet = Math.floor((this.moneyOnHand * Math.random()) + 1)
    this.bet(bet);
    return bet;
  }

  revealTotalOfAllCardsButFirst() {
    const allCardsButTheFirst = this.hand.slice(1)
    return this.getCardTotal(allCardsButTheFirst)
  }
}

class TwentyOneGame {
  static WINNING_NUMBER = 21;
  static WINNING_AMOUNT = 10;
  static FACE_CARD_VALUE = 10;
  static READY = "ready";
  static YES = "yes";
  static JUST_Y = "y";
  static CORRECTION_FOR_ACE = 10;
  static ACE_VALUE = 11;
  static HIT = 'hit';
  static JUST_H = 'h';
  static STAY = 'stay';
  static JUST_S = 's';
  static NO = 'no';
  static JUST_N = 'n';
  static ACE = 'A';
  static BEST_OF_FIVE = 3
  
  
  constructor() {
    //STUB
    // what sore of state does the game need?
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
    this.moneyPot = 0
  }

  // All ACTION functions

  firstDeal() {
    if (this.player.hand.length === 0) {
      this.dealCards(this.player, 2);
      this.dealCards(this.dealer, 2)

    }
  }

  dealCards(participant, numberOfCards = 1) {
    participant.hand.push(...this.deck.getCards(numberOfCards))
  }

  joinAnd(arr, separator = ", ", word = "and") {
    if (arr.length === 2) {
      return `${arr[0]} ${word} ${arr[1]}`
    }

    let lastCard = arr[arr.length - 1];
    let phrase = arr.slice(0, -1).join(separator);

    return `${phrase}${separator}${word} ${lastCard}`

  }

  showCards(participant) {
    let ownerOfCards = participant === this.player ? "Your cards are" : "Dealers cards are";

    console.log(`${chalk.magentaBright(ownerOfCards)}: ${this.joinAnd(participant.getCardtranslation())}`);
    
  }

  playerTurn() {
    while (true) {
      if (this.player.isBust()) {
        console.log(chalk.red(`UH OH! You busted! Sorry, better luck next time. Your cards total: ${this.player.revealTotalOfPlayer()}`))
        break;
      }

      console.clear()
      console.log(`Money in the pot: ${this.moneyPot}`);
      console.log('');

      this.displayScore();
      console.log('');
      this.displayMoney();
      console.log('');
      this.displayCardGameTotals();

      console.log('');
    
      this.showCards(this.player);

      console.log('');

      let hitOrStay = rl.question(`Would you like to '(H)it') or'(S)tay').\n`).toLowerCase();

      if ([TwentyOneGame.STAY, TwentyOneGame.JUST_S].includes(hitOrStay)) {
        break;
      } else if ([TwentyOneGame.HIT, TwentyOneGame.JUST_H].includes(hitOrStay)) {
        this.dealCards(this.player);
      }
    }
  }

  dealerTurn() {
    let total;

    while (true) {
      total = this.dealer.getCardTotal(this.dealer.hand);
      
      if (total >= Dealer.DEALER_LIMIT) {
        break;
      }
      this.dealCards(this.dealer);
    }
  }

  playerReadyPrompt() {
    console.log("Are you ready?");
    while (true) {
      let ready = rl.question().toLowerCase();
      if ([TwentyOneGame.READY, TwentyOneGame.YES, TwentyOneGame.JUST_Y].includes(ready)) {
        break;
      } else {
        console.log("Whenever you are ready type ready or (y)es.");
      }
    }
  }

  placeBets() {
    let betAmount;
    if (this.player.moneyOnHand < 1) {
      return null;
    }
    let prompt = `Place a bet between 1 and ${this.player.moneyOnHand}     `
    while (true) {
      betAmount = rl.question(prompt);
      if (betAmount >= 1 && betAmount <= this.player.moneyOnHand) break;
    }
    return Number(betAmount);
  }

  addToPot(amount) {
    this.moneyPot += amount;
  }    
  
  increaseScore(winner) {
    if (winner === 'tie') {return null
    } else {
      winner.incrementScore();
    }
  }
  
  // All DISPLAY functions

  displayWelcomeMessage() {
    console.log(`Welcome to my legal age of drinking game. (${TwentyOneGame.WINNING_NUMBER})`)
    console.log(`The player closer to ${TwentyOneGame.WINNING_NUMBER} wins!`)
    console.log(`Ace: 1 or 11,\nNumbered cards: number on card\nFace Cards: ${TwentyOneGame.FACE_CARD_VALUE}`)
    console.log(`First to 5 wins! You: ${chalk.blue(this.player.score)} Dealer: ${chalk.green(this.dealer.score)}`);
    console.log(`Or first to ${TwentyOneGame.WINNING_AMOUNT} dollars wins.`)
    console.log("Enjoy!")
  }

  displayGoodbyeMessage() {
    console.log("Thank you for playing my game! I hope you had so much fun!")
  }

  displayGameResult(winner) {
    let playerWon = chalk.greenBright(`Congrats, you are the lucky one and you won the round. Maybe buy a lottery ticket...`);
    let dealerWon = chalk.redBright(`YOU LOST...not so lucky this round...maybe stay inside today.`);
    let itIsTie = `Looks like you guys ${chalk.yellowBright("tied")} this round.`;

    if (winner === 'tie') {
      console.log(itIsTie);
    } else if (winner === this.player) {
      console.log(playerWon);
    } else if (winner === this.dealer){
      console.log(dealerWon);
    }
  }

  displayMatchResult() {
    let playerWon = chalk.greenBright("Congradulations you won the MATCH...you got lucky. Hopefully your luck continues in other things...");
    let dealerWon = chalk.redBright("Oh no, you lost the MATCH...I think this is a bad omen...");
    let itIsTie = chalk.yellowBright("You tied the MATCH! Thats crazy!!");

    if (this.dealer.score=== this.player.score) {
      console.log(itIsTie);

      return null;
    }

    if (this.playerIsMatchWinner()) {
      console.log(playerWon);
    } else if (!this.playerIsMatchWinner()) {
      console.log(dealerWon);
    }
  }
  
  displayCardGameTotals() {
    console.log(`Your cards total: ${chalk.greenBright(this.player.revealTotalOfPlayer())}`);
    console.log(`And this the total of the cards you can see for the dealer: ${chalk.blueBright(this.dealer.revealTotalOfAllCardsButFirst())}`);
  }

  displayCardTotals() {
    console.log(`Your cards total: ${chalk.greenBright(this.player.revealTotalOfPlayer())}`);
    console.log(`This the total of the cards the dealer: ${chalk.blueBright(this.dealer.getCardTotal())}`);
  }

  displayScore() {
    console.log(`Your score: ${chalk.greenBright(this.player.score)}\nDealer score: ${chalk.blueBright(this.dealer.score)}`);
  }

  displayMoney() {
    console.log(`Player money left ${this.player.moneyOnHand > 2 ? chalk.green(this.player.moneyOnHand) : chalk.redBright(this.player.moneyOnHand)}
Dealer money left ${this.dealer.moneyOnHand > 2 ? chalk.green(this.dealer.moneyOnHand) : chalk.redBright(this.dealer.moneyOnHand)}`);
  }

  displayOutOfMoneyMsg() {
    this.player.moneyOnHand < 1 ? console.log("You are out of money to gamble, sorry.") : console.log("The dealer is out of money...")
  }

  displayMoneyResults() {
    if (this.dealer.moneyOnHand >= this.player.moneyOnHand) {
      if (this.player.moneyOnHand === 0) {
        console.log(chalk.redBright("You lost all of your money..."))
      } else {
        console.log(chalk.redBright("Looks like you did not walk away with any extra money. 🙂‍↔️ But at least you got some..."));
      }
    } else {
      console.log(chalk.greenBright("Looks like you got some money this time! 🙂‍↕️"))
    }
  }

  playOneGame() {
    while (true) {

      this.firstDeal();

      this.playerTurn();
      if (this.player.isBust()) break;

      this.dealerTurn();
      console.log(`Dealers Total: ${this.dealer.getCardTotal()}`);
      this.showCards(this.dealer)
      if (this.dealer.isBust()) break;

      if (this.gameOver()) break;
    }
  }

  playMatch() {
    let winner;
    let playerBet;
    let dealerBet;


    while (true) {
      console.clear();      

      playerBet = this.placeBets();
      dealerBet = this.dealer.dealerBets();

      if (!playerBet) break;
      if (!this.dealer.dealerBets) break;
      this.addToPot(dealerBet);
      this.player.bet(playerBet);
      this.addToPot(playerBet);

      this.deck.resetDeck();
      this.player.resetHand();
      this.dealer.resetHand();
      this.playOneGame();

      winner = this.isWinner();
      this.displayGameResult(winner);
      this.increaseScore(winner);
      if (winner === 'tie') {
        this.returnMoney(playerBet, dealerBet);
        this.resetPot();
      } else {
        this.winPot(winner, this.moneyPot);
      }
      this.resetPot();

      if (this.outOfMoney()) break;

      if (this.bestOfFive()) break;

      this.playerReadyPrompt();
    }
  }

  playAgain() {
    let answer;
    while (true) {
      answer = rl.question("Would you like to play again??  ")

      if ([TwentyOneGame.JUST_Y, TwentyOneGame.YES].includes(answer)) {
        break;
      } else if ([TwentyOneGame.JUST_N, TwentyOneGame.NO].includes(answer)) {
        break;
      } else {
        console.log("I need a (y)es or a (n)o.  ");
        console.log('');
      }
    
    }
      
      return [TwentyOneGame.JUST_Y, TwentyOneGame.YES].includes(answer);
  
  }

  // game function runs the full game
  start() {

    console.clear();
    this.displayWelcomeMessage();
    this.playerReadyPrompt();

    while (true) {

      this.playMatch();


      console.clear();
      this.displayGameResult(this.isWinner());
      console.log('')

      if (this.outOfMoney()) {
        this.displayOutOfMoneyMsg();
        console.log('')
      }

      this.displayScore();
      console.log('')

      this.displayMoney();
      console.log('')

      this.displayMoneyResults();
      console.log('')

      this.displayCardTotals();
      this.displayMatchResult();
      console.log('')



      if (!this.playAgain()) break;

      this.resetGame();      
    }
    console.log('')
    this.displayGoodbyeMessage();
    }

    // All END OF GAME or END OR ROUND functions

    isWinner() {
      let playerTotal = this.player.getCardTotal();
      let dealerTotal = this.dealer.getCardTotal();

      if (playerTotal === dealerTotal) {
        return 'tie';
      } else if (playerTotal > dealerTotal && playerTotal <= 21 || this.dealer.isBust()) {
        return this.player;
      } else if (dealerTotal > playerTotal && dealerTotal <= 21 || this.player.isBust()) {
        return this.dealer;
      }


    }

    playerIsMatchWinner() {
      return this.player.score > this.dealer.score;
    }

    winPot(winner, amount) {
      winner === 'tie' ? null : winner.addMoney(amount);
    } 

    returnMoney(playerBet, dealerBet) {
       this.player.moneyOnHand += playerBet;
       this.dealer.moneyOnHand += dealerBet;
    }

    resetPot() {
      this.moneyPot = 0;
    }
    
    gameOver() {
      return true;
    }

    bestOfFive() {
      return this.player.score >= TwentyOneGame.BEST_OF_FIVE || this.dealer.score >= TwentyOneGame.BEST_OF_FIVE;
    }

    outOfMoney() {
      return this.player.moneyOnHand < 1 || this.dealer.moneyOnHand < 1;
    }

    resetGame() {
      this.player.resetParticipant();
      this.dealer.resetParticipant();
      this.deck.resetDeck();
    }
  

}

 
let game = new TwentyOneGame();
game.start();
