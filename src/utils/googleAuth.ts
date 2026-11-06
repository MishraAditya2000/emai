import { OAuth2Client } from "google-auth-library";
import "dotenv/config";
const client = new OAuth2Client();

export const verifyGoogleIdToken = async (idToken: string) => {
  const audience = process.env.GOOGLE_WEB_CLIENT_ID;
  if (!audience) throw new Error("GOOGLE_WEB_CLIENT_ID is not set");

if (!idToken) {
    throw new Error("Google ID token is missing");
  } 
  console.log("Verifying Google ID token:", idToken);
  console.log("Audience:", audience);

  // const ticket = await client.verifyIdToken({
  //   idToken,
  //   audience,
  // });

  const ticket = await Promise.race([
  client.verifyIdToken({ idToken, audience }),

  new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error("Verification timed out after 10 seconds")),
      10000
    )
  ),
]);


  console.log("Google ID token verified successfully:", ticket);
  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Unable to retrieve Google token payload");
  }

  if (!payload.sub) {
    throw new Error("Google ID is missing");
  }

  if (!payload.email || !payload.email_verified) {
    throw new Error("Google email is not verified");
  }

  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
  };
};


