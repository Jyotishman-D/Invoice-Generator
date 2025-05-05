import { CreateInvoice } from "@/components/createInvoice";
import { EditInvoice } from "@/components/editInvoice";
import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function EditCreateRoute({ params }: { params: { invoiceId: string } }) {

    const profile = await CurrentProfile();

    if (!profile) {
        return redirect("/login")
    }

    const data = await prisma.invoice.findUnique({
        where: {
            id: params.invoiceId,
            userId: profile.id
        }
    })

    if (!data) {
        return redirect("/invoices/create")
    }

    return (
        <div>
            <EditInvoice data={data} />
        </div>
    )
}