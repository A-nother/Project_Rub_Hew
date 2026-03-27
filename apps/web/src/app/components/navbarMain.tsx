"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoThin from "./logo";

export default function NavbarMain() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    }, []);

    const onUserClick = () => {
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        setMenuOpen((state) => !state);
      }
    };

    const logout = () => {
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      setMenuOpen(false);
      router.push("/");
    };

    const goProfile = () => {
      setMenuOpen(false);
      router.push("/profile");
    };

    const goSettings = () => {
      setMenuOpen(false);
      router.push("/settings");
    };

    return (
        <header className="relative flex h-20 justify-between items-center bg-[#2F4363] px-10">
           <span className="cursor-pointer"><LogoThin /></span>
           
        <div className="mx-4 hidden flex-1 justify-center md:flex">
            <div className="flex w-full max-w-2xl items-center rounded-full bg-white px-4 py-2 text-black shadow">
              <span className="mr-3 text-sm">
                <Image 
                    src="/picture/humbleicons_search.png"
                    alt="Search"
                    width={25}
                    height={25}
                />
              </span>
              <input
                type="text"
                placeholder="ค้นหา"
                className="font-thai w-full bg-transparent text-base outline-none"
              />
            </div>
          </div>

          <div className="relative flex items-center gap-6 text-xl">
            <span className="cursor-pointer">
                <Image 
                    src="/picture/Save(icon).png"
                    alt="Save"
                    width={30}
                    height={30}
                />
            </span>
            <span className="cursor-pointer">
                <Image 
                    src="/picture/hugeicons_notification-01.png"
                    alt="Notification"
                    width={30}
                    height={30}
                />
            </span>
            <button onClick={onUserClick} className="cursor-pointer p-1 rounded-full border border-transparent hover:border-white">
                <Image 
                    src="/picture/User(icon).png"
                    alt="User"
                    width={30}
                    height={30}
                />
            </button>

            {isLoggedIn && menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-lg border border-[#ccc] bg-white text-[#2F4363] shadow-lg">
                <button onClick={goProfile} className="block w-full px-4 py-2 text-left text-sm hover:bg-[#F5F5F5]">โปรไฟล์</button>
                <button onClick={goSettings} className="block w-full px-4 py-2 text-left text-sm hover:bg-[#F5F5F5]">ตั้งค่า</button>
                <button onClick={logout} className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-[#F5F5F5]">ออกจากระบบ</button>
              </div>
            )}
          </div>
        </header>
    );
}