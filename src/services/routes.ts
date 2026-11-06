import { Router } from "express";
import userRouter from "./users/user-routes.js";
import authRoutes from "./auth/auth-routes";


const router = Router();

router.use("/user",userRouter)
router.use("/auth", authRoutes);



export default router