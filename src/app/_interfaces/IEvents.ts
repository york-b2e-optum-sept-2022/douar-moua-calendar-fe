import {IInvitations} from "./IInvitations";

export interface IEvents{
  id: string,
  eventCreatorId: string
  eventName: string,
  eventDate: Date | null
  // inviteList: IInvitations[]
}

// {
//   "id": "ab479ac2-672d-4c89-858e-1c262a0c70c2",
//   "eventID": "951bc664-ddd0-4d95-b049-78a7ac375399",
//   "eventName": "birthday",
//   "eventDate": "2022-10-11T00:00:00.000Z"
// },
