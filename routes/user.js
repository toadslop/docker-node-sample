import { Router } from "express";
import user from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/signup", user.signUp);
userRouter.post("/login", user.login);

export default userRouter;
