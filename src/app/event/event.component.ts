import {Component, Input,} from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";
import {EventService} from "../event.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  @Input() event!: IEvents;

  constructor(private eventService: EventService) { }

  onDeleteClick(eventId: string){
    this.eventService.deleteEvent(eventId)
    console.log('delete clicked ', eventId)
  }

}
