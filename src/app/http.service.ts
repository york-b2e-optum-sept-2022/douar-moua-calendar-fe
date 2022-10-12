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

  getAccount(){
    return this.httpClient.get('http://localhost:3000/accounts'
    ) as Observable<IAccounts>
  }

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

  createEvent(newEvent: IEvents){
    return this.httpClient.post('http://localhost:3000/events', newEvent
      ) as Observable<IEvents>;
  }

  deleteEvent(){
    return this.httpClient.delete('http://localhost:3000/events?id=')
  }

  // getCurrentUserEventList(currentUserId: string){
  //   return this.httpClient.get('http://localhost:3000/events?eventCreatorId=' + currentUserId,
  //   ) as Observable<IEvents[]>
  // }

}
