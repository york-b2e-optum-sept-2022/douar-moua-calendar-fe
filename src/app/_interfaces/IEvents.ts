import {IInvitations} from "./IInvitations";

export interface IEvents{
  id: string,
  eventTag: string
  eventName: string,
  eventDate: Date | null
  // inviteList: IInvitations[]
}
