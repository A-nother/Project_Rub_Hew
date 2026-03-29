"use client";

import { useState } from "react";
import NavbarMain from "../components/navbarMain";
import Sidebar from "../components/sidebar";
import FilterChipsAndAdd from "../components/filterChipsAndAdd";
import CreatePostForm from "../components/createPostForm";
import PostList from "../components/postList"; // 🔹 import เข้ามาใหม่

export default function HomePage() {
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <main className="min-h-screen bg-[#FFF8EC] text-[#D5C2A3]">
      <NavbarMain />

      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <section className="p-6 overflow-y-auto h-145">
            <FilterChipsAndAdd onOpen={() => setOpenCreate(true)} />

            {openCreate ? (
              <CreatePostForm onClose={() => setOpenCreate(false)} />
            ) : (
              <PostList />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}