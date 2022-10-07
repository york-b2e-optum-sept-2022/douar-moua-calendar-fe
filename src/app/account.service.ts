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
    //if login username input is blank alert user
    if (loginInput.username == ''){
      alert('Invalid username')
      return;
    }

    //if login password input is blank alert user
    if (loginInput.password == ''){
      alert('Invalid password')
      return;
    }

    //validate password
    this.httpService.foundAccountByUsername(loginInput)
    this.$isLoggedIn.next(this.isLoggedIn)
  }

}
