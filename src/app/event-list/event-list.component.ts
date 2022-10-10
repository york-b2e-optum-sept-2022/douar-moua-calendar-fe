import {Component, OnDestroy,} from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";
import {EventService} from "../event.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnDestroy {

  eventsList: IEvents[] = []

  eventListSub: Subscription;

  constructor(private eventService: EventService) {
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

  ngOnDestroy() {
    this.eventListSub.unsubscribe()
  }

}
