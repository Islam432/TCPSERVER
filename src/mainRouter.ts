
import battryRouter from "../src/routes_arduino/Battery/battery.route"
import solorPanels from "../src/routes_arduino/solar_panels/solar.route"
import { Router } from 'express'

const mainRouter = Router()

mainRouter.use("/battery", battryRouter)
mainRouter.use("/SolarP", solorPanels)



export default mainRouter








