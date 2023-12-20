import { Router } from "express";
import { postSolar } from "./solar.controller";



const router = Router()

router.route("/").post(postSolar)

export default router;