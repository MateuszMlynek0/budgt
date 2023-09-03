import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { GoogleApiService } from './google-api.service';
import { UserExpenses } from '../model/iUserExpenses';
import { Categories } from '../model/ICategories';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  public userId: string;
  public monthlyIncomes: any;
  constructor(private http: HttpClient, private googleApi: GoogleApiService) {
    this.userId = this.googleApi.userEmailAfterInit;
  }

  public getUserExpenses(): Observable<UserExpenses[]> {
    return this.http.get<UserExpenses[]>(`${environment.apiUrl}/${this.userId}/expenses`);
  }

  public getUserExpensesSummary(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/${this.userId}/allExpenses`);
  }

  public getUserExpensesByCategory(): Observable<Categories> {
    return this.http.get<Categories>(`${environment.apiUrl}/${this.userId}/category/expenses`);
  }

  public getUserMonthlyExpensesByCategory(date: string): Observable<Categories> {
    return this.http.get<Categories>(`${environment.apiUrl}/${this.userId}/${date}/monthly/category/expenses`);
  }

  public getUserExpensesByDate(date: string): Observable<UserExpenses> {
    return this.http.get<UserExpenses>(`${environment.apiUrl}/${this.userId}/monthly/${date}/expenses`);
  }
  public getUserExpensesSummaryByDate(date: string): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/${this.userId}/summary/monthly/${date}/expenses`);
  }

  public setExpense(userExpenses: UserExpenses) {
    return this.http.post<UserExpenses>(
      `${environment.apiUrl}/expense`,
      userExpenses
    )
  }

  public removeSingleExpense(date: string) {
    return this.http.delete<any>(`${environment.apiUrl}/${this.userId}/${date}/expense`)
  }
}