import {Component, Input,} from '@angular/core';
import {IEvents} from "../_interfaces/IEvents";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  @Input() currentUserEvent!: IEvents;

  constructor() { }

}
