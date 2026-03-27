import Link from "next/link";
import NavbarMain from "@/app/components/navbarMain";
import Sidebar from "@/app/components/sidebar";

function ShippingCard({
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
          action: "bg-[#F4B18B]",
        };

  return (
    <article
      className={`overflow-hidden rounded-[1.8rem] ${tone.shell} shadow-[4px_5px_0_rgba(0,0,0,0.13)] ring-1 ring-[#D2BFA2]`}
    >
      <div className={`h-10 ${tone.accent}`}>
        <div
          className={`ml-3 mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1 font-thainohead text-sm text-black ${tone.tag}`}
        >
          <span>{color === "blue" ? "▣" : "◫"}</span>
          <span>{title}</span>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-gradient-to-b from-[#BDBDBD] to-[#727272]" />
          <div>
            <p className="font-thainohead text-base text-black">ชื่อผู้ใช้</p>
            <p className="font-thainohead text-sm text-black">★★★★☆</p>
          </div>
        </div>

        <p className="font-thainohead text-xs text-[#4E4C49]">ข้อความ</p>

        {color === "blue" ? (
          <div className="flex items-end gap-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-[72px]">
                <div className="h-[88px] rounded-sm bg-gradient-to-b from-[#DBDFE4] to-[#787C84]" />
                <p className="mt-2 truncate font-thainohead text-[11px] text-[#4B4742]">
                  ชื่อสิ่งของ
                </p>
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
        ) : (
          <div className="h-[126px] rounded-sm bg-gradient-to-b from-[#DDDDDD] to-[#7E7E7E]" />
        )}
      </div>
    </article>
  );
}

function ShippingTimeline({
  activeStep,
  showActions,
}: {
  activeStep: 1 | 2 | 3;
  showActions: boolean;
}) {
  const dotClass = (step: 1 | 2 | 3) => {
    if (step < activeStep) return "bg-[#2F4363]";
    if (step === activeStep) return "bg-[#D9C39A]";
    return "border border-[#D9C39A] bg-white";
  };

  return (
    <div className="rounded-[1.8rem] bg-[#DDECF9] p-5 shadow-[4px_5px_0_rgba(0,0,0,0.13)] ring-1 ring-[#D2BFA2]">
      <div className="mb-5 flex items-center justify-between px-2">
        <div className={`h-7 w-7 rounded-full ${dotClass(1)}`} />
        <div className="h-px flex-1 bg-[#C8B79B]" />
        <div className={`h-7 w-7 rounded-full ${dotClass(2)}`} />
        <div className="h-px flex-1 bg-[#C8B79B]" />
        <div className={`h-7 w-7 rounded-full ${dotClass(3)}`} />
      </div>

      <div className="mb-6 flex justify-between gap-3 px-1 font-thainohead text-[10px] text-[#6D6357]">
        <span>ยื่นข้อเสนอแล้ว</span>
        <span>กำลังดำเนินการ</span>
        <span>ส่งของแล้ว</span>
      </div>

      {showActions ? (
        <>
          <button
            type="button"
            className="mb-6 h-10 w-full rounded-full bg-[#A6DBD9] font-thainohead text-sm text-black shadow-[0_3px_8px_rgba(0,0,0,0.12)]"
          >
            + เพิ่มหลักฐาน
          </button>

          <button
            type="button"
            className="h-14 w-full rounded-[1.2rem] bg-[#83D2CE] font-thainohead text-3xl text-black shadow-[0_3px_8px_rgba(0,0,0,0.14)]"
          >
            ส่งงาน
          </button>
        </>
      ) : null}
    </div>
  );
}

export default function NotificationsPage() {
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

          <div className="grid max-w-5xl gap-8 xl:grid-cols-2">
            <div className="space-y-4">
              <ShippingCard title="รับหิ้ว" color="blue" />
              <ShippingTimeline activeStep={2} showActions />
            </div>

            <div className="space-y-4">
              <ShippingCard title="ฝากหิ้ว" color="orange" />
              <ShippingTimeline activeStep={2} showActions={false} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
