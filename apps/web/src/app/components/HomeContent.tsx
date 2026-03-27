"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FilterChipsAndAdd from "./filterChipsAndAdd";
import { getStoredPosts, type PostType, type StoredPost } from "@/lib/post-store";

type FilterType = "all" | PostType;

type ThemeConfig = {
  shell: string;
  tag: string;
  accent: string;
  action: string;
  image: string;
  label: string;
  actionText: string;
  moreButton: string;
};

type OfferItem = {
  id: string;
  name: string;
  price: string;
  note: string;
  quantity: number;
};

const cardTheme: Record<PostType, ThemeConfig> = {
  carry: {
    shell: "bg-[#DDECF9]",
    tag: "bg-[#A6DBD9]",
    accent: "bg-[#82CEC9]",
    action: "bg-[#83D2CE]",
    image: "from-[#DBDFE4] to-[#787C84]",
    label: "รับหิ้ว",
    actionText: "ยืนยันเสนอ",
    moreButton: "bg-[#83D2CE]",
  },
  request: {
    shell: "bg-[#FFE2D4]",
    tag: "bg-[#FFA56F]",
    accent: "bg-[#F88442]",
    action: "bg-[#83D2CE]",
    image: "from-[#DDDDDD] to-[#7E7E7E]",
    label: "ฝากหิ้ว",
    actionText: "ยืนยันเสนอ",
    moreButton: "bg-[#F4B18B]",
  },
};

const formatDeadline = (value: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getAuthorName = (post: StoredPost) => {
  if (post.authorName?.trim()) return post.authorName.trim();
  if (post.contact.trim()) return post.contact.trim().split(/[ @]/)[0];
  return "ผู้ใช้";
};

const getDisplayItems = (post: StoredPost, count = 3) => {
  const category = post.category.trim() || "สินค้า";
  const fallbackTitle = post.title.trim() || `${category} ชิ้นหลัก`;
  const items = [fallbackTitle];
  for (let index = 1; index < count; index += 1) {
    items.push(`${category} ชิ้นที่ ${index}`);
  }
  return items;
};

const createRequestOfferItems = (post: StoredPost): OfferItem[] =>
  getDisplayItems(post, 3).map((item, index) => ({
    id: `${post.id}-${index}`,
    name: item,
    price: post.budget || "999 บาท",
    note: "ข้อมูลเพิ่มเติม...",
    quantity: 1,
  }));

function PostCard({
  post,
  onOpen,
}: {
  post: StoredPost;
  onOpen: (post: StoredPost) => void;
}) {
  const theme = cardTheme[post.type];
  const items = getDisplayItems(post);
  const isCarry = post.type === "carry";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(post)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(post);
        }
      }}
      className={`overflow-hidden rounded-[2rem] ${theme.shell} cursor-pointer shadow-[4px_6px_0_rgba(0,0,0,0.15)] ring-1 ring-[#D1BDA0] transition hover:-translate-y-1`}
    >
      <div className={`h-10 ${theme.accent}`}>
        <div className={`ml-3 mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1 font-thainohead text-sm text-black ${theme.tag}`}>
          <span>{post.type === "carry" ? "▣" : "◫"}</span>
          <span>{theme.label}</span>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-gradient-to-b from-[#BDBDBD] to-[#727272]" />
          <div className="min-w-0">
            <p className="truncate font-thainohead text-lg text-black">{getAuthorName(post)}</p>
            <p className="font-thainohead text-sm text-black">★★★★☆</p>
          </div>
        </div>

        <div>
          <h2 className="font-thainohead text-xl text-black">{post.title}</h2>
          <p className="mt-2 line-clamp-3 whitespace-pre-line font-thainohead text-sm text-[#4E4C49]">{post.detail}</p>
        </div>

        <div className={`${isCarry ? "h-40 rounded-[1.4rem]" : "h-44 rounded-sm"} bg-gradient-to-br ${theme.image}`} />

        <div className="flex flex-wrap items-center gap-2 font-thainohead text-xs text-[#5A5147]">
          <span className="rounded-full bg-white/70 px-3 py-1">{post.location}</span>
          <span className="rounded-full bg-white/70 px-3 py-1">{formatDeadline(post.deadline)}</span>
          <span className="rounded-full bg-white/70 px-3 py-1">{post.category}</span>
        </div>

        {isCarry ? (
          <div className="flex flex-wrap items-end gap-3">
            {items.map((item, index) => (
              <div key={`${post.id}-${item}-${index}`} className="w-[88px]">
                <div className={`h-[88px] rounded-sm bg-gradient-to-b ${theme.image}`} />
                <p className="mt-2 truncate font-thainohead text-sm text-[#4B4742]">{item}</p>
                <p className="font-thainohead text-xs text-[#70665A]">{post.budget}</p>
              </div>
            ))}
            <button type="button" className={`ml-auto rounded-full px-4 py-2 font-thainohead text-sm text-black shadow-[2px_3px_0_rgba(0,0,0,0.12)] ${theme.moreButton}`}>
              เพิ่มเติม...
            </button>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="min-w-[146px] rounded-full bg-[#FFF3EE] px-4 py-2 text-left font-thainohead text-sm text-black">
            แสดงความคิดเห็น
          </button>
          <button type="button" className="rounded-full bg-white/70 px-4 py-2 font-thainohead text-sm text-black">
            แชร์
          </button>
          <button type="button" className={`ml-auto rounded-full px-5 py-2 font-thainohead text-sm text-black shadow-[2px_3px_0_rgba(0,0,0,0.14)] ${theme.action}`}>
            {theme.actionText}
          </button>
        </div>
      </div>
    </article>
  );
}

function CarryOfferPanel({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [serviceFee, setServiceFee] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const theme = cardTheme.carry;

  return (
    <div className="rounded-[2rem] bg-[#DDECF9] shadow-[4px_8px_18px_rgba(0,0,0,0.2)] lg:absolute lg:right-6 lg:top-20 lg:w-[28rem]">
      <div className={`flex items-center justify-between rounded-t-[2rem] px-4 py-3 ${theme.accent}`}>
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1 font-thainohead text-sm text-black ${theme.tag}`}>
          <span>▣</span>
          <span>ฝากหิ้ว</span>
        </div>
        <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-3xl leading-none text-black" aria-label="ปิดฟอร์มยื่นข้อเสนอ">
          ×
        </button>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <label className="mb-2 block font-thainohead text-xl text-black">ค่าบริการ</label>
          <input value={serviceFee} onChange={(event) => setServiceFee(event.target.value)} placeholder="ค่าบริการ" className="h-14 w-full rounded-full bg-white px-5 font-thainohead text-black shadow-[0_3px_8px_rgba(0,0,0,0.18)] outline-none" />
        </div>
        <div>
          <label className="mb-2 block font-thainohead text-xl text-black">ค่าขนส่ง</label>
          <input value={shippingFee} onChange={(event) => setShippingFee(event.target.value)} placeholder="ค่าขนส่ง" className="h-14 w-full rounded-full bg-white px-5 font-thainohead text-black shadow-[0_3px_8px_rgba(0,0,0,0.18)] outline-none" />
        </div>
        <div className="flex justify-end pt-6">
          <button type="button" onClick={onConfirm} className={`rounded-full px-6 py-3 font-thainohead text-sm text-black shadow-[2px_3px_0_rgba(0,0,0,0.14)] ${theme.action}`}>
            ยืนยันเสนอ
          </button>
        </div>
      </div>
    </div>
  );
}

function RequestOfferPanel({
  post,
  onClose,
  onConfirm,
}: {
  post: StoredPost;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const theme = cardTheme.request;
  const [items, setItems] = useState<OfferItem[]>(() => createRequestOfferItems(post));

  const updateQuantity = (id: string, delta: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const addItem = () => {
    setItems((current) => [
      ...current,
      {
        id: `${post.id}-extra-${current.length + 1}`,
        name: `${post.category || "สินค้า"} เพิ่มเติม`,
        price: post.budget || "999 บาท",
        note: "ข้อมูลเพิ่มเติม...",
        quantity: 1,
      },
    ]);
  };

  return (
    <div className="max-h-[80vh] overflow-hidden rounded-[2rem] bg-[#FFE2D4] shadow-[4px_8px_18px_rgba(0,0,0,0.2)] lg:absolute lg:right-6 lg:top-[-0.25rem] lg:w-[29rem]">
      <div className={`flex items-center justify-between rounded-t-[2rem] px-4 py-3 ${theme.accent}`}>
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1 font-thainohead text-sm text-black ${theme.tag}`}>
          <span>◫</span>
          <span>รับหิ้ว</span>
        </div>
        <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-3xl leading-none text-black" aria-label="ปิดฟอร์มยื่นข้อเสนอ">
          ×
        </button>
      </div>

      <div className="max-h-[calc(80vh-72px)] space-y-5 overflow-y-auto p-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <div className={`h-[72px] w-[72px] rounded-sm bg-gradient-to-b ${theme.image}`} />
            <div className="min-w-0 flex-1 font-thainohead text-black">
              <p className="truncate text-base">{item.name}</p>
              <p className="text-sm">{item.price}</p>
              <p className="text-xs text-[#5D5347]">{item.note}</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => updateQuantity(item.id, -1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9C39A] text-black shadow-[0_2px_5px_rgba(0,0,0,0.15)]">
                -
              </button>
              <div className="flex h-9 w-11 items-center justify-center rounded-full bg-white text-sm text-black shadow-[0_2px_5px_rgba(0,0,0,0.15)]">
                {item.quantity}
              </div>
              <button type="button" onClick={() => updateQuantity(item.id, 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9C39A] text-black shadow-[0_2px_5px_rgba(0,0,0,0.15)]">
                +
              </button>
            </div>
          </div>
        ))}

        <button type="button" onClick={addItem} className="flex h-12 w-full items-center justify-center rounded-full bg-[#FFA56F] font-thainohead text-base text-black shadow-[0_3px_8px_rgba(0,0,0,0.18)]">
          + เพิ่มของ
        </button>

        <div className="flex justify-end pt-6">
          <button type="button" onClick={onConfirm} className={`rounded-full px-6 py-3 font-thainohead text-sm text-black shadow-[2px_3px_0_rgba(0,0,0,0.14)] ${theme.action}`}>
            ยืนยันเสนอ
          </button>
        </div>
      </div>
    </div>
  );
}

function ExpandedPost({ post, onClose }: { post: StoredPost; onClose: () => void }) {
  const router = useRouter();
  const theme = cardTheme[post.type];
  const items = getDisplayItems(post, 6);
  const [isOfferOpen, setIsOfferOpen] = useState(false);

  const handleConfirmOffer = () => {
    router.push("/offers/success");
  };

  return (
    <article className={`overflow-hidden rounded-[2rem] ${theme.shell} shadow-[4px_6px_0_rgba(0,0,0,0.15)] ring-1 ring-[#D1BDA0]`}>
      <div className={`flex items-center justify-between px-3 py-3 ${theme.accent}`}>
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1 font-thainohead text-sm text-black ${theme.tag}`}>
          <span>{post.type === "carry" ? "▣" : "◫"}</span>
          <span>{theme.label}</span>
        </div>
        <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-3xl leading-none text-black" aria-label="ปิดรายละเอียดโพสต์">
          ×
        </button>
      </div>

      <div className="relative space-y-6 p-5">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-b from-[#BDBDBD] to-[#727272]" />
          <div className="min-w-0">
            <p className="truncate font-thainohead text-xl text-black">{getAuthorName(post)}</p>
            <p className="font-thainohead text-sm text-black">★★★★☆</p>
          </div>
        </div>

        <div>
          <h2 className="font-thainohead text-2xl text-black">{post.title}</h2>
          <p className="mt-3 whitespace-pre-line font-thainohead text-sm text-[#4E4C49]">{post.detail}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-thainohead text-xs text-[#5A5147]">
          <span className="rounded-full bg-white/70 px-3 py-1">{post.location}</span>
          <span className="rounded-full bg-white/70 px-3 py-1">{formatDeadline(post.deadline)}</span>
          <span className="rounded-full bg-white/70 px-3 py-1">{post.category}</span>
          <span className="rounded-full bg-white/70 px-3 py-1">{post.contact}</span>
        </div>

        {post.type === "request" ? (
          <div className={isOfferOpen ? "lg:pr-[30rem]" : ""}>
            <div className={`h-56 rounded-sm bg-gradient-to-br ${theme.image}`} />
          </div>
        ) : null}

        {post.type === "carry" ? (
          <div className="flex flex-wrap gap-4">
            {items.map((item, index) => (
              <div key={`${post.id}-expanded-${item}-${index}`} className="w-[72px]">
                <div className={`h-[84px] rounded-sm bg-gradient-to-b ${theme.image}`} />
                <p className="mt-2 truncate font-thainohead text-sm text-[#4B4742]">{item}</p>
                <p className="font-thainohead text-xs text-[#70665A]">{post.budget}</p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="min-w-[170px] rounded-full bg-[#FFF3EE] px-4 py-2 text-left font-thainohead text-sm text-black">
            แสดงความคิดเห็น
          </button>
          <button type="button" className="rounded-full bg-white/70 px-4 py-2 font-thainohead text-sm text-black">
            แชร์
          </button>
          <button type="button" onClick={() => setIsOfferOpen(true)} className={`ml-auto rounded-full px-5 py-2 font-thainohead text-sm text-black shadow-[2px_3px_0_rgba(0,0,0,0.14)] ${theme.action}`}>
            {theme.actionText}
          </button>
        </div>

        {isOfferOpen ? (
          post.type === "request" ? (
            <CarryOfferPanel onClose={() => setIsOfferOpen(false)} onConfirm={handleConfirmOffer} />
          ) : (
            <RequestOfferPanel post={post} onClose={() => setIsOfferOpen(false)} onConfirm={handleConfirmOffer} />
          )
        ) : null}
      </div>
    </article>
  );
}

export default function HomeContent() {
  const [activeChip, setActiveChip] = useState<FilterType>("all");
  const [posts, setPosts] = useState<StoredPost[]>(() => getStoredPosts());
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    const syncPosts = () => setPosts(getStoredPosts());
    window.addEventListener("storage", syncPosts);
    return () => window.removeEventListener("storage", syncPosts);
  }, []);

  const filteredPosts =
    activeChip === "all" ? posts : posts.filter((post) => post.type === activeChip);
  const selectedPost = filteredPosts.find((post) => post.id === selectedPostId) ?? null;

  return (
    <div className="flex-1">
      <FilterChipsAndAdd
        activeChip={activeChip}
        onChipChange={(filter) => {
          setActiveChip(filter);
          setSelectedPostId(null);
        }}
      />

      <section className="p-6">
        {filteredPosts.length === 0 ? (
          <div className="rounded-[2rem] border border-[#D8C7AB] bg-[#FFF4E4] p-10 text-center text-black shadow-[4px_6px_0_rgba(0,0,0,0.12)]">
            <h2 className="font-thainohead text-3xl">ยังไม่มีโพสต์ในหมวดนี้</h2>
            <p className="mt-2 font-thainohead text-lg text-[#645748]">
              กดปุ่ม + เพื่อสร้างโพสต์รับหิ้วหรือฝากหิ้ว แล้วโพสต์จะขึ้นเป็นการ์ดรูปแบบนี้ตรงหน้าแรก
            </p>
          </div>
        ) : selectedPost ? (
          <ExpandedPost post={selectedPost} onClose={() => setSelectedPostId(null)} />
        ) : (
          <div className="grid gap-7 xl:grid-cols-2">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onOpen={(currentPost) => setSelectedPostId(currentPost.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
