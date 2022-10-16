import {Component, OnDestroy,} from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";
import {EventService} from "../event.service";
import {Subscription} from "rxjs";
import {InviteService} from "../invite.service";
import {IInvitations} from "../_interfaces/IInvitations";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnDestroy {

  eventsList: IEvents[] = []
  eventListSub: Subscription;

  eventInviteList: IInvitations[] = []


  constructor(private eventService: EventService, private inviteService: InviteService) {

    // get event list from event service
    this.eventListSub = this.eventService.$eventList.subscribe({
      next: (eventList) => {
        this.eventsList = eventList
        console.log(this.eventsList)
      },
      error: (err) => {
        console.error(err)
          alert('Unable to get list of events. Please try again later.')
      }
    });

    this.inviteService.$inviteList.subscribe({
      next: (inviteList) => {
        this.eventInviteList = inviteList
        console.log(this.eventInviteList)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to load list of invited users for event. Please try again later.')
      }
    })

  }

  ngOnDestroy() {
    this.eventListSub.unsubscribe()
  }

}
