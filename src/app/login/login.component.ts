import { Component, OnInit } from '@angular/core';
import {IAccounts} from "../_interfaces/IAccounts";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  foundAccount: IAccounts = {
    userID: "",
    username: "",
    password: ""
  }

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onLoginClick(){
    this.accountService.onLogin(this.foundAccount)
  }

}
