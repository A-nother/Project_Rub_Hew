"use client"; // 👈 ขาดบรรทัดนี้ไม่ได้เลยครับ

import React, { useState } from 'react';
import NavbarLR from "../components/navbarLR";

export default function RegisterPage() {
  // 1. ส่วนจัดการข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // เพิ่ม Logic สำหรับส่งข้อมูลไป API ที่นี่
  };

  // 2. ส่วนหน้าตาเว็บ
  return (
    <main className="min-h-screen bg-[#FDF8EE] font-sans flex flex-col">
      {/* ใส่ Navbar ของคุณไว้ด้านบนสุด */}
      <NavbarLR />

      {/* พื้นที่ฟอร์มลงทะเบียน */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* ด้านซ้าย: โลโก้ (ซ่อนในมือถือ) */}
          <div className="flex flex-col items-center justify-center hidden md:flex">
            <svg width="200" height="200" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
              <path d="M35 45V30C35 16.1929 46.1929 5 60 5C73.8071 5 85 16.1929 85 30V45" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
              <rect x="15" y="35" width="90" height="65" rx="12" fill="#ED7D4D" stroke="#1A1A1A" strokeWidth="4" />
              <path d="M60 50L40 60L60 70L80 60L60 50Z" fill="#FDF8EE" stroke="#1A1A1A" strokeWidth="2" strokeLinejoin="round" />
              <path d="M40 60V80L60 90V70L40 60Z" fill="#5096B4" stroke="#1A1A1A" strokeWidth="2" strokeLinejoin="round" />
              <path d="M80 60V80L60 90V70L80 60Z" fill="#3A758E" stroke="#1A1A1A" strokeWidth="2" strokeLinejoin="round" />
              <path d="M48 56L72 68" stroke="#ED7D4D" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <h1 className="text-4xl font-bold text-[#344663] tracking-wider">
              RUB-HEW
            </h1>
          </div>

          {/* ด้านขวา: ฟอร์ม */}
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-[#344663] mb-8">
              ลงทะเบียน
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="ชื่อผู้ใช้" className="w-full px-5 py-3 rounded-full border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] focus:outline-none focus:border-[#344663] text-gray-700" required />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="เบอร์โทรศัพท์" className="w-full px-5 py-3 rounded-full border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] focus:outline-none focus:border-[#344663] text-gray-700" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="อีเมล" className="w-full px-5 py-3 rounded-full border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] focus:outline-none focus:border-[#344663] text-gray-700" required />
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="รหัสผ่าน" className="w-full px-5 py-3 rounded-full border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] focus:outline-none focus:border-[#344663] text-gray-700" required />
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="ยืนยันรหัสผ่าน" className="w-full px-5 py-3 rounded-full border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] focus:outline-none focus:border-[#344663] text-gray-700" required />
              
              <button type="submit" className="w-full bg-[#D1C2A7] text-[#344663] font-semibold text-lg py-3 mt-4 rounded-full shadow-md hover:bg-[#c4b395] transition-colors">
                ลงทะเบียน
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}