import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const profileUpdateSchema = z.object({
    name: z.string().min(2).max(25),
    address: z.string().min(5).max(200)
});

export async function PATCH(req: NextRequest) {

    try {
        const profile = await CurrentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json();

        const result = profileUpdateSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(result.error.format(), { status: 400 })
        }

        const { name, address } = result.data;

        const upadteProfile = await prisma.user.update({
            where: {
                id: profile.id
            },
            data: {
                name,
                address
            }
        })

        return NextResponse.json(upadteProfile, { status: 200 })

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}