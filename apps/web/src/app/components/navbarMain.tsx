"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LogoThin from "./logo";

export default function NavbarMain() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !!window.localStorage.getItem("authToken");
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!window.localStorage.getItem("authToken"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const onUserClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setMenuOpen((state) => !state);
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

  const goNotifications = () => {
    router.push("/notifications");
  };

  const goSaved = () => {
    router.push("/saved");
  };

  const isNotificationsPage = pathname === "/notifications";
  const isSavedPage = pathname === "/saved";

  return (
    <header className="relative flex h-20 items-center justify-between bg-[#2F4363] px-10">
      <span className="cursor-pointer">
        <LogoThin />
      </span>

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
            className="font-thainohead w-full bg-transparent text-base outline-none"
          />
        </div>
      </div>

      <div className="relative flex items-center gap-6 text-xl">
        <button
          onClick={goSaved}
          className={`cursor-pointer rounded-full p-2 ${
            isSavedPage ? "border border-white" : "border border-transparent"
          }`}
          aria-label="Saved"
        >
          <Image
            src="/picture/Save(icon).png"
            alt="Save"
            width={30}
            height={30}
          />
        </button>

        <button
          onClick={goNotifications}
          className={`cursor-pointer rounded-full p-2 ${
            isNotificationsPage ? "border border-white" : "border border-transparent"
          }`}
          aria-label="Notifications"
        >
          <Image
            src="/picture/hugeicons_notification-01.png"
            alt="Notification"
            width={30}
            height={30}
          />
        </button>

        <button
          onClick={onUserClick}
          className="cursor-pointer rounded-full border border-transparent p-1 hover:border-white"
          aria-label="User"
        >
          <Image
            src="/picture/User(icon).png"
            alt="User"
            width={30}
            height={30}
          />
        </button>

        {isLoggedIn && menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-lg border border-[#ccc] bg-white text-[#2F4363] shadow-lg">
            <button
              onClick={goProfile}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-[#F5F5F5]"
            >
              โปรไฟล์
            </button>
            <button
              onClick={goSettings}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-[#F5F5F5]"
            >
              ตั้งค่า
            </button>
            <button
              onClick={logout}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-[#F5F5F5]"
            >
              ออกจากระบบ
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
