import { Router } from "express";
import { accessTokenValidator } from "../middleware/middleware.js";
import { uploadImageController } from "../controller/media.controller.js";
import { upload } from "../utils/upload.js";
const mediaRoute = Router();

mediaRoute.post("/upload",accessTokenValidator,upload.single("avatar"),uploadImageController)

export default mediaRoute
