import {Component, OnDestroy,} from '@angular/core';
import {AccountService} from "../account.service";
import {IAccounts} from "../_interfaces/IAccounts";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnDestroy{

  accountList: IAccounts[] = [];
  accountListSub: Subscription;
  users: any;

  constructor(private accountService:AccountService) {

    //get account list from account service
    this.accountListSub = this.accountService.$accountList.subscribe({
      next: (accountList) => {
        this.accountList = accountList
        let users = accountList.map(obj => obj.username)
        console.log('users: ', typeof users)

        this.users = users
      },
      error: (err) => {
        console.error(err)
        alert('Unable to get list of users. Please try again later.')
      }
    })

  }

  ngOnDestroy() {
    this.accountListSub.unsubscribe()
  }

}
