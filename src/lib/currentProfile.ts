import { redirect } from "next/navigation";
import { auth } from "./auth";
import { prisma } from "./db";

export async function CurrentProfile() {

    const session = await auth();

    if (!session) {
        return redirect("/login")
    };

    const profile = await prisma.user.findUnique({
        where: {
            id: session?.user?.id
        }
    })

    return profile;
}