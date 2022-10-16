import {Component, Input, OnInit} from '@angular/core';
import {IAccounts} from "../_interfaces/IAccounts";

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent implements OnInit {

  @Input() accountList!: IAccounts;

  constructor() {
  }

  ngOnInit(): void {
  }

}
