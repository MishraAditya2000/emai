
import jwt  from "jsonwebtoken";
import { verifyAccessToken } from "../utils/jwt";
import { findAuthUserById } from "../services/auth/auth-queries";
import {asyncHandler} from "../utils/asyncHandler";



export const requireAuth = asyncHandler(async(req,res,next)=>{
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      res.status(401).json({ error: "Missing token", code: "NO_TOKEN" });
      return;
    }

    let userId: string;
    try {
      userId = verifyAccessToken(header.slice(7));
    } catch (err) {
      const expired = err instanceof jwt.TokenExpiredError;
      res.status(401).json({
        error: expired ? "Token expired" : "Invalid token",
        code: expired ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
      });
      return;
    }

    const user = await findAuthUserById(userId);
    if (!user) {
      res.status(401).json({ error: "User not found", code: "INVALID_TOKEN" });
      return;
    }
    if (user.isBlocked) {
      res.status(403).json({ error: "Account is blocked", code: "BLOCKED" });
      return;
    }

    req.user = { id: user._id, email: user.email, name: user.name };
    next();
})
