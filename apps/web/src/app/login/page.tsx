import NavbarLR from "../components/navbarLR";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FFF8EC]">
      <NavbarLR />

      {/* ส่วนเนื้อหาหลัก จัดให้อยู่กึ่งกลางหน้าจอ */}
      <div className="flex-1 flex items-center justify-center p-8">
        
        {/* Container สำหรับแบ่ง 2 ฝั่ง (ซ้าย-ขวา) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 w-full max-w-5xl">
          
          {/* โลโก้ */}
          <div className="flex flex-col items-center">
            <img 
              src="/picture/Logo(Thick).png" 
              alt="RUB-HEW Logo" 
              className="w-64 h-64 object-contain mb-4"
            />
          </div>

          {/* ฝั่งขวา: ฟอร์มล็อคอิน */}
          <div className="w-full max-w-sm">
            <h2 className="font-thainohead text-2xl text-[#324B66] mb-6 font-bold">
              เข้าสู่ระบบ
            </h2>

            <form className="flex flex-col gap-5">
              {/* Input: ชื่อผู้ใช้/อีเมล */}
              <input
                type="text"
                placeholder="ชื่อผู้ใช้/อีเมล"
                className="font-thainohead w-full px-6 py-3 rounded-full bg-white shadow-md border-transparent focus:outline-none focus:ring-2 focus:ring-[#D5C2A3] text-gray-700 placeholder-gray-400"
              />

              {/* Input: รหัสผ่าน */}
              <input
                type="password"
                placeholder="รหัสผ่าน"
                className="font-thainohead w-full px-6 py-3 rounded-full bg-white shadow-md border-transparent focus:outline-none focus:ring-2 focus:ring-[#D5C2A3] text-gray-700 placeholder-gray-400"
              />

              {/* ปุ่ม: เข้าสู่ระบบ */}
              <button
                type="button"
                className="font-thainohead w-full mt-2 py-3 rounded-full bg-[#D8C7A8] text-[#324B66] text-lg hover:bg-[#c9b796] transition-colors shadow-md"
              >
                เข้าสู่ระบบ
              </button>

              {/* เส้นแบ่ง "หรือ" */}
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="px-4 text-gray-500 text-sm">หรือ</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>

              {/* ปุ่ม: ลงทะเบียน */}
              <button
                type="button"
                className="font-thainohead font-thainohead w-full py-3 rounded-full bg-[#D8C7A8] text-[#324B66] text-lg hover:bg-[#c9b796] transition-colors shadow-md"
              >
                ลงทะเบียน
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}