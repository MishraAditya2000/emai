import { Request, Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../../../utils/asyncHandler";
import { verifyGoogleIdToken } from "../../../utils/googleAuth";
import { upsertGoogleUser } from "../auth-queries";
import { signAccessToken } from "../../../utils/jwt";

const bodySchema = z.object({ idToken: z.string().min(20) });

export const googleLogin = asyncHandler(async (req,res) => {
  const parsed = bodySchema.safeParse(req.body);
  // console.log("Parsed request body:", parsed);
  if (!parsed.success) {
    res.status(400).json({ error: "idToken is required" });
    return;
  }

  let profile;

    profile = await verifyGoogleIdToken(parsed.data.idToken);
  
  console.log("Google profile:", profile);
  const user = await upsertGoogleUser({
    ...profile,
    name: profile.name ?? profile.email,
  });

  if (user.isBlocked) {
    res.status(403).json({ error: "Account is blocked" });
    return;
  }

const token = signAccessToken(user._id);
res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
});