import {Component, Input,} from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";
import {EventService} from "../event.service";
import {IInvitations} from "../_interfaces/IInvitations";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  //get events from event-list parent comp
  @Input() event!: IEvents;

  isUpdating: boolean = false

  @Input() invite!: IInvitations[];

  constructor(private eventService: EventService) {
  }

  onDeleteClick(eventId: string){
    this.eventService.onDeleteEvent(eventId)
  }

  onEditEventClick(){
    this.isUpdating = true
  }

  onCancelEditEventClick(){
    this.isUpdating = false
  }

  onSaveEditEventClick(updateEvent: IEvents){
    this.eventService.onSaveUpdateEvent(updateEvent);
    this.isUpdating = false
  }

}
