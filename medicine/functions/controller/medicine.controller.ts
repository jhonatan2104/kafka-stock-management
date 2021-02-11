import { EditStatusEvent } from '../core/edit-status-event.core'
import { Request, Response } from 'express'

export async function editStatusEvent (req: Request,res: Response): Promise<Response<any, Record<string, any>>> {
  const { status } = req.body
  const { id } = req.params
  try {
    if (status && id) {
      const core = new EditStatusEvent()
      const event = await core.execute({
        id,
        status
      })
      return res.status(200).json({
        message: 'Success Event Update',
        data: event
      })
    } else {
      return res.status(400).json({
        message: 'Missing Status or Id Event'
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Server Erro'
    })
  }
}
