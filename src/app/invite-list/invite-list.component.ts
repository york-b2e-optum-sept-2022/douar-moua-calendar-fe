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

  userIsSelected: boolean = false

  constructor(private inviteService: InviteService) {
  }

  onInviteUserCheck(){
    if (this.userIsSelected == true){
      this.inviteService.createInvite(this.accountList)
      console.log('box is checked')
      console.log(this.accountList)
    }
  }


}
