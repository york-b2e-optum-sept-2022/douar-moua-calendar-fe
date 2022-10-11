import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IEvents} from "./_interfaces/IEvents";
import {first, Subject} from "rxjs";
import {AccountService} from "./account.service";
import {IAccounts} from "./_interfaces/IAccounts";
// @ts-ignore
import {v4 as uuid} from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventList: IEvents[] = []
  $eventList = new Subject<IEvents[]>();

  currentUser!: IAccounts;

  constructor(private httpService:HttpService, private accountService:AccountService) {

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
    });

    //get current user data
    this.accountService.$foundAccount.pipe(first()).subscribe({
      next: currentUser => {
        this.currentUser = currentUser
      },
      error: (err) => {
        console.error(err)
        alert('Unable to retrieve current user information. Please try again later.')
      }
    });
  }

  createEvent(newEvent: IEvents){
    const event: IEvents = {
      id: this.currentUser.id,
      eventID: uuid(),
      eventName: newEvent.eventName,
      eventDate: newEvent.eventDate,
    }

    this.httpService.createEvent(event).pipe().subscribe({
      next: () => {},
      error: () => {}
    })
  }

}
