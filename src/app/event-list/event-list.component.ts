import {Component, Input, OnDestroy,} from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";
import {EventService} from "../event.service";
import {Subscription} from "rxjs";
import {IAccounts} from "../_interfaces/IAccounts";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnDestroy {

  eventsList: IEvents[] = []
  eventListSub: Subscription;

  constructor(private eventService: EventService) {

    //get event list from event service
    this.eventListSub = this.eventService.$eventList.subscribe({
      next: (eventList) => {
        this.eventsList = eventList
      },
      error: (err) => {
        console.error(err)
          alert('Unable to get list of events. Please try again later.')
      }
    })

  }

  //beginning of toggle on create event
  onCreateEventClick(){
    this.eventService.createEventClick()
  }

  ngOnDestroy() {
    this.eventListSub.unsubscribe()
  }

}
