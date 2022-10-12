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

  isCreatingEvent: boolean = true;
  $isCreatingEvent = new Subject<boolean>()

  eventList: IEvents[] = []
  $eventList = new Subject<IEvents[]>();

  currentUser!: IAccounts;
  $currentUser = new Subject<IAccounts>();
  currentUserId: string = '';

  $event = new Subject<IEvents>();

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
        this.currentUserId = currentUser.id
        this.$currentUser.next(currentUser)
        console.log(currentUser)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to retrieve current user information. Please try again later.')
      }
    });

  }

  //toggle create
  createEventClick(){
    this.$isCreatingEvent.next(this.isCreatingEvent)
  }
  cancelCreateEventClick(){
    this.$isCreatingEvent.next(!this.isCreatingEvent)
  }

  //create new event
  createEvent(newEvent: IEvents){
    //if new event doesn't have a date alert & return
    if (newEvent.eventDate == null){
      alert('Must include a date')
      return;
    }

    //assign event a new id, eventCreatorId to user's id, transfer over event name & date
    const event: IEvents = {
      id: this.currentUserId,
      eventCreatorId: uuid(),
      eventName: newEvent.eventName,
      eventDate: newEvent.eventDate,
    }

    //add new event to database, broadcast/emit, and toggle off create
    this.httpService.createEvent(event).pipe().subscribe({
      next: (addedEvent) => {
        this.$event.next(addedEvent)
        this.$isCreatingEvent.next(!this.isCreatingEvent)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to create a new event. Please try again later.')
      }
    })
  }

  deleteEvent(){

  }

}
