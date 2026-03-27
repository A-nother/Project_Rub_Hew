import Link from "next/link";
import NavbarMain from "@/app/components/navbarMain";
import Sidebar from "@/app/components/sidebar";

function SavedPostCard({
  title,
  color,
}: {
  title: string;
  color: "blue" | "orange";
}) {
  const tone =
    color === "blue"
      ? {
          shell: "bg-[#DDECF9]",
          accent: "bg-[#82CEC9]",
          tag: "bg-[#A6DBD9]",
          action: "bg-[#83D2CE]",
        }
      : {
          shell: "bg-[#FFE2D4]",
          accent: "bg-[#F88442]",
          tag: "bg-[#FFA56F]",
          action: "bg-[#F88442]",
        };

  return (
    <article
      className={`overflow-hidden rounded-[1.8rem] ${tone.shell} shadow-[4px_5px_0_rgba(0,0,0,0.13)] ring-1 ring-[#D2BFA2]`}
    >
      <div className={`h-10 ${tone.accent}`}>
        <div className={`ml-3 mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1 font-thainohead text-sm text-black ${tone.tag}`}>
          <span>{color === "blue" ? "▣" : "◫"}</span>
          <span>{title}</span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-gradient-to-b from-[#BDBDBD] to-[#727272]" />
          <div>
            <p className="font-thainohead text-base text-black">ชื่อผู้ใช้</p>
            <p className="font-thainohead text-sm text-black">★★★★☆</p>
          </div>
        </div>

        <p className="font-thainohead text-xs text-[#4E4C49]">ข้อความ</p>

        <div className="flex items-end gap-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-[72px]">
              <div className="h-[88px] rounded-sm bg-gradient-to-b from-[#DBDFE4] to-[#787C84]" />
              <p className="mt-2 truncate font-thainohead text-[11px] text-[#4B4742]">ชื่อสิ่งของ</p>
              <p className="font-thainohead text-[10px] text-[#70665A]">999 บาท</p>
            </div>
          ))}
          <button
            type="button"
            className={`ml-auto rounded-full px-4 py-2 font-thainohead text-xs text-black shadow-[2px_2px_0_rgba(0,0,0,0.12)] ${tone.action}`}
          >
            เพิ่มเติม...
          </button>
        </div>

        {color === "orange" ? (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="rounded-full bg-[#D9C39A] px-4 py-1.5 font-thainohead text-xs text-black"
            >
              ปฏิเสธ
            </button>
            <button
              type="button"
              className="rounded-full bg-[#F88442] px-4 py-1.5 font-thainohead text-xs text-black"
            >
              ปฏิเสธ
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function ProposalList() {
  return (
    <div className="rounded-[1.8rem] bg-[#DDECF9] p-4 shadow-[4px_5px_0_rgba(0,0,0,0.13)] ring-1 ring-[#D2BFA2]">
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <article
            key={index}
            className="rounded-[1.3rem] bg-white/75 p-3 shadow-[2px_3px_0_rgba(0,0,0,0.1)]"
          >
            <div className="mb-2 flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-b from-[#BDBDBD] to-[#727272]" />
              <div>
                <p className="font-thainohead text-xs text-black">ชื่อผู้ใช้</p>
                <p className="font-thainohead text-[10px] text-black">★★★★☆</p>
              </div>
            </div>

            <p className="font-thainohead text-[11px] text-[#33435E]">
              ค่าบริการ : 999.00 บาท
            </p>
            <p className="font-thainohead text-[11px] text-[#33435E]">
              ค่าส่ง : 99.00 บาท
            </p>

            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                className="rounded-full bg-[#D9C39A] px-4 py-1.5 font-thainohead text-[11px] text-black"
              >
                ปฏิเสธ
              </button>
              <button
                type="button"
                className="rounded-full bg-[#83D2CE] px-4 py-1.5 font-thainohead text-[11px] text-black"
              >
                ยอมรับ
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function SavedPage() {
  return (
    <main className="min-h-screen bg-[#FFF8EC]">
      <NavbarMain />

      <div className="flex">
        <Sidebar />

        <section className="min-w-0 flex-1 px-6 py-5">
          <Link
            href="/"
            className="mb-4 inline-block font-thainohead text-sm text-[#D8C3A0]"
          >
            ‹ ย้อนกลับ
          </Link>

          <div className="grid max-w-5xl gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <SavedPostCard title="รับหิ้ว" color="blue" />
                <SavedPostCard title="ฝากหิ้ว" color="orange" />
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <SavedPostCard title="ฝากหิ้ว" color="orange" />
                <div />
              </div>
            </div>

            <ProposalList />
          </div>
        </section>
      </div>
    </main>
  );
}
