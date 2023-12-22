import { Router } from 'express'
import { test } from './test.controller';


const router = Router()

router.route("/").post(test)


export default router;