import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccounts} from "./_interfaces/IAccounts";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  foundAccountByUsername(loginUserName: string){
    return this.httpClient.get('http://localhost:3000/accounts?username=' + loginUserName)
  }

}
