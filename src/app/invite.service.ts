import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IInvitations} from "./_interfaces/IInvitations";
import {first} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  inviteList: IInvitations[] = []

  constructor(private httpService: HttpService) { }

  getInviteList(){
    this.httpService.getInviteList().pipe(first()).subscribe({
      next: (inviteList) => {
        this.inviteList = inviteList
        console.log(this.inviteList)
      },
      error: err => {
        console.error(err)
        alert('Unable to load list of invites. Please try again later.')
      }
    })
  }
}
