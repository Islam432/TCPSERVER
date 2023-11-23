import { Router } from "express";
import randomRoute from '../src/routes_client/Random/random.route';



 const  applicationRouter = Router()
 applicationRouter.use('/random', randomRoute)


export default applicationRouter;
