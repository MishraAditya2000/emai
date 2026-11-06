import { eq } from "drizzle-orm";
import {db} from "../../db/connection";
import { users } from "../../db/schema/user";

type GoogleProfile = { googleId: string; email: string; name: string };

export const upsertGoogleUser = async ({ googleId, email, name }: GoogleProfile) => {
  const [user] = await db
    .insert(users)
    .values({ googleId, email, name })
    .onConflictDoUpdate({ target: users.googleId, set: { email, name } })
    .returning();
  return user;
};

export const findAuthUserById=async(_id:string)=>{
  const [user]=await db.select().from(users).where(eq(users._id,_id)).limit(1);
  return user ?? null;
}