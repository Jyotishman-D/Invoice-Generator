import { Navbar } from "@/components/landingPage/navbar";
import { CurrentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";

export default async function Home() {

  const profile = await CurrentProfile();

  if (profile) {
    return redirect("/dashboard")
  }
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
    </main>
  );
}
