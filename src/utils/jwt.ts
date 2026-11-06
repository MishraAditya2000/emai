import jwt, { SignOptions } from "jsonwebtoken";

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET is missing or too short (min 32 chars)");
  }
  return secret;
};

export const signAccessToken = (userId: string) =>
  jwt.sign({}, getSecret(), {
    subject: userId,
    algorithm: "HS256",
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "30d") as SignOptions["expiresIn"],
  });

// Throws TokenExpiredError / JsonWebTokenError if the token is bad
export const verifyAccessToken = (token: string): string => {
  const payload = jwt.verify(token, getSecret(), { algorithms: ["HS256"] });
  if (typeof payload === "string" || !payload.sub) {
    throw new jwt.JsonWebTokenError("Invalid token payload");
  }
  return payload.sub;
};