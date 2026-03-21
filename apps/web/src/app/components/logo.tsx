import Image from "next/image";

export default function LogoThin() {
    return (
        <div>
            <Image 
                src="/picture/Logo(Thin).png"
                alt="Logo"
                width={200}
                height={60}
           /> 
        </div>
    );
}