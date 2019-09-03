export class Card {
    constructor(value, suit) {
      this.value = value;
      this.suit = suit;
    }
  
    score() {
      switch (this.value) {
        case 'Ace': return 1;
        case 'Two': return 2;
        case 'Three': return 3;
        case 'Four': return 4;
        case 'Five': return 5;
        case 'Six': return 6;
        case 'Seven': return 7;
        case 'Eight': return 8;
        case 'Nine': return 9;
        default:
          return 10;
      }
    }
  
    getCardString() {
      return `${this.value} of ${this.suit}`;
    }
  }
  