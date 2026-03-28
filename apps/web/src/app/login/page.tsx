"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarLR from "../components/navbarLR";
import LogoThick from "../components/logoThick";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  async function handleLogin() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ⭐ สำคัญ (เอา cookie มา)
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "เข้าสู่ระบบไม่สำเร็จ");
        return;
      }

      // ✅ login สำเร็จ → ไปหน้า main
      router.push("/main");
    } catch {
      setMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  }

  function goRegister() {
    router.push("/register");
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FFF8EC]">
      <NavbarLR />

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 w-full max-w-5xl">

          {/* โลโก้ */}
          <div className="flex flex-col items-center">
            <LogoThick />
          </div>

          {/* ฟอร์ม */}
          <div className="w-full max-w-sm">
            <h2 className="font-thainohead text-2xl text-[#324B66] mb-6 font-bold">
              เข้าสู่ระบบ
            </h2>

            <div className="flex flex-col gap-5">

              <input
                type="text"
                placeholder="ชื่อผู้ใช้/อีเมล"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-thainohead w-full px-6 py-3 rounded-full bg-white text-[#324B66] shadow-md focus:outline-none focus:ring-2 focus:ring-[#D5C2A3]"
              />

              <input
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-thainohead w-full px-6 py-3 rounded-full bg-white text-[#324B66] shadow-md focus:outline-none focus:ring-2 focus:ring-[#D5C2A3]"
              />

              <button
                onClick={handleLogin}
                disabled={loading}
                className="font-thainohead w-full mt-2 py-3 rounded-full bg-[#D8C7A8] text-[#324B66] text-lg hover:bg-[#c9b796] shadow-md disabled:opacity-60"
              >
                {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </button>

              {message && (
                <p className="text-sm text-red-500 text-center">{message}</p>
              )}

              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="px-4 text-gray-500 text-sm">หรือ</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>

              <button
                onClick={goRegister}
                className="font-thainohead w-full py-3 rounded-full bg-[#D8C7A8] text-[#324B66] text-lg hover:bg-[#c9b796] shadow-md"
              >
                ลงทะเบียน
              </button>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}