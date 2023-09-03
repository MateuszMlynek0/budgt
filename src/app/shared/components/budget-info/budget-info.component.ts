import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { UserBudget } from '../../model/iUserBudget';
import { BudgetService } from '../../service/budget.service';

@Component({
  selector: 'app-budget-info',
  templateUrl: './budget-info.component.html',
  styleUrls: ['./budget-info.component.sass']
})
export class BudgetInfoComponent {
  @Input() monthlyExpensesSum: number
  @Input() lastMonthExpensesSum: number

  public currentMonth: string = moment().format('MMMM');
  public monthlyBudget$: Observable<UserBudget> = this.budgetService.getBudget(this.getLastMonth());
  public lastMonthBudget$: Observable<UserBudget> = this.budgetService.getBudget(this.getLastMonth());

  constructor(
    private readonly budgetService: BudgetService,
  ) { }

  private getLastMonth(): string {
    const originalDate = new Date();
    originalDate.setUTCMonth(originalDate.getUTCMonth() - 1)
    return originalDate.toISOString();
  }

}
