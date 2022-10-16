import {Component, Input} from '@angular/core';
import {IAccounts} from "../_interfaces/IAccounts";
import {InviteService} from "../invite.service";

@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent {

  @Input() accountList!: IAccounts;

  selectedUser: IAccounts = {
    id: '',
    username: '',
    password: ''
  }

  constructor(private inviteService: InviteService) {
  }

  onInviteUserCheck(){
    this.inviteService.createInvite()
  }


}
