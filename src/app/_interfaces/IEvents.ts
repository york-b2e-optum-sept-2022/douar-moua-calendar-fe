import {IInvitations} from "./IInvitations";

export interface IEvents{
  id: string,
  eventCreatorId: string
  eventName: string,
  eventDate: Date | null
  // inviteList: IInvitations[]
}
