import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IAccounts} from "./_interfaces/IAccounts";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  isLoggedIn: boolean = true;
  $isLoggedIn = new Subject<boolean>();

  constructor(private httpService: HttpService) { }

  onLogin(loginInput: IAccounts){
    if (loginInput.username == ''){
      alert('Invalid username')
      return;
    }

    if (loginInput.password == ''){
      alert('Invalid password')
      return;
    }

    this.httpService.foundAccountByUsername(loginInput.username)
    this.$isLoggedIn.next(this.isLoggedIn)
  }

}
