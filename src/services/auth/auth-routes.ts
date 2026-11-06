import { Router } from "express";
import { googleLogin } from "./handlers/post";
import { getMe } from "./handlers/get";
import { requireAuth } from "../../middleware/requireAuth";
const router = Router();

router.post("/google", googleLogin);
router.get("/me",requireAuth, getMe);


export default router;
