import { Router } from 'express'
import { apiGet, apiTest } from './random.controller'

const router = Router()
router.route('/').post(apiTest).get(apiGet)

export default router