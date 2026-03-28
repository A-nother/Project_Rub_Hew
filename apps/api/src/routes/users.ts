import { Hono } from "hono";
import { ObjectId } from "mongodb";
import { getDb } from "../libs/mongo";
import { requireAuth } from "../middlewares/requireAuth";
import type { AppVariables } from "../types/hono";
import type { UserDoc } from "../types/user";

const app = new Hono<{ Variables: AppVariables }>();

app.use("/api/users/*", requireAuth);

app.patch("/api/users/profile-image", async (c) => {
  const db = await getDb();
  const users = db.collection<UserDoc>("users");

  const userId = c.get("userId");

  const body = await c.req.json();
  const profileImageUrl = String(body.profileImageUrl ?? "").trim();

  if (!profileImageUrl) {
    return c.json({ message: "profileImageUrl is required" }, 400);
  }

  await users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: {
        profileImageUrl,
        updatedAt: new Date(),
      },
    }
  );

  return c.json({
    message: "profile image updated",
    profileImageUrl,
  });
});

app.get("/api/users/:userId", async (c) => {
  const db = await getDb();
  const users = db.collection<UserDoc>("users");

  const userId = c.req.param("userId");

  if (!ObjectId.isValid(userId)) {
    return c.json({ message: "userId ไม่ถูกต้อง" }, 400);
  }

  const user = await users.findOne({
    _id: new ObjectId(userId),
  });

  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  return c.json({
    user: {
      userId: user._id.toString(),
      username: user.username,
      profileImageUrl: user.profileImageUrl,
      ratingAverage: user.ratingAverage,
      ratingCount: user.ratingCount,
    },
  });
});

export default app;