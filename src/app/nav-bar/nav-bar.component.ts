import {Component,} from '@angular/core';
import {AccountService} from "../account.service";
import {IAccounts} from "../_interfaces/IAccounts";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  userAccount: IAccounts = {
    id: '',
    username: '',
    password: ''
  }

  userAccountSub: Subscription;

  constructor(private accountService: AccountService) {
    this.userAccountSub = this.accountService.$foundAccount.subscribe({
      next: (account) => {
        this.userAccount = account
      },
      error: (err) => {
        console.log(err)
        alert('Unable to find your account. Please try again later.')
      }
    })
  }

  onLogOutClick(){
    this.accountService.onLogOut();
  }

  ngOnDestroy(){
    this.userAccountSub.unsubscribe()
  }

}
