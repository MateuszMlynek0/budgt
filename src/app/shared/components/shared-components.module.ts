import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BudgetFormButtonsComponent } from "./budget-form-buttons/budget-form-buttons.component";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { IncomeDialogComponent } from './income-dialog/income-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';
import { BudgetDialogComponent } from './budget-dialog/budget-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { BudgetInfoComponent } from './budget-info/budget-info.component';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [BudgetFormButtonsComponent, IncomeDialogComponent, ExpenseDialogComponent, BudgetDialogComponent, BudgetInfoComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [BudgetFormButtonsComponent, BudgetInfoComponent],
})
export class SharedComponentsModule {}
