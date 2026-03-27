import { Hono } from "hono";

type User = {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  registeredAt: string;
};

const app = new Hono();
const users: User[] = [];

const allowedOriginPatterns = [
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
  /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d+$/,
  /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/,
  /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}:\d+$/,
];

const isAllowedOrigin = (origin: string) =>
  allowedOriginPatterns.some((pattern) => pattern.test(origin));

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPassword = (password: string) => password.length >= 6;

const createToken = () => crypto.randomUUID();

app.use("*", async (c, next) => {
  const origin = c.req.header("origin");

  if (origin && isAllowedOrigin(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
    c.header("Vary", "Origin");
  }

  c.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (c.req.method === "OPTIONS") {
    return c.text("", 200);
  }

  await next();
});

app.get("/health", (c) => c.json({ ok: true, service: "api" }));

app.get("/api/hello", (c) => c.json({ message: "Hello from Hono (Bun)!" }));

app.post("/api/auth/register", async (c) => {
  const body = await c.req.json();
  const { username, email, phone, password, confirmPassword } = body;

  if (!username || !email || !phone || !password || !confirmPassword) {
    return c.json({ message: "กรุณากรอกข้อมูลให้ครบ" }, 400);
  }

  if (password !== confirmPassword) {
    return c.json({ message: "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน" }, 400);
  }

  if (!isValidEmail(email)) {
    return c.json({ message: "รูปแบบอีเมลไม่ถูกต้อง" }, 400);
  }

  if (!isValidPassword(password)) {
    return c.json({ message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }, 400);
  }

  if (users.some((user) => user.username === username)) {
    return c.json({ message: "ชื่อผู้ใช้นี้มีอยู่แล้ว" }, 409);
  }

  if (users.some((user) => user.email === email)) {
    return c.json({ message: "อีเมลนี้มีอยู่แล้ว" }, 409);
  }

  const user: User = {
    id: crypto.randomUUID(),
    username,
    email,
    phone,
    password,
    registeredAt: new Date().toISOString(),
  };

  users.push(user);

  return c.json(
    {
      message: "ลงทะเบียนสำเร็จ",
      token: createToken(),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        registeredAt: user.registeredAt,
      },
    },
    201
  );
});

app.post("/api/auth/login", async (c) => {
  const body = await c.req.json();
  const { usernameOrEmail, password } = body;

  if (!usernameOrEmail || !password) {
    return c.json({ message: "กรุณากรอกชื่อผู้ใช้/อีเมลและรหัสผ่าน" }, 400);
  }

  const user = users.find(
    (item) =>
      item.username === usernameOrEmail || item.email === usernameOrEmail
  );

  if (!user || user.password !== password) {
    return c.json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, 401);
  }

  return c.json({
    message: "เข้าสู่ระบบสำเร็จ",
    token: createToken(),
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      registeredAt: user.registeredAt,
    },
  });
});

export default app;

Bun.serve({
  port: 4000,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});

console.log("Hono API running on http://0.0.0.0:4000");
