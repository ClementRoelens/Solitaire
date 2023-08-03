import { Families, Values, Colors } from "./enum";

export class Card {
    value! : Values;
    family!: Families;
    color!:Colors;
    faceUp!:boolean;
    imagePath!:string;

    constructor(value:Values,family:Families,color:Colors,imagePath:string){
        this.value = value;
        this.family = family;
        this.color = color;
        this.imagePath = imagePath;
        
        this.faceUp = false;
    }
}