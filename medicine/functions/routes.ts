/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Router } from 'express'

import { editStatusEvent } from './controller/medicine.controller'
const router: express.IRouter = Router()

router.patch('/event/:id', editStatusEvent)

export default router
