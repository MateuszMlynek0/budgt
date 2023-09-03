import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { catchError, Observable, tap } from 'rxjs';
import { DialogService } from 'src/app/shared/components/dialogs/services/dialog.service';
import { Categories } from 'src/app/shared/model/ICategories';
import { UserBudget } from 'src/app/shared/model/iUserBudget';
import { UserExpenses } from 'src/app/shared/model/iUserExpenses';
import { UserIncome } from 'src/app/shared/model/iuserIncomes';
import { BudgetService } from 'src/app/shared/service/budget.service';
import { ExpensesService } from 'src/app/shared/service/expenses.service';
import { IncomesService } from 'src/app/shared/service/incomes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public isMobile: boolean;

  public userIncomeSum$: Observable<number> = this.incomesService.getUserIncomesSummary();
  public expensesByCategory$: Observable<Categories> = this.incomesService.getUserIncomesByCategory();
  public monthlyIncomesByCategory$: Observable<any> = this.incomesService.getUserMonthlyIncomesByCategory(moment().toISOString())

  public userExpenseSum$: Observable<number> = this.expensesService.getUserExpensesSummary();
  public incomesByCategory$: Observable<Categories> = this.expensesService.getUserExpensesByCategory();
  public monthlyExpensesByCategory$: Observable<Categories> = this.expensesService.getUserMonthlyExpensesByCategory(moment().toISOString())

  public monthlyBudget: number;
  public monthlyExpenses$: Observable<number> = this.expensesService.getUserExpensesSummaryByDate(moment().toISOString());

  public lastMonthExpensesSum$: Observable<number> = this.expensesService.getUserExpensesSummaryByDate(this.getLastMonth());

  public userIncomes$: Observable<UserIncome[]>= this.incomesService.getUserIncomes();
  public userExpenses$: Observable<UserExpenses[]>= this.expensesService.getUserExpenses();
  public budget$: Observable<any>;

  public chartType: string = 'barCharts';
  public isData: boolean = false;
  
  constructor(
    private readonly deviceDetector: DeviceDetectorService,
    private readonly dialogsService: DialogService,
    private readonly translate: TranslateService,
    private readonly budgetService: BudgetService,
    private readonly incomesService: IncomesService,
    private readonly expensesService: ExpensesService
  ) {
    this.isMobile = this.deviceDetector.isMobile();
  }

  ngOnInit(): void {
    this.loadData()
  }

  private loadData() {
    this.getMonthlyBudget()
  }

  public getMonthlyBudget() {
    this.budget$ = this.budgetService.getBudget(moment().toISOString()).pipe(
      tap((budget: UserBudget) => {
        this.monthlyBudget = budget.budget;
        this.isData = true;
      }),
      catchError(() => {
        return this.dialogsService.info("", this.translate.instant('Dialogs.NoBudgetIsSet'),
        { ok: this.translate.instant('Dialogs.Close') })
      })
    )
  }

  private getLastMonth(): string {
    const originalDate = new Date();
    originalDate.setUTCMonth(originalDate.getUTCMonth() - 1)
    return originalDate.toISOString();
  }

  public isFormSaved(event: boolean) {
    if (event) {
      console.log("event", event);
      this.getMonthlyBudget();
      this.loadNewData()
    }
  }

  loadNewData() {
    this.userIncomes$ = this.incomesService.getUserIncomes();
    this.userExpenses$ = this.expensesService.getUserExpenses();
  }
}
