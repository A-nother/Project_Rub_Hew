import { NextResponse } from "next/server";

import { createToken, isValidEmail, isValidPassword, users } from "@/lib/auth-store";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, email, phone, password, confirmPassword } = body;

  if (!username || !email || !phone || !password || !confirmPassword) {
    return NextResponse.json({ message: "กรุณากรอกข้อมูลให้ครบ" }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "รูปแบบอีเมลไม่ถูกต้อง" }, { status: 400 });
  }

  if (!isValidPassword(password)) {
    return NextResponse.json(
      { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" },
      { status: 400 }
    );
  }

  if (users.some((user) => user.username === username)) {
    return NextResponse.json({ message: "ชื่อผู้ใช้นี้มีอยู่แล้ว" }, { status: 409 });
  }

  if (users.some((user) => user.email === email)) {
    return NextResponse.json({ message: "อีเมลนี้มีอยู่แล้ว" }, { status: 409 });
  }

  const user = {
    id: crypto.randomUUID(),
    username,
    email,
    phone,
    password,
    registeredAt: new Date().toISOString(),
  };

  users.push(user);

  return NextResponse.json(
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
    { status: 201 }
  );
}
