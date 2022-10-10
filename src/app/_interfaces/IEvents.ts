import {IInvitations} from "./IInvitations";

export interface IEvents{
  id: string,
  eventName: string,
  eventDate: Date,
  inviteList: IInvitations
}
