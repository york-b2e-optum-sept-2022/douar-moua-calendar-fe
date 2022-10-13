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

  onDeleteClick(){
    const selectedEvent = this.event.id
    console.log(selectedEvent)

    this.eventService.deleteEvent(selectedEvent)
    console.log('delete clicked')
  }

}
