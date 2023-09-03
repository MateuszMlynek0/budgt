import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GoogleApiService } from './google-api.service';
import { UserIncome } from '../model/iuserIncomes';
import { UserExpenses } from '../model/iUserExpenses';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public userId: string;
  constructor(private http: HttpClient, private googleApi: GoogleApiService) {
    this.userId = this.googleApi.userEmailAfterInit;
  }

  public getHistory() {
    return this.http.get<UserExpenses | UserIncome>(`${environment.apiUrl}/${this.userId}/history`)
  }

}
