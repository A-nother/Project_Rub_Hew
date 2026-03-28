import { getDb } from "../libs/mongo";
import { verifyJwt } from "../libs/jwt";
import { readCookie } from "../libs/cookie";
import { ObjectId } from "mongodb";
import type { Context } from "hono";
import type { AppVariables } from "../types/hono";
import type { UserDoc } from "../types/user";

export async function requireAuth(
  c: Context<{ Variables: AppVariables }>,
  next: () => Promise<void>
) {
  const cookieHeader = c.req.header("cookie");
  const token = readCookie(cookieHeader, "access_token");

  if (!token) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  try {
    const payload = await verifyJwt(token);
    const userId = payload.sub;

    const db = await getDb();
    const users = db.collection<UserDoc>("users");

    const user = await users.findOne({
      _id: new ObjectId(userId),
    });

    if (!user) {
      return c.json({ message: "User not found" }, 401);
    }

    if (user.isBanned) {
      return c.json(
        {
          message: "บัญชีนี้ถูกระงับการใช้งาน",
          reason: user.banReason ?? "",
        },
        403
      );
    }

    c.set("jwtPayload", payload);
    c.set("userId", userId);
    c.set("authUser", user);

    await next();
  } catch {
    return c.json({ message: "Invalid token" }, 401);
  }
}