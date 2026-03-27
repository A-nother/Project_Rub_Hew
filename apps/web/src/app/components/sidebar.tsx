"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        router.push("/login");
        router.refresh();
    };

    return (
        <div>
            <aside className="min-h-[89vh] hidden w-[240px] flex-col justify-between bg-[#FFEED5] p-5 md:flex">
                <div>
                    <h2 className="mb-4 text-3xl font-thainohead text-black">กรอง</h2>
                    <div className="space-y-4">
                        <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between rounded-full bg-[#D5C2A3] px-4 py-2 text-left text-lg shadow-sm">
                            <span className="text-black font-thainohead">เวลา</span>
                            <span>
                                <Image
                                    src="/picture/bi_sort-down.png"
                                    alt="Filter"
                                    width={25}
                                    height={25}
                                />
                            </span>
                        </button>

                        {open && (
                            <div>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#2F4363]"
                                    />
                                    <span className="text-base font-thainohead text-black">ภายในวันนี้</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#2F4363]"
                                    />
                                    <span className="text-base font-thainohead text-black">ภายในสัปดาห์นี้</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#2F4363]"
                                    />
                                    <span className="text-base font-thainohead text-black">ภายในเดือนนี้</span>
                                </label>
                            </div>
                        )}

                        <button onClick={() => setOpen2(!open2)} className="flex w-full items-center justify-between rounded-full bg-[#D5C2A3] px-4 py-2 text-left text-lg shadow-sm">
                            <span className="text-black font-thainohead">หมวดหมู่</span>
                            <span>
                                <Image
                                    src="/picture/bi_sort-down.png"
                                    alt="Filter"
                                    width={25}
                                    height={25}
                                />
                            </span>
                        </button>

                        {open2 && (
                            <div className="overflow-y-auto h-60">
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#2F4363]"
                                    />
                                    <span className="text-base font-thainohead text-black">ของสะสม</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#2F4363]"
                                    />
                                    <span className="text-base font-thainohead text-black">หนังสือ</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#2F4363]"
                                    />
                                    <span className="text-base font-thainohead text-black">แฟชั่น</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#2F4363]"
                                    />
                                    <span className="text-base font-thainohead text-black">เครื่องสำอาง</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#2F4363]"
                                    />
                                    <span className="text-base font-thainohead text-black">อาหาร</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#2F4363]"
                                    />
                                    <span className="text-base font-thainohead text-black">อิเล็กทรอนิกส์</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#2F4363]"
                                    />
                                    <span className="text-base font-thainohead text-black">ของใช้ทั่วไป</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-[#2F4363]"
                                    />
                                    <span className="text-base font-thainohead text-black">อื่นๆ</span>
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center justify-between rounded-full bg-[#D5C2A3] px-4 py-2 text-lg shadow-sm"
                >
                    <span className="text-black font-thainohead">ออกจากระบบ</span>
                    <span>
                        <Image
                            src="/picture/tabler_logout.png"
                            alt="Logout"
                            width={25}
                            height={25}
                        />
                    </span>
                </button>
            </aside>
        </div>
    );
}
