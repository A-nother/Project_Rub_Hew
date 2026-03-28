"use client";

import { useState } from "react";

type FilterType = "all" | "carry" | "request";

export default function FilterChipsAndAdd({
  onOpen,
}: {
  onOpen: () => void;
}) {
  const [activeChip, setActiveChip] = useState<FilterType>("all");

  const baseClass =
    "rounded-full px-7 py-2 text-sm font-thainohead text-black shadow-xs shadow-black transition";
  const inactiveClass = "bg-[#D7C39D]";
  const activeClass = {
    all: "bg-[#2F4363] text-black",
    carry: "bg-[#85CCC7] text-black",
    request: "bg-[#EE7F47] text-black",
  };

  return (
    <div className="flex items-start justify-between px-6 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setActiveChip("all")}
          className={`${baseClass} ${
            activeChip === "all" ? activeClass.all : inactiveClass
          }`}
        >
          ทั้งหมด
        </button>

        <button
          type="button"
          onClick={() => setActiveChip("carry")}
          className={`${baseClass} ${
            activeChip === "carry" ? activeClass.carry : inactiveClass
          }`}
        >
          รับฝากหิ้ว
        </button>

        <button
          type="button"
          onClick={() => setActiveChip("request")}
          className={`${baseClass} ${
            activeChip === "request" ? activeClass.request : inactiveClass
          }`}
        >
          ฝากหิ้วของ
        </button>
      </div>

      <button
        onClick={onOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#CBBCA4] text-4xl text-black shadow-sm shadow-black"
      >
      +
      </button>
    </div>
  );
}