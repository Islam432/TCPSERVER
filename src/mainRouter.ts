
import battryRouter from "../src/routes_arduino/Battery/battery.route"
import { Router } from 'express'

const mainRouter = Router()

mainRouter.use("/battery", battryRouter)



export default mainRouter








