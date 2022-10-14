import {Component,} from '@angular/core';
import {AccountService} from "../account.service";
import {Subscription} from "rxjs";
import {IAccounts} from "../_interfaces/IAccounts";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  currentUser: IAccounts = {
    id: '',
    username: '',
    password: ''
  }

  userAccountSub: Subscription;

  constructor(private accountService: AccountService) {
    this.userAccountSub = this.accountService.$foundAccount.subscribe({
      next: (foundAccount) => {
        this.currentUser = foundAccount
      },
      error: err => {
        console.error(err)
        alert('Unable to find username. Please try again later.')
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
