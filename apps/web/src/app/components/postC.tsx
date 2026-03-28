import Image from "next/image";

export default function postC() {
    return (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <article className="rounded-[28px] border border-[#C9D2D8] bg-[#DCE8F1] shadow-md">
              <div className="flex items-center rounded-t-[28px] bg-[#81CBC7] px-4 py-3">
                <div className="rounded-full bg-[#BDE9E5] px-4 py-2 text-sm font-semibold">
                  <span>
                    <Image 
                      src="/picture/ion_bag-outline.png"
                      alt="LogoC"
                      width={420}
                      height={420}
                    />
                  </span>
                  รับฝากหิ้ว
                </div>
              </div>
              
              <div className="p-4">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-b from-[#BDBDBD] to-[#7D7D7D]" />
                    <div>
                      <p className="font-medium">ชื่อผู้ใช้</p>
                      <p className="text-sm">★★★★☆</p>
                    </div>
                  </div>
                  
                  <p className="mb-6 text-sm">ข้อความ</p>

                  <div className="mb-6 flex flex-wrap gap-3">
                    {leftCards.map((item) => (
                      <div key={item.id} className="w-[92px]">
                        <div className="mb-2 h-[120px] rounded-sm bg-gradient-to-b from-[#D2D2D2] to-[#8A8A8A]" />
                        <p className="text-xs">{item.title}</p>
                        <p className="text-xs text-[#555]">{item.price}</p>
                      </div>
                    ))}

                    <button className="mt-7 h-fit rounded-full bg-[#81CBC7] px-5 py-2 text-sm font-medium shadow">
                      เพิ่มเติม...
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button className="rounded-full bg-[#F5E7E2] px-4 py-2 text-sm shadow">
                      💬 แสดงความคิดเห็น
                    </button>
                    <button className="rounded-full bg-[#F5E7E2] px-3 py-2 text-sm shadow">
                      🔗
                    </button>
                    <button className="rounded-full bg-[#F28C52] px-5 py-2 text-sm font-medium shadow">
                      📦 ยื่นข้อเสนอ
                    </button>
                  </div>
                </div>
            </article>
        </div>
    );
}