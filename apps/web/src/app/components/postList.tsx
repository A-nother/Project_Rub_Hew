"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Post = {
  _id: string;
  description: string;
  postImageUrl: string | null;
  postType: "Carrier" | "Request";
  postCategory: string;
  crateAt: string;
  user: {
    _id: string;
    username: string;
    profileImageUrl: string;
    ratingAverage?: number;
  };
  items?: {
    itemName: string;
    itemImageUrl: string;
    itemPrice: number;
  }[];
};

const StarRating = ({ rating = 0 }: { rating?: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Image
        key={i}
        src="/picture/material-symbols-light_star-rounded.png"
        alt=""
        width={16}
        height={16}
        className={i <= rating ? "" : "opacity-30 grayscale"}
      />
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${apiUrl}/api/feed`, { credentials: "include" });
        const data = await res.json();
        if (res.ok) setPosts(data.posts);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [apiUrl]);

  if (loading) return <div className="text-center py-10">กำลังโหลด...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
      {posts.map((post) => {
        const isCarrier = post.postType === "Carrier";

        return (
          <article
            key={post._id}
            className={`relative rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.10)] flex flex-col overflow-hidden ${
              isCarrier ? "bg-[#E6F4F1]" : "bg-[#FEECE2]"
            }`}
          >
            {/* 1. Header — full width, rounded top corners only */}
            <div
              className={`w-full px-6 py-3 flex items-center gap-2 rounded-t-[32px] ${
                isCarrier ? "bg-[#81CBC7]" : "bg-[#EB7F45]"
              }`}
            >
              <Image
                src={
                  isCarrier
                    ? "/picture/ion_bag-outline.png"
                    : "/picture/mynaui_package.png"
                }
                alt=""
                width={22}
                height={22}
                className="brightness-0 invert"
              />
              <span className="text-white font-bold text-base">
                {isCarrier ? "รับฝากหิ้ว" : "ฝากหิ้วของ"}
              </span>
            </div>

            {/* 2. Body */}
            <div className="p-6 flex flex-col flex-1">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-5">
                <Image
                  src={post.user.profileImageUrl || "/picture/default-avatar.png"}
                  className="rounded-full bg-gray-300 object-cover"
                  alt=""
                  width={64}
                  height={64}
                />
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-[#324B66] text-base leading-tight">
                    {post.user.username}
                  </p>
                  <StarRating rating={post.user.ratingAverage} />
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <p className="text-[#324B66] text-xs font-semibold mb-1">ข้อความ</p>
                <p className="text-[#324B66] text-sm leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              {/* Visual Content — items (ถ้ามี) */}
              {post.items && post.items.length > 0 && (
                <div className="flex items-end gap-3 mt-2">
                  {post.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex flex-col w-[90px]">
                      <Image
                        src={item.itemImageUrl}
                        className="w-full h-[100px] object-cover rounded-xl bg-gray-300 mb-1"
                        alt=""
                        width={90}
                        height={100}
                      />
                      <p className="text-[11px] text-[#324B66] font-bold truncate">
                        {item.itemName}
                      </p>
                      <p className="text-[11px] text-[#324B66] opacity-60">
                        {item.itemPrice} บาท
                      </p>
                    </div>
                  ))}
                  {post.items.length > 3 && (
                    <div className="mb-8">
                      <button
                        className={`rounded-full px-4 py-2 text-[11px] font-bold text-[#324B66] ${
                          isCarrier ? "bg-[#81CBC7]/50" : "bg-[#EB7F45]/30"
                        }`}
                      >
                        เพิ่มเติม...
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Visual Content — postImageUrl (ถ้ามี) */}
              {post.postImageUrl && (
                <Image
                  src={post.postImageUrl}
                  className="w-full h-[180px] object-cover rounded-2xl bg-gray-300 mt-2"
                  alt=""
                  width={400}
                  height={180}
                />
              )}
            </div>

            {/* 3. Footer */}
            <div className="px-6 py-4 flex items-center gap-3">
              {/* Comment bar */}
              <div className="flex-1 h-9 bg-white rounded-full flex items-center px-4 gap-2 shadow-sm border border-white/80">
                <Image
                  src="/picture/mingcute_comment-line.png"
                  alt=""
                  width={16}
                  height={16}
                />
                <span className="text-[11px] text-[#324B66]">แสดงความคิดเห็น</span>
              </div>

              {/* Share */}
              <button className="flex items-center justify-center p-2 rounded-lg hover:bg-white/30 transition">
                <Image
                  src="/picture/fluent_share-24-regular.png"
                  alt=""
                  width={22}
                  height={22}
                />
              </button>

              {/* CTA button */}
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-transform active:scale-95 font-bold text-xs text-[#324B66] ${
                  isCarrier ? "bg-[#EB7F45]" : "bg-[#81CBC7]"
                }`}
              >
                <Image
                  src={
                    isCarrier
                      ? "/picture/mynaui_package.png"
                      : "/picture/ion_bag-outline.png"
                  }
                  alt=""
                  width={16}
                  height={16}
                  className="brightness-0"
                />
                {isCarrier ? "ยื่นข้อเสนอ" : "รับหิ้ว"}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}