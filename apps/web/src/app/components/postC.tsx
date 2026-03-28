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
              
            </article>
        </div>
    );
}