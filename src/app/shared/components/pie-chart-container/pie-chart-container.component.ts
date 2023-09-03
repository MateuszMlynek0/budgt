import { Component, Input, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EChartsOption } from 'echarts';
import { Categories } from '../../model/ICategories';

@Component({
  selector: 'app-pie-chart-container',
  templateUrl: './pie-chart-container.component.html',
  styleUrls: ['./pie-chart-container.component.sass']
})
export class PieChartContainerComponent implements OnChanges {
  public options: EChartsOption
  public chartData: any;
  public grafArray: any
  @Input() data: any;
  @Input() userIncomeSum: number | null;
  @Input() userExpenseSum: number | null;
  @Input() expensesByCategory: Categories | null;
  @Input() incomesByCategory: Categories | null;
  @Input() monthlyIncomesByCategory: Categories | null;
  @Input() monthlyExpensesByCategory: Categories | null;

  @Input() monthlyBudget: number;
  @Input() monthlyExpenses: number | null;
  
  constructor(private readonly translate: TranslateService) { }

  ngOnChanges() {
    this.setGraf()
  }

  private setGraf() {
    this.grafArray = [
      {
        data: [
          {
            value: this.userIncomeSum,
            name: this.translate.instant('budgetForm.income'),
          },
          {
            value: this.userExpenseSum,
            name: this.translate.instant('budgetForm.expenses')
          }
        ],
        title: 'Expenses vs Incomes'
      },
      {
        data: this.expensesByCategory,
        title: 'Expenses per Category'
      },
      {
        data: this.incomesByCategory,
        title: 'Incomes per Category'
      },
      {
        data: this.monthlyIncomesByCategory,
        title: 'Monthly Incomes per Category'
      },
      {
        data: this.monthlyExpensesByCategory,
        title: 'Monthly Expenses per Category'
      },
      {
        data: [
          {
            value: this.monthlyBudget,
            name: this.translate.instant('budgetForm.budget')
          },
          {
            value: this.monthlyExpenses,
            name: this.translate.instant('budgetForm.expenses')
          }
        ],
        title: 'Monthly Budget vs Monthly Expenses',
      }
    ]
  }

}
