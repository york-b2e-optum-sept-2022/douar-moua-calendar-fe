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

  // updateEvent: IEvents = {
  //   id: '',
  //   eventCreatorId: '',
  //   eventName: '',
  //   eventDate: null
  // }
  isUpdating: boolean = false

  constructor(private eventService: EventService) { }

  onDeleteClick(eventId: string){
    this.eventService.onDeleteEvent(eventId)
    this.eventService.getEventList()
    console.log('delete clicked ', eventId)
  }

  onEditEventClick(){
    this.isUpdating = true
  }

  onCancelEditEventClick(){
    this.isUpdating = false
  }

  onSaveEditEventClick(updateEvent: IEvents){
    this.eventService.onSaveUpdateEvent(updateEvent)
    this.isUpdating = false
    this.eventService.getEventList()
    console.log(updateEvent)
  }

}
