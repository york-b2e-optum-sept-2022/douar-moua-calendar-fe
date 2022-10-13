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

  createEvent(newEvent: IEvents){
    return this.httpClient.post('http://localhost:3000/events', newEvent
      ) as Observable<IEvents>;
  }

  deleteEvent(selectedEventId: string){
    console.log('http://localhost:3000/events',selectedEventId)
    return this.httpClient.delete('http://localhost:3000/events' + `/${selectedEventId}`
    ) as Observable<IEvents>
  }

  updateEvent(updateEvent: IEvents){
    console.log(updateEvent)
    return this.httpClient.put('http://localhost:3000/events?id=' + updateEvent.id, updateEvent
    ) as Observable<IEvents>
  }

}
