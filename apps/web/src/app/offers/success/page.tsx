import Image from "next/image";
import Link from "next/link";
import NavbarMain from "@/app/components/navbarMain";

export default function OfferSuccessPage() {
  return (
    <main className="min-h-screen bg-[#FFF8EC]">
      <NavbarMain />

      <section className="flex min-h-[calc(100vh-80px)] items-start justify-center px-6 py-12">
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          <h1 className="font-thainohead text-5xl text-black">
            ส่งข้อเสนอของคุณแล้ว!
          </h1>

          <div className="mt-4">
            <Image
              src="/picture/Logo(Thick).png"
              alt="RUB-HEW"
              width={220}
              height={220}
              priority
            />
          </div>

          <Link
            href="/"
            className="mt-2 rounded-full bg-[#D9C39A] px-12 py-4 font-thainohead text-2xl text-black shadow-[0_4px_10px_rgba(0,0,0,0.16)]"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </section>
    </main>
  );
}
