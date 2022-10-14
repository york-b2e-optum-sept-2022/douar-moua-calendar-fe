import {Injectable, OnDestroy} from '@angular/core';
import {HttpService} from "./http.service";
import {IEvents} from "./_interfaces/IEvents";
import {first, Subject, Subscription} from "rxjs";
import {AccountService} from "./account.service";
import {IAccounts} from "./_interfaces/IAccounts";
// @ts-ignore
import {v4 as uuid} from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class EventService implements OnDestroy {

  $newEvent = new Subject<IEvents>();

  eventList: IEvents[] = []
  $eventList = new Subject<IEvents[]>();

  eventDeleted!: IEvents;
  $eventDeleted = new Subject<IEvents>();

  eventUpdated!: IEvents;
  $eventUpdated = new Subject<IEvents>();

  currentUser!: IAccounts;
  $currentUser = new Subject<IAccounts>();
  currentUserId: string = '';
  foundAccountSub: Subscription;

  constructor(private httpService:HttpService, private accountService:AccountService) {

    //get current user data
    this.foundAccountSub = this.accountService.$foundAccount.subscribe({
      next: currentUser => {
        this.currentUser = currentUser
        this.currentUserId = currentUser.id
        this.$currentUser.next(currentUser)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to retrieve current user information. Please try again later.')
      }
    });

  }

  //get event list
  getEventList(){
    this.httpService.getEventList().pipe(first()).subscribe({
      next: eventsList => {
        this.eventList = eventsList.filter((event) => {
          return this.currentUserId == event.eventCreatorId
        })
        this.$eventList.next(this.eventList)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to get list of events. Please try again later.')
      }
    });
  }

  //create a new event
  onCreateEvent(newEvent: IEvents){
    //if new event doesn't have a date alert & return
    if (newEvent.eventDate == null){
      alert('Must include a date')
      return;
    }

    //assign event a new id, eventCreatorId to user's id, transfer over event name & date
    const event: IEvents = {
      id: uuid(),
      eventCreatorId: this.currentUserId,
      eventName: newEvent.eventName,
      eventDate: newEvent.eventDate,
    }

    //add new event to database, broadcast/emit, and toggle off create
    this.httpService.createEvent(event).pipe().subscribe({
      next: (addedEvent) => {
        this.$newEvent.next(addedEvent)
        this.getEventList()
      },
      error: (err) => {
        console.error(err)
        alert('Unable to create a new event. Please try again later.')
      }
    })
  }

  //delete an event
  onDeleteEvent(selectedEventId: string){
    this.httpService.deleteEvent(selectedEventId).pipe(first()).subscribe({
      next: (eventDeleted) => {
        this.eventDeleted = eventDeleted
        this.$eventDeleted.next(this.eventDeleted)
        this.getEventList()
      },
      error: (err) => {
        console.error(err)
        alert('Unable to delete your event. Please try again later.')
      }
    })
  }

  //update an event
  onSaveUpdateEvent(updateEvent: IEvents){
    const eventId: string = updateEvent.id
    this.httpService.updateEvent(eventId, updateEvent).pipe(first()).subscribe({
      next: (updatedEvent) => {
        this.eventUpdated = updatedEvent
        this.$eventUpdated.next(this.eventUpdated)
      },
      error: (err) => {
        console.error(err)
        alert('Unable to make updates. Please try again later.')
      }
    })
  }

  ngOnDestroy() {
    this.foundAccountSub.unsubscribe()
  }


}
