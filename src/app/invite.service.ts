import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IInvitations} from "./_interfaces/IInvitations";
import {first, Subject} from "rxjs";
import {EventService} from "./event.service";
import {IEvents} from "./_interfaces/IEvents";
import * as events from "events";

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  inviteList: IInvitations[] = []
  $inviteList = new Subject<IInvitations[]>()

  currentUserEventList: IEvents[] = []

  constructor(private httpService: HttpService, private eventService: EventService) {

    //get current user event list
    this.eventService.$eventList.subscribe({
      next: (eventList) => {
        this.currentUserEventList = eventList
        console.log(this.currentUserEventList)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to retrieve current users event list. Please try again later')
      }
    })
  }

  getInviteList(){
    this.httpService.getInviteList().pipe(first()).subscribe({
      next: (inviteList) => {
        this.inviteList = inviteList.filter((invite) => {
          return this.currentUserEventList.filter((event) => {return event.id = invite.eventID})
        })
        this.$inviteList.next(this.inviteList)
        console.log(this.inviteList)
      },
      error: err => {
        console.error(err)
        alert('Unable to load list of invites. Please try again later.')
      }
    })
  }
}
