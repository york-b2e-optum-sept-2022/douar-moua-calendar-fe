import {Component, } from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";
import {EventService} from "../event.service";
import {IAccounts} from "../_interfaces/IAccounts";
import {AccountService} from "../account.service";

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

  constructor(private eventService:EventService, private accountService:AccountService) {
    this.accountService.$accountList.subscribe({
      next: (accountList) => {
        this.accountList = accountList
      },
      error: (err) => {
        console.log(err)
        alert('Unable to get account list. Please try again later.')
      }
    })
  }

  //tell event service to add new event with given new event input
  onCreateEventClick(){
    this.eventService.onCreateEvent(this.newEvent)
  }

}
