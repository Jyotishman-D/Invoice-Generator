import OnBoardingForm from "@/components/onBoardingForm";
import { CurrentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";


export default async function OnboardingPage() {

    const profile = await CurrentProfile();

    if (!profile) {
        return redirect("/login")
    }

    return <OnBoardingForm name={profile.name} />;
}