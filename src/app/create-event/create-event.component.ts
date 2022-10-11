import {Component, } from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";
import {EventService} from "../event.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {

  newEvent!: IEvents;

  constructor(private eventService:EventService) { }

  onCreateEventClick(){
    this.newEvent.eventDate = new Date(this.newEvent.eventDate)
    this.eventService.createEvent(this.newEvent)
  }

}
