import NavbarMain from "../components/navbarMain";
import Sidebar from "../components/sidebar";
import FilterChipsAndAdd from "../components/filterChipsAndAdd";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF8EC] text-[#D5C2A3]">
      <NavbarMain />

      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <FilterChipsAndAdd />

          <section className="p-6">
            {/* content ตรงกลาง/การ์ดโพสต์ ใส่ตรงนี้ */}
          </section>
        </div>
      </div>
    </main>
  );
}