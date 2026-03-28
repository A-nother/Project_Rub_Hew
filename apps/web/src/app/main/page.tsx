"use client";

import { useState } from "react";
import NavbarMain from "../components/navbarMain";
import Sidebar from "../components/sidebar";
import FilterChipsAndAdd from "../components/filterChipsAndAdd";
import CreatePostForm from "../components/createPostForm";

export default function HomePage() {
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <main className="min-h-screen bg-[#FFF8EC] text-[#D5C2A3]">
      <NavbarMain />

      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <section className="p-6 overflow-y-auto h-145">

            {/* 🔥 ส่ง function ไป */}
            <FilterChipsAndAdd onOpen={() => setOpenCreate(true)} />

            {/* 🔥 ตรงนี้สำคัญ */}
            {openCreate ? (
              <CreatePostForm onClose={() => setOpenCreate(false)} />
            ) : (
              <div>{/* post list เดิม */}</div>
            )}

          </section>
        </div>
      </div>
    </main>
  );
}