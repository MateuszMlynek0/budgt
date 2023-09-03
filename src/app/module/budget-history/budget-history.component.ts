import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { UserExpenses } from 'src/app/shared/model/iUserExpenses';
import { UserIncome } from 'src/app/shared/model/iuserIncomes';

@Component({
  selector: 'app-budget-history',
  templateUrl: './budget-history.component.html',
  styleUrls: ['./budget-history.component.sass']
})
export class BudgetHistoryComponent implements OnInit, OnChanges {
  @Input() userIncomes: UserIncome[] = [];
  @Input() userExpenses: UserExpenses[] = [];
  public isMobile: boolean;
  public isLoading: boolean;
  public userHistory: any;
  public displayedColumns = ['icon', 'category', 'price'];
  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  ngOnChanges() {
    this.getUserHistory()
  }

  public getUserHistory() {
    this.userHistory = ([...this.userExpenses, ...this.userIncomes])
    .sort((a: UserIncome | UserExpenses, b: UserIncome | UserExpenses) =>
      a.date.localeCompare(b.date)
    );
  }


}
