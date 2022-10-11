import { Component, OnDestroy } from '@angular/core';
import {AccountService} from "./account.service";
import {Subscription} from "rxjs";
import {EventService} from "./event.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'douar-moua-calendar-fe';

  isLoggedIn: boolean = true;
  loginSub: Subscription;

  isCreatingEvent: boolean = false
  createEventSub: Subscription;

  constructor(private accountService: AccountService, private eventService:EventService) {

    this.loginSub = this.accountService.$isLoggedIn.subscribe((isLogin: boolean) => {
      this.isLoggedIn = isLogin
    })

    this.createEventSub = this.eventService.$isCreatingEvent.subscribe( (isCreatingEvent: boolean) => {
      this.isCreatingEvent = isCreatingEvent
    })
  }

  ngOnDestroy(){
    this.loginSub.unsubscribe()
    this.createEventSub.unsubscribe()
  }

}
