import { NextResponse } from "next/server";

import { createToken, users } from "@/lib/auth-store";

export async function POST(req: Request) {
  const body = await req.json();
  const { usernameOrEmail, password } = body;

  if (!usernameOrEmail || !password) {
    return NextResponse.json(
      { message: "กรุณากรอกชื่อผู้ใช้/อีเมลและรหัสผ่าน" },
      { status: 400 }
    );
  }

  const user = users.find(
    (item) =>
      item.username === usernameOrEmail || item.email === usernameOrEmail
  );

  if (!user || user.password !== password) {
    return NextResponse.json(
      { message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" },
      { status: 401 }
    );
  }

  return NextResponse.json({
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
}
