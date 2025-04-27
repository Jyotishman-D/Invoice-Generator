import { Sidebar } from "@/components/navigation/sidebar";
import { CurrentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function MainLayout({ children }: { children: ReactNode }) {

    const profile = await CurrentProfile();

    if (!profile) {
        return redirect("/login")
    }

    const isOnboarding = !profile.address || !profile.name

    if (isOnboarding) {
        return redirect("/onboarding")
    }

    return (
        <div className="min-h-screen w-full flex">
            <Sidebar name={profile.name} />

            <main className="flex-1 flex flex-col p-5 ml-[220px]">{children}</main>
        </div>
    );

}