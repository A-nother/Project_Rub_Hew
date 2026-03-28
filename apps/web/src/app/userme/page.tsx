"use client";

import { useState } from "react";
import NavbarMain from "../components/navbarMain";
import Sidebar from "../components/sidebar";
import Image from "next/image";

const tabs = ["ทั้งหมด", "รับฝากซื้อ", "ฝากหิ้วฝาก"];

const products = [
  { id: 1, name: "ชื่อสิ่งของ", price: "999 บาท" },
  { id: 2, name: "ชื่อสิ่งของ", price: "999 บาท" },
  { id: 3, name: "ชื่อสิ่งของ", price: "999 บาท" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="min-h-screen bg-[#F8F1E7] text-[#2F2F2F]">
      <NavbarMain />

      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <section className="px-6 pb-6">
            <div className="flex flex-col gap-6 lg:flex-row">
              
              {/* 🔹 โปรไฟล์ */}
              <aside className="w-full lg:w-[260px]">
                <div className="rounded-[28px] bg-[#F3E3C7] p-4 shadow-lg hover:shadow-xl transition">
                  
                  <div className="mb-4 flex items-start gap-3">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-b from-[#BDBDBD] to-[#8E8E8E]" />
                    <div className="flex-1">
                      <h2 className="font-semibold">ชื่อผู้ใช้</h2>
                      <p className="text-sm">★★★★☆</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    {[
                      "📞 : 999-999-9999",
                      "🌐 : username",
                      "📷 : username",
                      "💬 : abcd1234",
                      "📍 : 1 หมู่ 1 ก.บร...",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b border-[#8A7D6B] pb-1"
                      >
                        <span>{item}</span>
                        <button className="text-xs">✎</button>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              {/* 🔹 Content */}
              <div className="flex-1">
                
                {/* Tabs */}
                <div className="mb-5 flex flex-wrap gap-3">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(index)}
                      className={`rounded-full px-6 py-2 text-sm shadow-sm transition ${
                        activeTab === index
                          ? "bg-[#2F4A73] text-white"
                          : "bg-[#D5C2A3] hover:bg-[#ccb793]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* 🔹 Post Card */}
                <div className="max-w-[780px] rounded-[28px] border border-white/30 bg-[#DCE6EF] shadow-lg hover:shadow-xl transition backdrop-blur-sm">
                  
                  {/* Header */}
                  <div className="rounded-t-[28px] bg-[#7DC9C3] px-4 py-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#B8E4DF] px-4 py-2 text-sm font-medium">
                      🧺 รับฝากหิ้ว
                    </div>
                  </div>

                  <div className="p-5">
                    
                    {/* User */}
                    <div className="mb-5 flex items-start gap-4">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-b from-[#BDBDBD] to-[#8E8E8E]" />
                      <div>
                        <h3 className="font-semibold">ชื่อผู้ใช้</h3>
                        <p className="text-sm">★★★★☆</p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6 text-sm text-[#444]">
                      ข้อความ
                    </div>

                    {/* Products */}
                    <div className="flex flex-wrap items-end gap-4">
                      {products.map((item) => (
                        <div key={item.id} className="w-[90px]">
                          <div className="mb-2 h-[110px] w-[90px] rounded bg-gradient-to-b from-[#D4D4D4] to-[#8F8F8F] shadow-sm hover:scale-105 transition" />
                          <p className="text-xs">{item.name}</p>
                          <p className="text-[11px] text-[#777]">{item.price}</p>
                        </div>
                      ))}

                      <button className="ml-2 rounded-full bg-[#79C9C4] px-5 py-2 text-sm shadow-md hover:scale-105 transition">
                        เพิ่มเติม...
                      </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      <button className="rounded-full bg-[#EFE7E2] px-5 py-2 text-sm shadow-sm hover:scale-105 transition">
                        💬 แสดงความคิดเห็น
                      </button>

                      <div className="flex gap-3">
                        <button className="rounded-full bg-[#F5F1EB] px-4 py-2 shadow-sm hover:scale-105 transition">
                          🔗
                        </button>
                        <button className="rounded-full bg-[#F28C45] px-6 py-2 text-white shadow-md hover:scale-105 transition">
                          📦 ยื่นข้อเสนอ
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}