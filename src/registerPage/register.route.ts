import { Router } from 'express'
import { Register } from './register.controller'


const router = Router()

router.post('/reg',Register )


export default router