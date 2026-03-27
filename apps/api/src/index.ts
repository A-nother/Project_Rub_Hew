import { Hono } from "hono";
import {
  hashPassword,
  comparePasswords,
  generateToken,
  isValidEmail,
  isValidPassword,
} from "./auth";
import {
  findUser,
  findUserByUsername,
  findUserByEmail,
  createUser,
} from "./db";

const app = new Hono();

const allowedOriginPatterns = [
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
  /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d+$/,
  /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/,
  /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}:\d+$/,
];

const isAllowedOrigin = (origin: string) =>
  allowedOriginPatterns.some((pattern) => pattern.test(origin));

// CORS
app.use("*", async (c, next) => {
  const origin = c.req.header("origin");

  if (origin && isAllowedOrigin(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
    c.header("Vary", "Origin");
  }

  c.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (c.req.method === "OPTIONS") return c.text("", 200);
  await next();
});

app.get("/health", (c) => c.json({ ok: true, service: "api" }));

app.get("/api/hello", (c) =>
  c.json({ message: "Hello from Hono (Bun)!" })
);

// Register endpoint
app.post("/api/auth/register", async (c) => {
  try {
    console.log("Register request received");
    const body = await c.req.json();
    console.log("Body parsed:", body);
    const { username, email, phone, password, confirmPassword } = body;

    // Validation
    if (!username || !email || !phone || !password) {
      return c.json(
        { message: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return c.json(
        { message: "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return c.json({ message: "รูปแบบอีเมลไม่ถูกต้อง" }, { status: 400 });
    }

    if (!isValidPassword(password)) {
      return c.json(
        { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (findUserByUsername(username)) {
      return c.json(
        { message: "ชื่อผู้ใช้นี้มีอยู่แล้ว" },
        { status: 409 }
      );
    }

    if (findUserByEmail(email)) {
      return c.json(
        { message: "อีเมลนี้มีอยู่แล้ว" },
        { status: 409 }
      );
    }

    // Hash password
    console.log("Hashing password...");
    const hashedPassword = await hashPassword(password);
    console.log("Password hashed");

    // Create user
    console.log("Creating user...");
    const user = createUser(username, email, phone, hashedPassword);
    console.log("User created:", user.id);

    // Generate token
    const token = generateToken();

    return c.json(
      {
        message: "ลงทะเบียนสำเร็จ",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          registeredAt: user.registeredAt,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return c.json(
      { message: "เกิดข้อผิดพลาดในการลงทะเบียน", error: String(error) }, 
      { status: 500 }
    );
  }
});

// Login endpoint
app.post("/api/auth/login", async (c) => {
  try {
    console.log("Login request received");
    const body = await c.req.json();
    console.log("Body parsed");
    const { usernameOrEmail, password } = body;

    // Validation
    if (!usernameOrEmail || !password) {
      return c.json(
        { message: "กรุณากรอกชื่อผู้ใช้/อีเมลและรหัสผ่าน" },
        { status: 400 }
      );
    }

    // Find user
    const user = findUser(usernameOrEmail);

    if (!user) {
      return c.json(
        { message: "ไม่พบผู้ใช้นี้ในระบบ" },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return c.json(
        { message: "รหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken();

    return c.json(
      {
        message: "เข้าสู่ระบบสำเร็จ",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          registeredAt: user.registeredAt,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return c.json(
      { message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ", error: String(error) }, 
      { status: 500 }
    );
  }
});

export default app;

Bun.serve({
  port: 4000,
  fetch: app.fetch,
});

console.log("✅ Hono API running on http://localhost:4000");
