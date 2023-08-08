import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-starting-dialog',
  templateUrl: './starting-dialog.component.html',
  styleUrls: ['./starting-dialog.component.css']
})
export class StartingDialogComponent {

  isChecked:boolean = false;

  constructor(public dialogRef:MatDialogRef<StartingDialogComponent>){}

  dontShowAgain(){
    if (this.isChecked){
      localStorage.setItem("dontShowAgain","dontShowAgain");
    }
  }
}
