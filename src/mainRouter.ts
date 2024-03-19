import auth from '../src/auth/auth.route'
import battryRouter from "../src/routes_arduino/Battery/battery.route"
import solorPanels from "../src/routes_arduino/solar_panels/solar.route"
import test from "../src/routes_arduino/testrout/test.route"
import { Router } from 'express'
import regis from './registerPage/register.route'
const mainRouter = Router()
mainRouter.use("/test", test)

mainRouter.use("/auth", auth)
mainRouter.use("/register", regis)

mainRouter.use("/arduino-data", battryRouter)
mainRouter.use("/SolarP", solorPanels)



export default mainRouter


