import { IEditStatusEvent, Params } from './edit-status-event.core.type'
import { DONE, Event } from '../model/event.model'
import { getEvent, editStatusEvent } from '../db/events.db'
import { kafkaSendMessage } from '../infra/kafka.infra'

export class EditStatusEvent implements IEditStatusEvent {
  async execute (params: Params): Promise<Event> {
    try {
      const event = await getEvent(params.id)

      if (event) {
        await editStatusEvent(params.id, params.status)

        if (params.status === DONE) {
          await kafkaSendMessage({
            key: 'event-medicine-done',
            value: JSON.stringify({
              id_medicine: event.medicine.id,
              amount: 1
            })
          })
        }
      } else {
        throw new Error('Não existe esse evento')
      }

      return {
        ...event,
        status: params.status
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
