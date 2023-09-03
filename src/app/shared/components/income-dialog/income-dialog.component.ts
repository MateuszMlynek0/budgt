import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { GoogleApiService } from '../../service/google-api.service';
import { currencyList, incomeCategoryList } from '../../model/budget-form.enum';
import { IncomesService } from '../../service/incomes.service';

@Component({
  selector: 'app-income-dialog',
  templateUrl: './income-dialog.component.html',
  styleUrls: ['./income-dialog.component.sass']
})
export class IncomeDialogComponent implements OnInit {
  public budgetIncomeForm: FormGroup;
  public userInfo: any;
  public isLoading: boolean = false;
  private userEmail: string
  public currencyList = currencyList
  public incomeCategoryList = incomeCategoryList

  constructor(
    public dialogRef: MatDialogRef<IncomeDialogComponent>,
    private googleApi: GoogleApiService,
    private formBuilder: FormBuilder,
    private readonly incomesService: IncomesService
  ) {
    this.budgetIncomeForm = this.formBuilder.group({
      userId: ["", [Validators.required]],
      income: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      category: ["", [Validators.required]],
      date: ["", [Validators.required]],
      icon: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userEmail = this.googleApi.getUserEmail()
  }

  public addIncome(data: FormGroup) {
    data.patchValue({
      userId: this.userEmail,
      date: moment().toISOString(),
      icon: data.value.category.replace(/\s/g, '').toLowerCase()
    })
    this.incomesService.setIncome(data.value).subscribe({
      error: (err) => console.log(err),
      complete: () =>{
        this.dialogRef.close({isSaved: true});
      }
    })
  }


}
