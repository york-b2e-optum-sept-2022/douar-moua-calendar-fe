import { Component,  } from '@angular/core';
import {AccountService} from "../account.service";
import {IAccounts} from "../_interfaces/IAccounts";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  newAccount: IAccounts = {
    userID: "",
    username: "",
    password: ""
  }

  constructor(private accountService: AccountService) { }

  onCreateAccountClick(){
    this.accountService.onCreateAccount(this.newAccount)
  }

}
