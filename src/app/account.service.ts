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

  $foundAccount = new Subject<IAccounts>();

  constructor(private httpService: HttpService) { }

  onLogin(loginInput: IAccounts){
    //if login username input is blank alert user
    if (loginInput.username == ''){
      alert('Username can not be blank')
      return;
    }

    //if login password input is blank alert user
    if (loginInput.password == ''){
      alert('Password can not be blank')
      return;
    }

    this.httpService.foundAccountByUsername(loginInput).subscribe({
      next: (accountList) => {

        //validate password
        const foundAccount = accountList.find(account => account.password === loginInput.password)
        //if password is incorrect alert invalid login
        if (!foundAccount){
          alert('Invalid login')
          return;
        }
        //if password is correct, login & pass found account info to
        this.$isLoggedIn.next(this.isLoggedIn)
        this.$foundAccount.next(foundAccount)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to login. Please try again later.')
      }
    })
  }

}
