import { Router } from "express";
import { PostUserData } from "./users.controller";


const router = Router()

router.route("/all").post(PostUserData)