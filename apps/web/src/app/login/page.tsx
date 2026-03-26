import AuthCard from "../components/AuthCard";
import AuthLogo from "../components/AuthLogo";
import AuthNavbar from "../components/AuthNavbar";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F9F2E7]">
      <AuthNavbar />

      <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2">
        <div className="flex justify-center md:justify-start">
          <AuthLogo size="large" />
        </div>

        <div className="flex justify-center md:justify-end">
          <AuthCard mode="login" />
        </div>
      </section>
    </main>
  );
}