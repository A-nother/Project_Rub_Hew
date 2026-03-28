"use client";

import { useState } from "react";
import { CATEGORIES } from "../constants/category";

type PostType = "Carrier" | "Request";

type ItemInput = {
  itemName: string;
  itemImageUrl: string;
  itemPrice: string;
};

export default function CreatePostForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [postType, setPostType] = useState<PostType>("Carrier");
  const [discription, setDiscription] = useState("");
  const [postCatagory, setPostCategory] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");

  const [items, setItems] = useState<ItemInput[]>([
    { itemName: "", itemImageUrl: "", itemPrice: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  function addItem() {
    setItems((prev) => [
      ...prev,
      { itemName: "", itemImageUrl: "", itemPrice: "" },
    ]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof ItemInput, value: string) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    const res = await fetch(`${apiUrl}/api/posts`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      discription,
      postType,
      postCatagory,
      postImageUrl,
      items,
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    console.log("success:", data);

    // 🔥 รีเซ็ต form
    setDiscription("");
    setPostImageUrl("");
    setItems([{ itemName: "", itemImageUrl: "", itemPrice: "" }]);

    // 🔥 ปิด form (ถ้ามี onClose)
    onClose?.();

  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาด");
  }
}

  async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url; // ⭐ URL รูป
}

  return (
    <section className="mx-auto max-w-5xl rounded-3xl bg-[#FFEED5] p-6 shadow-sm">
      <div className="flex justify-between px-1">
        <h2 className="mb-6 text-2xl font-bold text-black">สร้างโพสต์</h2>

        <button
        type="button"
        onClick={onClose}
        className="mb-4 rounded bg-red-500 px-4 py-1 text-black rounded-full"
        >
        ยกเลิก
        </button>
        </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            ประเภทโพสต์
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setPostType("Carrier")}
              className={`rounded-full px-5 py-2 text-sm font-medium shadow ${
                postType === "Carrier"
                  ? "bg-[#81CBC7] text-black"
                  : "bg-[#D5C2A3] text-black"
              }`}
            >
              รับฝากหิ้ว
            </button>

            <button
              type="button"
              onClick={() => setPostType("Request")}
              className={`rounded-full px-5 py-2 text-sm font-medium shadow ${
                postType === "Request"
                  ? "bg-[#EB7F45] text-black"
                  : "bg-[#D5C2A3] text-black"
              }`}
            >
              ฝากหิ้วของ
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            หมวดหมู่
          </label>
          <select
            value={postCatagory}
            onChange={(e) => setPostCategory(e.target.value)}
            className="w-full rounded-lg border p-2 text-black"
          >
          <option value="">เลือกหมวดหมู่</option>

          {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
          {cat}
          </option>
           ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            คำอธิบายโพสต์
          </label>
          <textarea
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            placeholder="เขียนรายละเอียดโพสต์"
            rows={4}
            className="w-full rounded-2xl border border-[#D5C2A3] px-4 py-3 text-black outline-none"
          />
        </div>

        <div>
            <label className="mb-2 block text-sm font-medium text-black">
              URL รูปโพสต์
            </label>
            <input
              type="file"
              className="underline decoration-[#2F4363] cursor-pointer"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setLoading(true);

                const url = await uploadImage(file);
                setPostImageUrl(url);

                setLoading(false);
              }}
            />

            {postImageUrl && (
              <img src={postImageUrl} className="mt-2 h-40 rounded" />
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-black">
                รายการสินค้า
              </label>

              <button
                type="button"
                onClick={addItem}
                className="rounded-full bg-[#81CBC7] px-4 py-2 text-sm font-medium text-black shadow"
              >
                + เพิ่มสินค้า
              </button>
            </div>

            {items.map((item, index) => (
              <div
                key={index}
                className="space-y-3 rounded-2xl border border-[#D5C2A3] p-4"
              >
                <div>
                  <label className="mb-1 block text-sm text-black">
                    ชื่อสินค้า
                  </label>
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) =>
                      updateItem(index, "itemName", e.target.value)
                    }
                    placeholder="ชื่อสินค้า"
                    className="w-full rounded-xl border border-[#D5C2A3] px-4 py-3 text-black outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-black">
                    URL รูปสินค้า
                  </label>
                  <input
                    type="file"
                    className="underline decoration-[#2F4363] cursor-pointer"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      setLoading(true);

                      const url = await uploadImage(file);
                      updateItem(index, "itemImageUrl", url);

                      setLoading(false);
                    }}
                  />

                  {item.itemImageUrl && (
                    <img src={item.itemImageUrl} className="mt-2 h-24 rounded" />
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm text-black">
                    ราคา
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={item.itemPrice}
                    onChange={(e) =>
                      updateItem(index, "itemPrice", e.target.value)
                    }
                    placeholder="ราคา"
                    className="w-full rounded-xl border border-[#D5C2A3] px-4 py-3 text-black outline-none"
                  />
                </div>

                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="rounded-full bg-[#F4E0D9] px-4 py-2 text-sm text-black shadow"
                  >
                    ลบสินค้านี้
                  </button>
                )}
              </div>
            ))}
          </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-[#2F4A73] px-6 py-3 text-sm font-medium text-white shadow disabled:opacity-60"
          >
            {loading ? "กำลังโพสต์..." : "โพสต์"}
          </button>

          {message && <p className="text-sm text-black">{message}</p>}
        </div>
      </form>
    </section>
  );
}