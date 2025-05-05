import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { emailClient } from "@/lib/mailtrap";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { invoiceId: string } }) {

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
                template_uuid: "db26c8d8-d159-4f4d-992a-619730302dc9",
                template_variables: {
                    "first_name": invoice.toName,
                    "company_info_name": "Invoice Generate",
                    "company_info_address": "Guwahati Azara",
                    "company_info_city": "Guwahati",
                    "company_info_zip_code": "781003",
                    "company_info_country": "India"
                }
            })

        return NextResponse.json({ success: true })

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", { status: 500 })
    }
}