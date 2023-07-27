import { Component } from '@angular/core';
import { Card } from '../card.model';
import { Colors, Values, Families } from '../enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  deck!: Card[];
  drawnCards!: Card[];

  firstArea!: Card[];
  secondArea!: Card[];
  thirdArea!: Card[];
  fourthArea!: Card[];
  fifthArea!: Card[];
  sixthArea!: Card[];
  seventhArea!: Card[];

  heartsArea!: Card[];
  diamondsArea!: Card[];
  clubsArea!: Card[];
  spadesArea!: Card[];

  ready!:boolean;
  
  ngOnInit() {
    this.initializeArrays();
    this.createDeck();
    this.suffleDeck();
    this.initializeGameArea();
    this.ready = true;
  }

  draw() {
    for (let i = 0; i < 3; i++) {
      this.moveCard(this.deck, this.drawnCards);
    }
  }

  moveCard(fromPile: Card[], toPile: Card[]) {
    toPile.unshift(fromPile[0]);
    fromPile.shift();
  }

  private initializeArrays() {
    this.deck = [];
    this.drawnCards = [];
    this.firstArea = [];
    this.secondArea = [];
    this.thirdArea = [];
    this.fourthArea = [];
    this.fifthArea = [];
    this.sixthArea = [];
    this.seventhArea = [];
    this.heartsArea = [];
    this.diamondsArea = [];
    this.clubsArea = [];
    this.spadesArea = [];

  }

  private initializeGameArea() {
    const gameAreas: Card[][] = [this.firstArea, this.secondArea, this.thirdArea, this.fourthArea, this.fifthArea, this.sixthArea, this.seventhArea];
    let i = 1;
    gameAreas.forEach(area => {
      for (let j = 0; j < i; j++) {
        this.moveCard(this.deck, area);
      }
      i++;
    });
  }

  private createDeck() {
    for (let i = 0; i < 4; i++) {
      let family: Families;
      let color: Colors;
      let path: string = "./assets/cards/";
      switch (i) {
        case 0:
          family = Families.Hearts;
          color = Colors.Red;
          path += "hearts";
          break;
        case 1:
          family = Families.Spades;
          color = Colors.Black;
          path += "spades";
          break;
        case 2:
          family = Families.Diamonds;
          color = Colors.Red;
          path += "diamonds";
          break;
        case 3:
          family = Families.Clubs;
          color = Colors.Black;
          path += "clubs";
          break;
        default:
          family = Families.Spades;
          color = Colors.Black;
          path += "spades";
          break;

      }
      for (let j = 0; j < 13; j++) {
        let value: Values;
        switch (j) {
          case 0:
            value = Values.Ace;
            break;
          case 1:
            value = Values.Two;
            break;
          case 2:
            value = Values.Three;
            break;
          case 3:
            value = Values.Four;
            break;
          case 4:
            value = Values.Five;
            break;
          case 5:
            value = Values.Six;
            break;
          case 6:
            value = Values.Seven;
            break;
          case 7:
            value = Values.Eight;
            break;
          case 8:
            value = Values.Nine;
            break;
          case 9:
            value = Values.Ten;
            break;
          case 10:
            value = Values.Jack;
            break;
          case 11:
            value = Values.Queen;
            break;
          case 12:
            value = Values.King;
            break;
          default:
            value = Values.Ace;
            break;
        }
        this.deck.push(new Card(value, family, color, path + " " + (j + 1) + ".webp"));
      }
    }
  }

  private suffleDeck() {
    let orderedDeck = this.deck;
    let suffledDeck: Card[] = [];
    for (let i = 0, c = this.deck.length; i < c; i++) {
      const index = Math.floor(Math.random() * orderedDeck.length);
      suffledDeck.push(orderedDeck[index]);
      orderedDeck = orderedDeck.slice(0, index).concat(orderedDeck.slice(index + 1));
    }
    this.deck = suffledDeck;
  }

}
