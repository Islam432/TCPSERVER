import { Router } from "express"
import battryRouter from "../src/routes_arduino/Battery/battery.route"
const mainRouter = Router()

mainRouter.use("/battery", battryRouter)



export default mainRouter
