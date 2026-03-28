import Image from "next/image";

export default function LogoThick() {
    return (
        <div>
            <Image 
                src="/picture/Logo(Thick).png"
                alt="Logo"
                width={220}
                height={220}
           /> 
        </div>
    );
}