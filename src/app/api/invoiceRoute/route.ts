import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const invoiceSchema = z.object({
    invoiceName: z.string().min(1),
    invoiceNumber: z.coerce.number(),
    currency: z.enum(["INR", "USD"]),
    status: z.enum(["PAID", "PENDING"]),
    from: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        address: z.string().min(1)
    }),
    to: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        address: z.string().min(1)
    }),
    date: z.string().transform(str => new Date(str)).or(z.date()),
    dueDate: z.coerce.number().optional(),
    invoiceDescription: z.string().min(1),
    invoiceItemQuantity: z.coerce.number(),
    invoiceItemrate: z.coerce.number(),
    invoiceItemTotalAmount: z.coerce.number(),
    note: z.string().optional()

})

export async function POST(req: NextRequest) {

    try {
        const profile = await CurrentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await req.json();

        const result = invoiceSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(result.error.format(), { status: 400 })
        }

        const values = result.data;

        const invoiceCreate = await prisma.invoice.create({
            data: {
                invoiceName: values.invoiceName,
                invoiceNumber: values.invoiceNumber,
                currency: values.currency,
                fromName: values.from.name,
                fromEmail: values.from.email,
                fromAddress: values.from.address,
                toName: values.to.name,
                toEmail: values.to.email,
                toAddress: values.to.address,
                date: values.date,
                dueDate: values.dueDate ?? 0,
                note: values.note,
                invoiceItemTotalAmount: values.invoiceItemTotalAmount,
                invoiceDescription: values.invoiceDescription,
                invoiceItemQuantity: values.invoiceItemQuantity,
                invoiceItemrate: values.invoiceItemrate,
                userId: profile.id,
                status: values.status
            }
        })

        return NextResponse.json(invoiceCreate, { status: 200 })
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}