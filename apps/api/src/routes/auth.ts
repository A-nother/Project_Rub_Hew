import { Hono } from "hono";
import { readCookie } from "../libs/cookie";
import { ObjectId } from "mongodb";
import { getDb } from "../libs/mongo";
import { createJwt, verifyJwt, jwtMaxAge } from "../libs/jwt";
import { hashToken } from "../libs/token";

const app = new Hono();

app.post("/api/register", async (c) => {
  const db = await getDb();
  const users = db.collection("users");
  const sessions = db.collection("sessions");

  const body = await c.req.json();
  const username = String(body.username ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!username || !email || !password) {
    return c.json({ message: "กรอกข้อมูลไม่ครบ" }, 400);
  }

  const existingUser = await users.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    return c.json({ message: "username หรือ email ถูกใช้งานแล้ว" }, 409);
  }

  const passwordHash = await Bun.password.hash(password);

  const now = new Date();
  const userDoc = {
    username,
    email,
    passwordHash,
    profileImageUrl: "",
    ratingAverage: 0,
    ratingCount: 0,
    role: "user",
    isBanned: false,
    banReason: "",
    bannedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  const insertUserResult = await users.insertOne(userDoc);
  const userId = insertUserResult.insertedId.toString();

  const jti = crypto.randomUUID();
  const token = await createJwt({
    userId,
    username,
    role: "user",
    jti,
  });

  const tokenHash = await hashToken(token);
  const expiresAt = new Date(Date.now() + jwtMaxAge * 1000);

  await sessions.insertOne({
    userId: new ObjectId(userId),
    jti,
    tokenHash,
    createdAt: now,
    expiresAt,
  });

  c.header(
  "Set-Cookie",
  `access_token=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${jwtMaxAge}`
  );

  return c.json(
    {
      message: "register success",
      user: {
        userId,
        username,
        email,
      },
    },
    201
  );
});

app.post("/api/login", async (c) => {
  const db = await getDb();
  const users = db.collection("users");
  const sessions = db.collection("sessions");

  const body = await c.req.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  const user = await users.findOne<{
    _id: ObjectId;
    username: string;
    email: string;
    passwordHash: string;
    role: string;
    isBanned: boolean;
    banReason?: string;
  }>({ email });

  if (!user) {
    return c.json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, 401);
  }

  if (user.isBanned) {
  return c.json(
    {
      message: "บัญชีนี้ถูกระงับการใช้งาน",
      reason: user.banReason,
    },
    403
  );
}

  const ok = await Bun.password.verify(password, user.passwordHash);
  if (!ok) {
    return c.json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, 401);
  }

  const jti = crypto.randomUUID();
  const token = await createJwt({
    userId: user._id.toString(),
    username: user.username,
    role: user.role,
    jti,
  });

  const tokenHash = await hashToken(token);
  const now = new Date();
  const expiresAt = new Date(Date.now() + jwtMaxAge * 1000);

  await sessions.insertOne({
    userId: user._id,
    jti,
    tokenHash,
    createdAt: now,
    expiresAt,
  });

  c.header(
  "Set-Cookie",
  `access_token=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${jwtMaxAge}`
  );

  return c.json({
    message: "login success",
    user: {
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

app.post("/api/logout", async (c) => {
  const db = await getDb();
  const sessions = db.collection("sessions");

  const token = readCookie(c.req.header("cookie"), "access_token");

  if (token) {
    try {
      const payload = await verifyJwt(token);

      await sessions.deleteOne({
        jti: payload.jti,
        userId: new ObjectId(payload.sub),
      });
    } catch {
        c.header(
            "Set-Cookie",
            "access_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
        );
    }
  }

  c.header(
  "Set-Cookie",
  "access_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
  );

  return c.json({ message: "logout success" });
});

export default app;