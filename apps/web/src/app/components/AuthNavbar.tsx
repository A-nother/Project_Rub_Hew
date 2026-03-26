import Image from "next/image";
import Link from "next/link";

export default function AuthNavbar() {
  return (
    <header className="flex h-20 items-center bg-[#2F4363] px-5">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/picture/Logo(Thin).png"
          alt="RUB-HEW"
          width={180}
          height={50}
          priority
        />
      </Link>
    </header>
  );
}