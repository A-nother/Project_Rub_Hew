import Image from "next/image";
import LogoThin from "./logo";

export default function NavbarMain() {
    return (
        <header className="flex h-20 justify-between items-center bg-[#2F4363] px-10">
           <span className="cursor-pointer"><LogoThin /></span>
           
        <div className="mx-4 hidden flex-1 justify-center md:flex">
            <div className="flex w-full max-w-2xl items-center rounded-full bg-white px-4 py-2 text-black shadow">
              <span className="mr-3 text-sm">
                <Image 
                    src="/picture/humbleicons_search.png"
                    alt="Search"
                    width={25}
                    height={25}
                />
              </span>
              <input
                type="text"
                placeholder="ค้นหา"
                className="font-thai w-full bg-transparent text-base outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 text-xl">
            <span className="cursor-pointer">
                <Image 
                    src="/picture/Save(icon).png"
                    alt="Save"
                    width={30}
                    height={30}
                />
            </span>
            <span className="cursor-pointer">
                <Image 
                    src="/picture/hugeicons_notification-01.png"
                    alt="Notification"
                    width={30}
                    height={30}
                />
            </span>
            <span className="cursor-pointer">
                <Image 
                    src="/picture/User(icon).png"
                    alt="User"
                    width={30}
                    height={30}
                />
            </span>
          </div>
        </header>
    );
}