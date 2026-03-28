import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value ?? null;;

  if (!accessToken) {
    redirect("/login");
  }

  redirect("/main");
}