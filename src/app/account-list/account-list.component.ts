import {Component, Input, OnDestroy,} from '@angular/core';
import {AccountService} from "../account.service";
import {IAccounts} from "../_interfaces/IAccounts";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnDestroy{

  @Input() accountList!: IAccounts;

  // accountLists: IAccounts[] = [];
  // accountListSub: Subscription;
  // users!: IAccounts["username"][];

  constructor(private accountService:AccountService) {

    // get account list from account service, new array of just usernames
    // this.accountListSub = this.accountService.$accountList.subscribe({
    //   next: (accountList) => {
    //     this.accountLists = accountList
    //     this.users = accountList.map(IAccount => IAccount.username)
    //     console.log(this.users)
    //   },
    //   error: (err) => {
    //     console.error(err)
    //     alert('Unable to get list of users. Please try again later.')
    //   }
    // })

  }

  ngOnDestroy() {
    // this.accountListSub.unsubscribe()
  }

}
