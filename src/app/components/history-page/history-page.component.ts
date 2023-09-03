import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, tap } from 'rxjs';
import { UserExpenses } from 'src/app/shared/model/iUserExpenses';
import { UserIncome } from 'src/app/shared/model/iuserIncomes';
import { ExpensesService } from 'src/app/shared/service/expenses.service';
import { HistoryService } from 'src/app/shared/service/history.service';
import { IncomesService } from 'src/app/shared/service/incomes.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.sass']
})
export class HistoryPageComponent implements AfterViewInit {
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private userIncomes: UserIncome[] = [];
  private userExpenses: UserExpenses[] = [];
  public isMobile: boolean = this.deviceDetector.isMobile();;
  public isLoading: boolean;
  public userHistory: any = [];
  public displayedColumns = ['icon', 'Shopname', 'category','boughtIn', 'paymentMethod', 'price', 'date','remove'];

  public userHistory$: Observable<any> = this.historySerice.getHistory()
  constructor(
    private readonly deviceDetector: DeviceDetectorService,
    private readonly incomesService: IncomesService,
    private readonly expensesService: ExpensesService,
    private readonly historySerice: HistoryService
  ) { }

  ngAfterViewInit() {
    if (this.dataSource !== undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("event", filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public remove(element: UserExpenses | UserIncome) {
    if(element.hasOwnProperty('income')) {
      this.incomesService.removeSingleIncome(element.date).pipe(
        tap(() => this.userHistory$ = this.historySerice.getHistory())
      ).subscribe()
      return
    }
    this.expensesService.removeSingleExpense(element.date).pipe(
      tap(() => this.userHistory$ = this.historySerice.getHistory())
    ).subscribe();
  }

  public getName(filter: string) {
    // return translateName(filter);
  }

  private getPaginatorName() {
    // this.paginator._intl.itemsPerPageLabel = this.getName("Items per page");
    // this.paginator._intl.firstPageLabel = this.getName("First Page");
    // this.paginator._intl.previousPageLabel = this.getName("Previous page");
    // this.paginator._intl.nextPageLabel = this.getName("Next page");
    // this.paginator._intl.lastPageLabel = this.getName("Last page");
  }

}
