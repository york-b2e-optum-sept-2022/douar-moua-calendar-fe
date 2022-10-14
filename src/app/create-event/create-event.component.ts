import {Component, } from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";
import {EventService} from "../event.service";
import {AccountService} from "../account.service";
import {IAccounts} from "../_interfaces/IAccounts";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {

  newEvent: IEvents = {
    id: '',
    eventCreatorId: '',
    eventName: '',
    eventDate: null,
  }
  accountList: IAccounts[] = []
  userNameList!: IAccounts["username"][];
  // accountListSub: Subscription;

  constructor(private eventService:EventService, private accountService: AccountService) {
    this.accountService.$accountList.subscribe({
      next: accountList => {
        this.accountList = accountList
        this.userNameList = accountList.map(IAccount => IAccount.username)
        console.log(accountList)
        console.log(this.userNameList)
      },
      error: err => {
        console.error(err)
        alert('Unable to load list of users. Please try again later.')
      }
    })
  }

  //tell event service to add new event with given new event input
  onCreateEventClick(){
    this.eventService.onCreateEvent(this.newEvent)
  }

}
