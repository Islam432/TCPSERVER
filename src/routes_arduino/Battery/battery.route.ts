import { Router } from 'express'
import { postBattery } from './battery.controller';



const router = Router()

router.route("/").post(postBattery)


export default router;