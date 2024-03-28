import { Router } from 'express'
import { getBattery, postBattery } from './battery.controller';



const router = Router()

router.route("/").post(postBattery)
router.route("/:id").get(getBattery);


export default router;