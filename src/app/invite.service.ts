import {Injectable, OnDestroy} from '@angular/core';
import {HttpService} from "./http.service";
import {IInvitations} from "./_interfaces/IInvitations";
import {first, Subject, Subscription} from "rxjs";
import {EventService} from "./event.service";
import {IEvents} from "./_interfaces/IEvents";
// import * as events from "events";
import {IAccounts} from "./_interfaces/IAccounts";

@Injectable({
  providedIn: 'root'
})
export class InviteService implements OnDestroy {

  inviteList: IInvitations[] = []
  $inviteList = new Subject<IInvitations[]>()

  currentUserEventList: IEvents[] = []
  currentUserEventListSub: Subscription;

  constructor(private httpService: HttpService, private eventService: EventService) {

    //get current user event list
    this.currentUserEventListSub = this.eventService.$eventList.subscribe({
      next: (eventList) => {
        this.currentUserEventList = eventList
        console.log(typeof this.currentUserEventList, this.currentUserEventList)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to retrieve current users event list. Please try again later')
      }
    })
  }

  //get invites specific to event
  getInviteList(){
    this.httpService.getInviteList().pipe(first()).subscribe({
      next: (inviteList) => {

        console.log(inviteList)

        // const eventIDInviteList: IInvitations[] =
        // inviteList.filter((invite) =>
        // { return invite.eventID =
        // this.currentUserEventList.filter((event) =>
        // event.id)})
        // console.log(eventIDInviteList)

        this.inviteList = inviteList.filter((invite) => {
          return this.currentUserEventList.filter((event) => {return event.id = invite.eventID})
        })
        this.$inviteList.next(this.inviteList)
        console.log(typeof this.inviteList, this.inviteList)
      },
      error: err => {
        console.error(err)
        alert('Unable to load list of invites. Please try again later.')
      }
    })
  }

  createInvite(invitedUser: IAccounts){
    this.httpService.createInvite(invitedUser)
  }

  ngOnDestroy(){
    this.currentUserEventListSub.unsubscribe()
  }
}
