import { Component } from '@angular/core';
import { Card } from '../card.model';
import { Colors, Values, Families } from '../enum';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { last } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  deck!: Card[];
  drawnCards!: Card[];

  playAreaGroup!: Card[][];
  familiesAreaGroup!: Card[][];

  // heartsArea!: Card[];
  // diamondsArea!: Card[];
  // clubsArea!: Card[];
  // spadesArea!: Card[];

  draggedCards!: Card[];
  dragging!: boolean;

  ready!: boolean;
  dragAreaNumber!: number;

  ngOnInit() {
    this.initializeArrays();
    this.createDeck();
    this.suffleDeck();
    this.initializeAreas();
    this.dragging = false;
    this.ready = true;
    this.dragAreaNumber = 0;
    this.draw();
  }

  draw() {
    if (this.dragging && this.dragAreaNumber === -1){
      this.disableDragMode(this.drawnCards);
    }
    if (this.deck.length > 0) {
      for (let i = 0; i < 3; i++) {
        this.moveCard(this.deck, this.drawnCards, true);
      }
    } else {
      for (let i = 0, c = this.drawnCards.length; i < c; i++) {
        this.moveCard(this.drawnCards, this.deck, false);
      }
    }
  }

  moveCard(fromPile: Card[], toPile: Card[], faceupCard: boolean) {
    toPile.push(fromPile[0]);
    fromPile.shift();
    if (faceupCard) {
      fromPile[0].faceUp = true;
    }
  }

  enableDragMode(area: Card[], cardIndex: number, areaIndex: number, authorized: boolean) {
    if (!this.dragging && authorized) {
      this.draggedCards = area.splice(cardIndex);
      this.dragAreaNumber = areaIndex;
      this.dragging = true;
    }
  }

  disableDragMode(area: Card[]) {
    this.draggedCards.forEach(card => {
      area.push(card);
    })
    this.draggedCards = [];
    this.dragging = false;
  }

  onDrop(event: CdkDragDrop<Card[]>, targetIsPile: boolean) {
    const firstDraggedCard: Card = event.item.data[0];
    const lastContainerCard: Card = event.container.data[event.container.data.length - 1];
    const previousContainerData = event.previousContainer.data;

    let targetArea;

    if ((event.previousContainer !== event.container)
      && (
        (targetIsPile && this.canDropOnPile(firstDraggedCard, lastContainerCard, event.container.data.length))
        ||
        (!targetIsPile && this.canDropOnFamily(firstDraggedCard, lastContainerCard, event.container.data.length))
      )) {
      targetArea = event.container.data;
      if (previousContainerData.length > 0) {
        previousContainerData[previousContainerData.length - 1].faceUp = true;
      }
    } else {
      targetArea = previousContainerData;
    }
    for (let i = 0, c = event.item.data.length; i < c; i++) {
      transferArrayItem(event.item.data, targetArea, 0, targetArea.length);
    }
    this.draggedCards = [];
    this.dragging = false;
  }

  canDropOnPile(firstDraggedCard: Card, lastContainerCard: Card, targetLength: number): boolean {
    if (firstDraggedCard.value === 13 && targetLength === 0) {
      return true;
    } else if (targetLength > 0) {
      if ((firstDraggedCard.value - lastContainerCard.value) === -1 && firstDraggedCard.color !== lastContainerCard.color) {
        return true;
      }
    }
    return false;
  }

  canDropOnFamily(firstDraggedCard: Card, lastContainerCard: Card, targetLength: number): boolean {
    if (firstDraggedCard.value === 1 && targetLength === 0) {
      return true;
    } else if (targetLength > 0) {
      if ((firstDraggedCard.value - lastContainerCard.value) === 1 && firstDraggedCard.family === lastContainerCard.family) {
        return true;
      }
    }
    return false;
  }

  private initializeArrays() {
    this.deck = [];
    this.drawnCards = [];

    this.draggedCards = [];
    this.playAreaGroup = [];
    this.familiesAreaGroup = [];
  }

  private initializeAreas() {
    // i permet de définir la limite de cartes à créer dans chaque pile
    // j permet de naviguer parmi les piles
    // k permet de créer chaque carte
    let i = 1;
    for (let j = 0; j < 7; j++) {
      this.playAreaGroup[j] = [];
      for (let k = 0; k < i; k++) {
        this.moveCard(this.deck, this.playAreaGroup[j], false);
      }
      i++;
    }
    this.playAreaGroup.forEach(area => {
      area[area.length - 1].faceUp = true;
    });

    for (let j = 0; j < 4; j++) {
      this.familiesAreaGroup[j] = [];
    }
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
