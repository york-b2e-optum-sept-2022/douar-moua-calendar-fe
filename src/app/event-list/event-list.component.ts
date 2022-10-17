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

  startDate: Date = new Date()
  endDate: Date = new Date()
  isFilterEvent: boolean = false
  filteredEventList: IEvents[] = []

  eventInviteList: IInvitations[] = []


  constructor(private eventService: EventService, private inviteService: InviteService) {

    //get users entire event list from event service onto local variable
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

    //invite feature attempt - fail - circle back
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

  filterEventList() {
    if (this.startDate > this.endDate) {
      alert('Start date must be before end date! Please select valid date ranges')
      return
    } else {
      this.filteredEventList = this.eventsList.filter((event) => {
        return event.eventDate >= this.startDate && event.eventDate <= this.endDate
      })
      this.isFilterEvent = true
    }
  }

  resetEventsList(){
    this.eventService.getEventList()
    this.isFilterEvent = false
  }

  ngOnDestroy() {
    this.eventListSub.unsubscribe()
  }

}
