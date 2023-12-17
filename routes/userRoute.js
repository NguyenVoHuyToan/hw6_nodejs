import { Router } from "express";
import { getMeControler, loginController, registerController } from "../controller/user.controller.js";
import { accessTokenValidator, loginValidator, registerValidation } from "../middleware/middleware.js";

const userRouter = Router()

userRouter.post("/register",registerValidation, registerController);
userRouter.post("/login", loginValidator, loginController);
userRouter.get("/getme", accessTokenValidator, getMeControler)
export default userRouter;