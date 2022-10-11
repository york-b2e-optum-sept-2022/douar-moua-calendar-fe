import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IEvents} from "./_interfaces/IEvents";
import {first, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventList: IEvents[] = []
  $eventList = new Subject<IEvents[]>();

  constructor(private httpService: HttpService) {

    //get event list from httpService
    this.httpService.getEventList().pipe(first()).subscribe({
      next: eventsList => {
        this.eventList = eventsList
        this.$eventList.next(eventsList)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to get list of events. Please try again later.')
      }
    })

  }
}
