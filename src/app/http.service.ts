import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccounts} from "./_interfaces/IAccounts";
import {Observable} from "rxjs";
import {IEvents} from "./_interfaces/IEvents";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  foundAccount(loginInput: IAccounts){
    return this.httpClient.get('http://localhost:3000/accounts?username=' + loginInput.username
    ) as Observable<IAccounts[]>
  }

  registerAccount(newAccount: IAccounts){
    return this.httpClient.post('http://localhost:3000/accounts', newAccount
    ) as Observable<IAccounts>;
  }

  getAccountList(){
    return this.httpClient.get('http://localhost:3000/accounts'
    ) as Observable<IAccounts[]>
  }

  getEventList(){
    return this.httpClient.get('http://localhost:3000/events'
    ) as Observable<IEvents[]>
  }

}
