import {Component, } from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";
import {EventService} from "../event.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {

  newEvent: IEvents = {
    id: '',
    eventCreatorId: '',
    eventName: '',
    eventDate: null,
  }

  constructor(private eventService:EventService) { }

  //tell event service to add new event with given new event input
  onCreateEventClick(){
    this.eventService.onCreateEvent(this.newEvent)
    this.eventService.getEventList()
  }

  onCancelCreateEventClick(){
    this.eventService.cancelCreateEventClick()
    this.eventService.getEventList()
  }

}
