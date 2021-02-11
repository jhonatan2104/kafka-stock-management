import { Event, Status } from '../model/event.model'

export interface IEditStatusEvent {
  execute: (params: Params) => Promise<Event>
}

export type Params = {
  id: string
  status: Status
}
