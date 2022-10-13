import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IAccounts} from "./_interfaces/IAccounts";
import {first, Subject} from "rxjs";
// @ts-ignore
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  isLoggedIn: boolean = true;
  $isLoggedIn = new Subject<boolean>();

  $foundAccount = new Subject<IAccounts>();
  $account = new Subject<IAccounts>();
  $currentUserName = new Subject<string>()

  accountList: IAccounts[] = [];
  $accountList = new Subject<IAccounts[]>();

  constructor(private httpService: HttpService) {

    //get account list from http service
    this.httpService.getAccountList().pipe(first()).subscribe({
      next: (accountList) => {
        this.accountList = accountList
        this.$accountList.next(accountList)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to get list of users. Please try again later.')
      }
    })

  }

  onLogOut(){
    this.$isLoggedIn.next(!this.isLoggedIn)
  }

  onLogin(loginInput: IAccounts){
    console.log(loginInput)
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

    //password validation & login facilitation
    this.httpService.foundAccount(loginInput).pipe(first()).subscribe({
      next: (accountList) => {
        console.log(accountList)
        //validate password
        const foundAccount = accountList.find(account => account.password === loginInput.password)
        //if password is incorrect alert invalid login
        if (!foundAccount){
          alert('Invalid login')
          return;
        }
        //if password is correct, toggle log in, broadcast/emit current user info
        this.$isLoggedIn.next(this.isLoggedIn)
        this.$foundAccount.next(foundAccount)
        this.$currentUserName.next(foundAccount.username)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to login. Please try again later.')
      }
    })
  }

  onCreateAccount(newAccount: IAccounts){
    //validate new username requirements
    if (newAccount.username === '' || newAccount.username.length < 5){
      alert("Username must have more than 4 characters")
      return;
    }
    //validate new password requirements
    if (newAccount.password === '' || newAccount.password.length < 5){
      alert("Password must have more than 4 characters")
      return;
    }

    this.httpService.foundAccount(newAccount).pipe(first()).subscribe({
      next: (accountList) => {
        // console.log('accountList: ', accountList)
        if (accountList.length > 0) {
          alert("Username already exists")
        }

        //all validation has passed, give new account an userID
        const account: IAccounts = {
          id: uuid(),
          username: newAccount.username,
          password: newAccount.password
        }
        console.log('account: ', typeof account, account)

        //add new account to database & create observable for subscription purposes
        this.httpService.registerAccount(account).pipe(first()).subscribe({
          next: (account) => {
            this.$account.next(account)
            alert("You've successfully created an account! Login to begin!")
          },
          error: (err) => {
            console.error(err)
            alert('Unable to create your account. Please try again later')
          }
        });
      },
      error: (err) => {
        console.error(err)
        alert('Unable to create account. Please try again later')
      }
    })
  }



}
