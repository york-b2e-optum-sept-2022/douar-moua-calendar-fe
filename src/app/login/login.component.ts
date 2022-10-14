import { Component,  } from '@angular/core';
import {IAccounts} from "../_interfaces/IAccounts";
import {AccountService} from "../account.service";
import {EventService} from "../event.service";

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

  constructor(private accountService: AccountService, private eventService: EventService) { }

  onLoginClick(){
    this.accountService.onLogin(this.loginAccount)
    this.eventService.getEventList()
    this.accountService.getAccountList()
  }

}
