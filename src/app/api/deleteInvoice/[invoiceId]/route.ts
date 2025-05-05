import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { invoiceId: string } }) {

    try {

        const profile = await CurrentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 404 })
        }

        const invoice = await prisma.invoice.findUnique({
            where: {
                id: params.invoiceId,
                userId: profile.id
            }
        })

        if (!invoice) {
            return new NextResponse("Invoice not found", { status: 404 })
        }

        const deleteInvoice = await prisma.invoice.delete({
            where: {
                id: params.invoiceId,
                userId: profile.id
            }
        })

        return NextResponse.json(deleteInvoice, { status: 200 })

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}