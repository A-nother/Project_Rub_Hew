"use client";

import { useState } from "react";
import Image from "next/image";

export default function BackAndAdd() {
  return (
    <div className="flex items-start justify-between px-6 py-4 cursor-pointer">
      <span className="flex text-[26] text-black font-thainohead">
        <Image 
          src="/picture/iconamoon_arrow-left-2-light.png"
          alt="Back"
          width={24}
          height={24}
        />
        ย้อนกลับ
      </span>
    </div>
  );
}