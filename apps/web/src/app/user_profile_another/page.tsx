"use client";

import Image from "next/image";
import { useState } from "react";

type TabKey = "ทั้งหมด" | "รับฝากหิ้ว" | "ฝากหิ้วฝาก";

const contactRows = [
  { icon: "/picture/solar_phone-linear.png", label: ": 999-999-9999" },
  { icon: "/picture/proicons_facebook.png", label: ": ชื่อผู้ใช้" },
  { icon: "/picture/icon-park-outline_instagram.png", label: ": ชื่อผู้ใช้" },
  { icon: "/picture/streamline-logos_line-app-logo.png", label: ": abcd1234" },
];

const sideFilters = [
  { label: "เวลา", icon: "/picture/bi_sort-down.png" },
  { label: "หมวดหมู่", icon: "/picture/bi_sort-down.png" },
];

const tabs: TabKey[] = ["ทั้งหมด", "รับฝากหิ้ว", "ฝากหิ้วฝาก"];

export default function UserProfileAnotherPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("ทั้งหมด");

  return (
    <main className="min-h-screen bg-[#FBF5EA] font-thainohead text-black">
      <header className="flex min-h-[62px] items-center gap-4 bg-[#344663] px-5 py-3 text-white sm:px-6">
        <div className="shrink-0 pt-0.5">
          <Image
            src="/picture/Logo(Thin).png"
            alt="RUB-HEW"
            width={170}
            height={40}
            priority
          />
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex w-full max-w-[525px] items-center rounded-full bg-white px-5 py-2.5 shadow-sm">
            <Image
              src="/picture/humbleicons_search.png"
              alt="Search"
              width={15}
              height={15}
              className="mr-2.5"
            />
            <input
              type="text"
              placeholder="ค้นหา"
              className="w-full bg-transparent text-[12px] text-black outline-none placeholder:text-[#7A7A7A]"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-5 sm:gap-6">
          <Image src="/picture/Save(icon).png" alt="Save" width={17} height={17} />
          <Image
            src="/picture/hugeicons_notification-01.png"
            alt="Notification"
            width={17}
            height={17}
          />
          <Image src="/picture/User(icon).png" alt="User" width={17} height={17} />
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-62px)] flex-col md:flex-row">
        <aside className="flex w-full flex-col justify-between bg-[#FCEBCF] px-4 py-4 md:min-h-[calc(100vh-62px)] md:w-[205px]">
          <div>
            <h2 className="mb-5 text-[20px] font-medium">กรอง</h2>
            <div className="space-y-4">
              {sideFilters.map((filter) => (
                <button
                  key={filter.label}
                  type="button"
                  className="flex w-full items-center justify-between rounded-full bg-[#D7C5A7] px-5 py-3 text-left text-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                >
                  <span>{filter.label}</span>
                  <Image src={filter.icon} alt={filter.label} width={22} height={22} />
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="mt-8 flex items-center justify-between rounded-full bg-[#D7C5A7] px-5 py-3 text-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
          >
            <span>ออกจากระบบ</span>
            <Image src="/picture/tabler_logout.png" alt="Logout" width={22} height={22} />
          </button>
        </aside>

        <section className="flex-1 px-4 py-4 sm:px-5">
          <div className="mb-4 flex items-center gap-1.5 text-[13px] text-[#D8C4A7]">
            <Image
              src="/picture/iconamoon_arrow-left-2-light.png"
              alt="Back"
              width={13}
              height={13}
            />
            <span>ย้อนกลับ</span>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            <article className="w-full max-w-[182px] rounded-[23px] bg-[#FFEBCB] px-4 py-3 shadow-[2px_3px_6px_rgba(0,0,0,0.18)]">
              <div className="mb-4 flex items-start gap-3">
                <div className="h-[50px] w-[50px] rounded-full bg-gradient-to-b from-[#BABABA] to-[#7E7E7E]" />

                <div className="pt-1 leading-tight">
                  <h1 className="text-[14px] font-medium">ชื่อผู้ใช้</h1>
                  <div className="mt-1 flex items-center gap-[1px]">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Image
                        key={index}
                        src="/picture/material-symbols-light_star-rounded.png"
                        alt="Star"
                        width={10}
                        height={10}
                      />
                    ))}
                    <Image
                      src="/picture/material-symbols-light_star-outline-rounded.png"
                      alt="Star"
                      width={10}
                      height={10}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-[12px]">
                {contactRows.map((row) => (
                  <div key={row.label} className="flex items-center gap-2">
                    <Image src={row.icon} alt="" width={20} height={20} />
                    <span>{row.label}</span>
                  </div>
                ))}
              </div>
            </article>

            <div className="flex-1 pt-2">
              <div className="flex flex-wrap gap-4">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;

                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`min-w-[88px] rounded-full px-6 py-2 text-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.18)] transition ${
                        isActive
                          ? "bg-[#344663] text-[#FDF7EC]"
                          : "bg-[#D7C5A7] text-black"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
