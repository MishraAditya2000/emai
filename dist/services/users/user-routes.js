import { Router } from "express";
import { userRegistration } from "./handlers/post.js";
const userRouter = Router();
userRouter.route("/signup").get(userRegistration);
export default userRouter;
