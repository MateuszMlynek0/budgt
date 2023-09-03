import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GoogleApiService } from './google-api.service';
import { UserBudget } from '../model/iUserBudget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  public userId: string;
  public monthlyIncomes: any;
  constructor(private http: HttpClient, private googleApi: GoogleApiService) {
    this.userId = this.googleApi.userEmailAfterInit;
  }

  public getBudget(date: string) {
    return this.http.get<UserBudget>(`${environment.apiUrl}/${this.userId}/${date}/budget`)
  }

  public setBudget(userBudget: UserBudget) {
    return this.http.post<UserBudget>(`${environment.apiUrl}/budget`,
      userBudget
    )
  }

  public removeBudget(date: string) {
    return this.http.delete<any>(`${environment.apiUrl}/${this.userId}/${date}/budget`)
  }

}
