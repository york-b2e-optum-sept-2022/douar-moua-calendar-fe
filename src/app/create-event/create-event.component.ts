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
    eventTag: '',
    eventName: '',
    eventDate: null,
  }

  constructor(private eventService:EventService) { }

  onCreateEventClick(){
    this.eventService.createEvent(this.newEvent)
  }

  onCancelCreateEventClick(){
    this.eventService.cancelCreateEventClick()
  }

}
