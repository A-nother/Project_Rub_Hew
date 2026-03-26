import Image from "next/image";

type AuthLogoProps = {
  size?: "small" | "large";
};

export default function AuthLogo({ size = "large" }: AuthLogoProps) {
  const isLarge = size === "large";

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/picture/Logo(Thick).png"
        alt="RUB-HEW Logo"
        width={isLarge ? 210 : 170}
        height={isLarge ? 260 : 200}
        priority
      />
    </div>
  );
}