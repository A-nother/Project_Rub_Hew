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
  const [description, setDescription] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");

  const [items, setItems] = useState<ItemInput[]>([
    { itemName: "", itemImageUrl: "", itemPrice: "" },
  ]);

  const [loading, setLoading] = useState(false);
  
  // --- ส่วนที่เพิ่มเข้ามา: State สำหรับเช็คสถานะการโหลดแยกจุด ---
  const [isMainUploading, setIsMainUploading] = useState(false);
  const [uploadingItemIndexes, setUploadingItemIndexes] = useState<number[]>([]);
  // -------------------------------------------------------

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
    // ป้องกันการกดส่งถ้ากำลังโหลดรูปใดๆ อยู่
    if (isMainUploading || uploadingItemIndexes.length > 0) return;

    try {
      setLoading(true);
      const validItems = items.filter(
        (item) =>
          item.itemName &&
          item.itemImageUrl &&
          Number(item.itemPrice) > 0
      );

      const body: any = {
        description,
        postType,
        postCategory,
      };

      if (validItems.length > 0) body.items = validItems;
      if (postImageUrl) body.postImageUrl = postImageUrl;

      const res = await fetch(`${apiUrl}/api/posts`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }

      setDescription("");
      setPostImageUrl("");
      setItems([{ itemName: "", itemImageUrl: "", itemPrice: "" }]);
      onClose();
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
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
      { method: "POST", body: formData }
    );

    const data = await res.json();
    return data.secure_url;
  }

  return (
    <section className="mx-auto max-w-3xl rounded-3xl bg-[#FFF8EC] p-6 shadow-md border border-[#EADDC8]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#324B66] font-thainohead">สร้างโพสต์</h2>
        <button type="button" onClick={onClose} className="rounded-full bg-red-100 px-4 py-1 text-sm text-red-600 hover:bg-red-200 transition">
          ยกเลิก
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TYPE */}
        <div className="flex gap-3">
          <button type="button" onClick={() => setPostType("Carrier")} className={`rounded-full px-5 py-2 text-sm font-thainohead shadow-sm ${postType === "Carrier" ? "bg-[#81CBC7] text-white" : "bg-[#F3E8D3] text-[#324B66]"}`}>
            รับฝากหิ้ว
          </button>
          <button type="button" onClick={() => setPostType("Request")} className={`rounded-full px-5 py-2 text-sm font-thainohead shadow-sm ${postType === "Request" ? "bg-[#EB7F45] text-white" : "bg-[#F3E8D3] text-[#324B66]"}`}>
            ฝากหิ้วของ
          </button>
        </div>

        {/* CATEGORY */}
        <select value={postCategory} onChange={(e) => setPostCategory(e.target.value)} className="w-full rounded-xl border border-[#EADDC8] bg-[#FFF8EC] px-4 py-3 text-[#324B66] shadow-sm focus:ring-2 focus:ring-[#D5C2A3]">
          <option value="">เลือกหมวดหมู่</option>
          {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        {/* DESCRIPTION */}
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="เขียนรายละเอียด..." className="w-full rounded-xl border border-[#EADDC8] bg-[#FFF8EC] p-4 text-[#324B66]" />

        {/* POST IMAGE */}
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            className="file:rounded-full file:bg-[#D5C2A3] file:px-4 file:py-2 file:text-[#324B66]"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setIsMainUploading(true); // เริ่มโหลดรูปหลัก
              const url = await uploadImage(file);
              setPostImageUrl(url);
              setIsMainUploading(false); // โหลดเสร็จ
            }}
          />
          {/* เพิ่มการแสดงสถานะข้างหลัง input */}
          {isMainUploading && <span className="text-sm text-orange-500 animate-pulse">กำลังโหลด...</span>}
          {postImageUrl && !isMainUploading && <span className="text-green-600 font-bold">✅</span>}
        </div>

        {postImageUrl && <img src={postImageUrl} className="h-40 w-full rounded-xl object-cover shadow" />}

        {/* ITEMS */}
        <div className="space-y-4">
          <button type="button" onClick={addItem} className="rounded-full bg-[#D5C2A3] px-4 py-2 text-[#324B66]">
            + เพิ่มสินค้า
          </button>

          {items.map((item, index) => (
            <div key={index} className="rounded-xl border p-4 space-y-2">
              <input placeholder="ชื่อสินค้า" value={item.itemName} onChange={(e) => updateItem(index, "itemName", e.target.value)} className="w-full rounded-lg border p-2" />
              
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadingItemIndexes(prev => [...prev, index]); // เก็บ index ที่กำลังโหลด
                    const url = await uploadImage(file);
                    updateItem(index, "itemImageUrl", url);
                    setUploadingItemIndexes(prev => prev.filter(i => i !== index)); // โหลดเสร็จแล้วเอาออก
                  }}
                />
                {/* แสดงสถานะเฉพาะชิ้นนี้ */}
                {uploadingItemIndexes.includes(index) && <span className="text-sm text-orange-500 animate-pulse">กำลังโหลด...</span>}
                {item.itemImageUrl && !uploadingItemIndexes.includes(index) && <span className="text-green-600 font-bold">✅</span>}
              </div>

              <input type="number" placeholder="ราคา" value={item.itemPrice} onChange={(e) => updateItem(index, "itemPrice", e.target.value)} className="w-full rounded-lg border p-2" />

              {items.length > 1 && (
                <button type="button" onClick={() => removeItem(index)} className="text-red-500 text-sm">ลบสินค้า</button>
              )}
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading || isMainUploading || uploadingItemIndexes.length > 0}
          className={`w-full rounded-full py-3 text-white text-lg shadow transition ${
            (loading || isMainUploading || uploadingItemIndexes.length > 0) 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-[#2F4A73] hover:bg-[#243a5a]"
          }`}
        >
          {loading ? "กำลังโพสต์..." : "โพสต์"}
        </button>
      </form>
    </section>
  );
}