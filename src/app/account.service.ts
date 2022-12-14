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

  foundAccount!: IAccounts;
  $foundAccount = new Subject<IAccounts>();

  $newAccount = new Subject<IAccounts>();

  accountList: IAccounts[] = [];
  $accountList = new Subject<IAccounts[]>();

  constructor(private httpService: HttpService) {
  }

  //facilitate new event validation, create new event, send new event to http service, and emit new event data
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
        if (accountList.length > 0) {
          alert("Username already exists")
        }

        //all validation has passed, give new account an userID
        const account: IAccounts = {
          id: uuid(),
          username: newAccount.username,
          password: newAccount.password
        }

        //add new account to database & create observable for subscription purposes
        this.httpService.registerAccount(account).pipe(first()).subscribe({
          next: (account) => {
            this.$newAccount.next(account)
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

  //facilitate login validation, login, and emit login user data
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

    //password validation & login facilitation
    this.httpService.foundAccount(loginInput).pipe(first()).subscribe({
      next: (accountList) => {
        //validate password
        const foundAccount = accountList.find(account => account.password === loginInput.password)
        //if password is incorrect alert invalid login
        if (!foundAccount){
          alert('Invalid login')
          return;
        }
        //if password is correct, toggle log in, broadcast/emit current user info, call getAccountList()
        this.$isLoggedIn.next(this.isLoggedIn)
        this.foundAccount = foundAccount
        this.$foundAccount.next(this.foundAccount)
        this.getAccountList()
      },
      error: (err) => {
        console.error(err)
        alert('Unable to login. Please try again later.')
      }
    })
  }

  //get account list from http service
  getAccountList(){
    console.log('get account initiated after account is found')
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

  //log out
  onLogOut(){
    this.$isLoggedIn.next(!this.isLoggedIn)
  }



}
