import { Injectable } from '@angular/core';
import { concatMap, tap } from 'rxjs';
import { UserExpenses } from '../model/iUserExpenses';
import { ExpensesService } from './expenses.service';
@Injectable({
  providedIn: 'root'
})
export class PieChartService {
  private userExpenses: UserExpenses[] = [];
  private userExpenseSum: number = 0;
  private expensesByCategory: any = {};
  constructor(
    private readonly expensesService: ExpensesService
  ) {
    this.getUserExpenses();
  }

  public getUserExpenses() {
    return this.expensesService.getUserExpenses().pipe(
      concatMap((expense: any) => {
        this.userExpenses = [...expense];
        return expense;
      }),
      tap((expense: any) => {
        this.userExpenseSum += expense.expense;
      }),
      tap(()=> {
        this.userExpenses.forEach((item: UserExpenses) => {
          if (!this.expensesByCategory[item.category]) {
            this.expensesByCategory[item.category] = 0;
          }
          this.expensesByCategory[item.category] += item.expense;
        });
      })
    )
  } 

  public getUserExpensesByCategory() {
    return this.expensesByCategory
  }
}
