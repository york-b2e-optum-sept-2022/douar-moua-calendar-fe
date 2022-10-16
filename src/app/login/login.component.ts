import { Component,  } from '@angular/core';
import {IAccounts} from "../_interfaces/IAccounts";
import {AccountService} from "../account.service";
import {EventService} from "../event.service";
import {InviteService} from "../invite.service";

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

  constructor(private accountService: AccountService, private eventService: EventService, private inviteService: InviteService) { }

  onLoginClick(){
    this.accountService.onLogin(this.loginAccount)
    this.eventService.getEventList()
    this.accountService.getAccountList()
    this.inviteService.getInviteList()
    console.log(this.inviteService.inviteList)
  }

}
