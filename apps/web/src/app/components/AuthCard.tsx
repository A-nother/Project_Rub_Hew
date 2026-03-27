"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Mode = "login" | "register";

type AuthCardProps = {
  mode: Mode;
};

export default function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter();
  const isLogin = mode === "login";

  const [loginForm, setLoginForm] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "เข้าสู่ระบบไม่สำเร็จ");
        return;
      }

      alert("เข้าสู่ระบบสำเร็จ");
      console.log("login success:", data);
      const token = data.token || "dummy-token";
      localStorage.setItem("authToken", token);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (registerForm.password !== registerForm.confirmPassword) {
      alert("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "ลงทะเบียนไม่สำเร็จ");
        return;
      }

      alert("ลงทะเบียนสำเร็จ");
      console.log("register success:", data);
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  const inputClass =
    "h-12 w-full rounded-full border border-[#D7D7D7] bg-[#F7F7F7] px-5 text-sm text-[#2F4363] shadow-[0_3px_6px_rgba(0,0,0,0.12)] outline-none placeholder:text-[#B8B8B8] focus:border-[#CDBB9C]";

  const buttonClass =
    "mt-3 h-12 w-full rounded-full bg-[#D5C2A3] text-lg font-medium text-[#2F4363] shadow-[0_3px_6px_rgba(0,0,0,0.12)] transition hover:opacity-90";

  return (
    <div className="w-full max-w-[380px]">
      <h1 className="mb-6 text-4xl font-semibold text-[#2F4363]">
        {isLogin ? "เข้าสู่ระบบ" : "ลงทะเบียน"}
      </h1>

      {isLogin ? (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="ชื่อผู้ใช้/อีเมล"
            className={inputClass}
            value={loginForm.usernameOrEmail}
            onChange={(e) =>
              setLoginForm((prev) => ({
                ...prev,
                usernameOrEmail: e.target.value,
              }))
            }
          />

          <input
            type="password"
            placeholder="รหัสผ่าน"
            className={inputClass}
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />

          <button type="submit" className={buttonClass}>
            เข้าสู่ระบบ
          </button>

          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-[#7B7268]" />
            <span className="text-sm text-[#7B7268]">หรือ</span>
            <div className="h-px flex-1 bg-[#7B7268]" />
          </div>

          <Link
            href="/register"
            className="flex h-12 w-full items-center justify-center rounded-full bg-[#D5C2A3] text-lg font-medium text-[#2F4363] shadow-[0_3px_6px_rgba(0,0,0,0.12)] transition hover:opacity-90"
          >
            ลงทะเบียน
          </Link>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="ชื่อผู้ใช้"
            className={inputClass}
            value={registerForm.username}
            onChange={(e) =>
              setRegisterForm((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />

          <input
            type="text"
            placeholder="เบอร์โทรศัพท์"
            className={inputClass}
            value={registerForm.phone}
            onChange={(e) =>
              setRegisterForm((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
          />

          <input
            type="email"
            placeholder="อีเมล"
            className={inputClass}
            value={registerForm.email}
            onChange={(e) =>
              setRegisterForm((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />

          <input
            type="password"
            placeholder="รหัสผ่าน"
            className={inputClass}
            value={registerForm.password}
            onChange={(e) =>
              setRegisterForm((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />

          <input
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            className={inputClass}
            value={registerForm.confirmPassword}
            onChange={(e) =>
              setRegisterForm((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />

          <button type="submit" className={buttonClass}>
            ลงทะเบียน
          </button>

          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-[#7B7268]" />
            <span className="text-sm text-[#7B7268]">หรือ</span>
            <div className="h-px flex-1 bg-[#7B7268]" />
          </div>

          <Link
            href="/login"
            className="flex h-12 w-full items-center justify-center rounded-full bg-[#D5C2A3] text-lg font-medium text-[#2F4363] shadow-[0_3px_6px_rgba(0,0,0,0.12)] transition hover:opacity-90"
          >
            เข้าสู่ระบบ
          </Link>
        </form>
      )}
    </div>
  );
}