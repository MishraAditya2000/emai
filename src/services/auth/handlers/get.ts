import { asyncHandler } from "../../../utils/asyncHandler";



export const getMe = asyncHandler(async (req, res) => {
  return res.json({ user: req.user });
})