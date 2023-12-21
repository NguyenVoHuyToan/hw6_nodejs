import { Router } from "express";
import { accessTokenValidator } from "../middleware/middleware.js";
import { createsPostController } from "../controller/post.controller.js";
const postRoute = Router()

postRoute.post("/", accessTokenValidator,createsPostController)

export default postRoute;