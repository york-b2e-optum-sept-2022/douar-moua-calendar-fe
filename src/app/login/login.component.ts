import { Component,  } from '@angular/core';
import {IAccounts} from "../_interfaces/IAccounts";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginAccount: IAccounts = {
    id: "",
    username: "",
    password: ""
  }

  constructor(private accountService: AccountService) { }

  onLoginClick(){
    this.accountService.onLogin(this.loginAccount)
  }

}
