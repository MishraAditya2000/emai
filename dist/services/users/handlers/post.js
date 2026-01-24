import { asyncHandler } from "../../../utils/asyncHandler.js";
export const userRegistration = asyncHandler(async (req, res) => {
  return res.status(200).json({ message: "Working" });
  // throw new Error("Unexpected Error");
});
