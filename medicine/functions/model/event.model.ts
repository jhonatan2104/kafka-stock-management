import { Medicine } from './medicine.model'

export const DONE = 'DONE'
export const NOT_DONE = 'NOT_DONE'

export type Status = typeof DONE | typeof NOT_DONE

export type Event = {
  status: Status
  medicine: Medicine
}
