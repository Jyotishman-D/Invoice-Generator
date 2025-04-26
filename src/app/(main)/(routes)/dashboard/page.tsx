import { auth } from "@/lib/auth";
import { CurrentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";

export default async function Dashboard() {

    const profile = await CurrentProfile();

    if (!profile) {
        return redirect("/login")
    }

    return (
        <div>
            {JSON.stringify(profile)}
        </div>
    )
}