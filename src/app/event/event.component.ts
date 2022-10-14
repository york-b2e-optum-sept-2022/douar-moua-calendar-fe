import {Component, Input,} from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";
import {EventService} from "../event.service";
import {AccountService} from "../account.service";
import {IAccounts} from "../_interfaces/IAccounts";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  @Input() event!: IEvents;

  isUpdating: boolean = false

  accountList: IAccounts[] | null = null
  users!: IAccounts["username"][];

  constructor(private eventService: EventService, private accountService: AccountService) {
    //get account list?
    this.accountService.$accountList.subscribe({
      next: accountList => {
        this.accountList = accountList
        this.users = accountList.map(IAccount => IAccount.username)
        console.log(accountList)
        console.log(this.users)
      },
      error: err => {
        console.error(err)
        alert('Unable to retrieve list of users. Please try again later.')
      }
    })
  }

  onDeleteClick(eventId: string){
    this.eventService.onDeleteEvent(eventId)
    this.eventService.getEventList()
  }

  onEditEventClick(){
    this.isUpdating = true
  }

  onCancelEditEventClick(){
    this.isUpdating = false
  }

  onSaveEditEventClick(updateEvent: IEvents){
    this.eventService.onSaveUpdateEvent(updateEvent)
    this.isUpdating = false
    this.eventService.getEventList()
  }

}
