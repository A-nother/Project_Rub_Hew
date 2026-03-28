"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarLR from "../components/navbarLR";
import LogoThick from "../components/logoThick";

export default function RegisterPage() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "ลงทะเบียนไม่สำเร็จ");
        return;
      }

      router.push("/main");
    } catch {
      setMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FFF8EC]">
      <NavbarLR />

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-16 md:flex-row md:gap-32">
          <LogoThick />

          <div className="w-full max-w-sm">
            <h2 className="font-thainohead mb-6 text-2xl font-bold text-[#324B66]">
              ลงทะเบียน
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="ชื่อผู้ใช้"
                className="font-thainohead w-full rounded-full bg-white px-6 py-3 shadow-md text-[#324B66] focus:outline-none focus:ring-2 focus:ring-[#D5C2A3]"
                required
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="เบอร์โทรศัพท์"
                className="font-thainohead w-full rounded-full bg-white px-6 py-3 shadow-md text-[#324B66] focus:outline-none focus:ring-2 focus:ring-[#D5C2A3]"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="อีเมล"
                className="font-thainohead w-full rounded-full bg-white px-6 py-3 shadow-md text-[#324B66] focus:outline-none focus:ring-2 focus:ring-[#D5C2A3]"
                required
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="รหัสผ่าน"
                className="font-thainohead w-full rounded-full bg-white px-6 py-3 shadow-md text-[#324B66] focus:outline-none focus:ring-2 focus:ring-[#D5C2A3]"
                required
              />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="ยืนยันรหัสผ่าน"
                className="font-thainohead w-full rounded-full bg-white px-6 py-3 shadow-md text-[#324B66] focus:outline-none focus:ring-2 focus:ring-[#D5C2A3]"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="font-thainohead mt-2 w-full rounded-full bg-[#D8C7A8] py-3 text-lg text-[#324B66] shadow-md hover:bg-[#c9b796] disabled:opacity-60"
              >
                {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
              </button>

              {message && (
                <p className="text-center text-sm text-red-500">{message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}