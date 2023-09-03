import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { UserIncome } from '../model/iuserIncomes';
import { environment } from 'src/environments/environment';
import { GoogleApiService } from './google-api.service';
import { Categories } from '../model/ICategories';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  public userId: string;
  public monthlyIncomes: any;
  constructor(private http: HttpClient, private googleApi: GoogleApiService) {
    this.userId = this.googleApi.userEmailAfterInit;
  }

  public getUserIncomes(): Observable<UserIncome[]> {
    return this.http.get<UserIncome[]>(`${environment.apiUrl}/${this.userId}/incomes`);
  }

  public getUserIncomesSummary(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/${this.userId}/allIncomes`);
  }

  public getUserIncomesByCategory(): Observable<Categories> {
    return this.http.get<Categories>(`${environment.apiUrl}/${this.userId}/category/incomes`);
  }

  public getUserMonthlyIncomesByCategory(date: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.userId}/${date}/monthly/category/incomes`);
  }

  public getUserIncomesByDate(date: string): Observable<UserIncome> {
    return this.http.get<UserIncome>(`${environment.apiUrl}/${this.userId}/monthly/${date}/incomes"`);
  }

    public setIncome(userIncome: UserIncome) {
    return this.http.post<UserIncome>(
      `${environment.apiUrl}/income`,
      userIncome
    );
  }

    public removeSingleIncome(date: string) {
    return this.http.delete<any>(`${environment.apiUrl}/${this.userId}/${date}/income`)
  }
}