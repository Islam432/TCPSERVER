import { Router } from 'express'
import { GetBattery } from './battery.controller';



const router = Router()

router.route("/").post(GetBattery)


export default router;