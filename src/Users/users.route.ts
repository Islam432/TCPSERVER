import { Router } from "express";
import { GetStarted, UbdateUserData } from "./users.controller";


const router = Router()

router.route("/all").patch(UbdateUserData)
router.route("/getId").get(GetStarted)

export default router