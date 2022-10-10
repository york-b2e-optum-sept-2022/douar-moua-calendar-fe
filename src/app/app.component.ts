import { Component, OnDestroy } from '@angular/core';
import {AccountService} from "./account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'douar-moua-calendar-fe';

  isLoggedIn: boolean = false;
  loginSub: Subscription;

  constructor(private accountService: AccountService) {

    this.loginSub = this.accountService.$isLoggedIn.subscribe((isLogin: boolean) => {
      this.isLoggedIn = isLogin
    })

  }

  ngOnDestroy(){
    this.loginSub.unsubscribe()
  }

}
