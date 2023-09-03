import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetDialogComponent } from '../budget-dialog/budget-dialog.component';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { IncomeDialogComponent } from '../income-dialog/income-dialog.component';
@Component({
  selector: 'app-budget-form-buttons',
  templateUrl: './budget-form-buttons.component.html',
  styleUrls: ['./budget-form-buttons.component.sass']
})
export class BudgetFormButtonsComponent implements OnInit {
  @Output() isSaved: EventEmitter<boolean> = new EventEmitter();
  constructor(private dialog: MatDialog) { }
  
  ngOnInit(): void {

  }
  
  public openIncomeDialog() {
    const dialogRef = this.dialog.open(IncomeDialogComponent);
    dialogRef.addPanelClass("dialog-rounded-bozrder")
    dialogRef.afterClosed().subscribe((data) => data.isSaved ? this.isSaved.emit(true) : null)
  }

  public openExpenseDialog() {
    const dialogRef = this.dialog.open(ExpenseDialogComponent);
    dialogRef.addPanelClass("dialog-rounded-border")
    dialogRef.afterClosed().subscribe((data) => data.isSaved ? this.isSaved.emit(true) : null)
  }

  public openBudgetDialog() {
    const dialogRef = this.dialog.open(BudgetDialogComponent);
    dialogRef.addPanelClass("dialog-rounded-border")
    dialogRef.afterClosed().subscribe((data) => data.isSaved ? this.isSaved.emit(true) : null)
  }

}
