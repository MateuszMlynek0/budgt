import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { BudgetService } from '../../service/budget.service';
import { GoogleApiService } from '../../service/google-api.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Moment } from 'moment';
import { currencyList } from '../../model/budget-form.enum';
import { Subscription, switchMap } from 'rxjs';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-budget-dialog',
  templateUrl: './budget-dialog.component.html',
  styleUrls: ['./budget-dialog.component.sass'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class BudgetDialogComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public budgetForm: FormGroup;
  private userEmail: string;
  public date = new FormControl(moment());
  public minDate: Date = new Date;
  public currencyList = currencyList

  constructor(
    private googleApi: GoogleApiService, 
    public dialogRef: MatDialogRef<BudgetDialogComponent>, 
    private formBuilder: FormBuilder,
    private budgetService: BudgetService
  ) {
    this.budgetForm = this.formBuilder.group({
      userId: ["", [Validators.required]],
      budget: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      date: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userEmail = this.googleApi.getUserEmail()
  }

  public setBudget(budgetForm: FormGroup) {
    budgetForm.patchValue({
        userId: this.userEmail, 
        date: moment(this.date.value).toISOString(), 
      })
      this.subscription = this.budgetService.removeBudget(moment(budgetForm.value.date, 'YYYY-MM-DD').format("YYYY-MM")).pipe(
        switchMap(() => {
          return this.budgetService.setBudget(budgetForm.value);
        })
      ).subscribe({
        error: (err) => console.log(err),
        complete: () => this.dialogRef.close({isSaved: true})
      });
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue?.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue?.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
