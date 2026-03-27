import Image from "next/image";
import Link from "next/link";

export default function AuthNavbar() {
  return (
    <header className="flex h-20 items-center justify-between bg-[#2F4363] px-5">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/picture/Logo(Thin).png"
          alt="RUB-HEW"
          width={180}
          height={50}
          priority
        />
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-full border border-white bg-transparent px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#2F4363]"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#2F4363] shadow-sm transition hover:bg-[#D5C2A3]"
        >
          Register
        </Link>
      </div>
    </header>
  );
}