import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.sass']
})
export class InfoDialogComponent {

  public title: string;
  public message: string;
  public button: {
    'ok': string,
  };

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) {
    this.button = { 'ok' : 'Ok' };
  }

}
