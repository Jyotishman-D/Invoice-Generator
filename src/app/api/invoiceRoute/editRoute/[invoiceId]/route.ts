import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { emailClient } from "@/lib/mailtrap";
import { CurrencyFormat } from "@/hooks/currency";

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
    date: z.coerce.date(),
    dueDate: z.coerce.number().optional(),
    invoiceDescription: z.string().min(1),
    invoiceItemQuantity: z.coerce.number(),
    invoiceItemrate: z.coerce.number(),
    invoiceItemTotalAmount: z.coerce.number(),
    note: z.string().optional()

})

export async function PATCH(req: NextRequest, { params }: { params: { invoiceId: string } }) {

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

        const invoiceUpdate = await prisma.invoice.update({
            where: {
                id: params.invoiceId,
                userId: profile.id,
            },
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
                status: values.status
            }
        });

        const sender = {
            email: "hello@demomailtrap.co",
            name: "Jyotishman Das",
        };
        const recipients = [
            {
                email: "jdas.random@gmail.com",
            }
        ];

        emailClient
            .send({
                from: sender,
                to: recipients,
                template_uuid: "26c78a70-8c6c-4ac9-b5e0-3dc633cf7db1",
                template_variables: {
                    "clientName": values.to.name,
                    "invoiceNumber": values.invoiceNumber,
                    "dueDate": values.date.toISOString(),
                    "totalAmount": CurrencyFormat({ amount: values.invoiceItemTotalAmount, currency: values.currency }),
                    "invoiceLink": `http://localhost:3000/api/invoice/${invoiceUpdate.id}`
                }
            })

        return NextResponse.json(invoiceUpdate, { status: 200 })
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}