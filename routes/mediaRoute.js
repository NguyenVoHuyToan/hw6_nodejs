import { Router } from "express";
import { accessTokenValidator } from "../middleware/middleware.js";
import { uploadImageController } from "../controller/media.controller.js";
import { upload } from "../utils/upload.js";
const mediaRoute = Router();
//upload Media
//upload.array("key",): Upload nhiều hình và giới hạn số lượng hình được upload
mediaRoute.post("/upload",accessTokenValidator,upload.array("avatar",10),uploadImageController)

export default mediaRoute
