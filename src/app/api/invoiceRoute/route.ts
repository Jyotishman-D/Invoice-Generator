import { CurrencyFormat } from "@/hooks/currency";
import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { emailClient } from "@/lib/mailtrap";
import { invoiceSchema } from "@/lib/zod";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const profile = await CurrentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        };

        const body = await req.json();
        const result = invoiceSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(result.error.format(), { status: 400 })
        };

        const values = result.data;
        const invoice = await prisma.invoice.create({
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
        });

        const sender = {
            email: "hello@demomailtrap.co",
            name: "Jyotishmna das",
        };

        emailClient.send({
            from: sender,
            to: [{ email: "jdas.random@gmail.com" }],
            template_uuid: "1e53907f-a9d9-4cfa-8395-8e9266e36457",
            template_variables: {
                "clientName": values.to.name,
                "invoiceNumber": values.invoiceNumber,
                "dueDate": values.date.toISOString(),
                "totalAmount": CurrencyFormat({ amount: values.invoiceItemTotalAmount, currency: values.currency }),
                "invoiceLink": `http://localhost:3000/api/invoice/${invoice.id}`
            }
        });

        return NextResponse.json(invoice, { status: 200 })
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", { status: 500 })
    }
};