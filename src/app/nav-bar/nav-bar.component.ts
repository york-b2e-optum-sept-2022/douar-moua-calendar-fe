import {Component,} from '@angular/core';
import {AccountService} from "../account.service";
import {IAccounts} from "../_interfaces/IAccounts";
import {first, Subscription} from "rxjs";
import {EventService} from "../event.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  currentUserName: string = ''

  userAccountSub: Subscription;

  constructor(private accountService: AccountService) {
    this.userAccountSub = this.accountService.$currentUserName.subscribe({
      next: (currentUserName) => {
        this.currentUserName = currentUserName
        console.log(currentUserName)
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
