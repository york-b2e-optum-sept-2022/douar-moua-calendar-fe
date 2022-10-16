import {Component, Input,} from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";
import {EventService} from "../event.service";
import {AccountService} from "../account.service";
import {IAccounts} from "../_interfaces/IAccounts";
import {InviteService} from "../invite.service";
import {IInvitations} from "../_interfaces/IInvitations";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  //get events as individual events
  @Input() event!: IEvents;

  isUpdating: boolean = false

  // accountList: IAccounts[] | null = null
  // users!: IAccounts["username"][];

  currentUser: IAccounts = {
    id: '',
    username: '',
    password: ''
  }

  inviteList: IInvitations[] = []
  eventInviteList: IInvitations[] = []

  constructor(private eventService: EventService, private accountService: AccountService, private inviteService: InviteService) {
    //get account list TODO UNSUB
    // this.accountService.$accountList.subscribe({
    //   next: accountList => {
    //     this.accountList = accountList
    //     // this.users = accountList.map(IAccount => IAccount.username)
    //   },
    //   error: err => {
    //     console.error(err)
    //     alert('Unable to retrieve list of users. Please try again later.')
    //   }
    // })

    //get current user data TODO UNSUB
    this.accountService.$foundAccount.subscribe({
      next: (currentUser) => {
        this.currentUser = currentUser
      },
      error: err => {
        console.error(err)
        alert('Unable to find current user information. Please try again later.')
      }
    })

    //get current user events invite list TODO UNSUB
    this.inviteService.$inviteList.subscribe({
      next: (inviteList) => {
        this.inviteList = inviteList
        this.eventInviteList = inviteList.filter((event) => {
          return this.event.id == event.id
        })
        console.log(this.eventInviteList)
        console.log(this.inviteList)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to load list of invited users for event. Please try again later.')
      }
    })

  }

  onDeleteClick(eventId: string){
    this.eventService.onDeleteEvent(eventId)
  }

  onEditEventClick(){
    this.isUpdating = true
  }

  onCancelEditEventClick(){
    this.isUpdating = false
  }

  onSaveEditEventClick(updateEvent: IEvents){
    this.eventService.onSaveUpdateEvent(updateEvent);
    this.isUpdating = false
  }

}
