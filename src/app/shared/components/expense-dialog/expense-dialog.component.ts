import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { BudgetService } from '../../service/budget.service';
import { GoogleApiService } from '../../service/google-api.service';
import { currencyList, expenseCategoryList } from '../../model/budget-form.enum';
import { ExpensesService } from '../../service/expenses.service';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.sass']
})
export class ExpenseDialogComponent implements OnInit {
  public budgetExpenseForm: FormGroup
  public userInfo: any;
  public isLoading: boolean = false;
  private userEmail: string
  public currencyList = currencyList
  public expenseCategoryList = expenseCategoryList

  constructor(
    private readonly googleApi: GoogleApiService, 
    private formBuilder: FormBuilder, 
    private readonly budgetService: BudgetService,
    private readonly expensesService: ExpensesService,
    public dialogRef: MatDialogRef<ExpenseDialogComponent>) {
      this.budgetExpenseForm = this.formBuilder.group({
        userId: ["", [Validators.required]],
        expense: ["", [Validators.required]],
        currency: ["", [Validators.required]],
        category: ["", [Validators.required]],
        shopName: [''],
        boughtIn: [''],
        date: ["", [Validators.required]],
        icon: ["", [Validators.required]],
        paymentMethod: [""],
    })
  }

  ngOnInit(): void {
    this.userEmail = this.googleApi.getUserEmail()
  }

  public addExpense(data: FormGroup) {
      this.budgetExpenseForm.patchValue({
        userId: this.userEmail, 
        date: moment().toISOString(),
        icon: data.value.category.replace(/\s/g,'').toLowerCase()
      });

      this.expensesService.setExpense(data.value).subscribe({
        error: (err) => console.log(err),
        complete: () => this.dialogRef.close({isSaved: true})
      })
  }

}
