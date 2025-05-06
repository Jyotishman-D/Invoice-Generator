import { CurrentProfile } from "@/lib/currentProfile";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { CurrencyFormat } from "@/hooks/currency";

async function getData(userId: string) {
    const [data, openInvoices, paidInvoices] = await Promise.all([
        prisma.invoice.findMany({
            where: {
                userId: userId
            },
            select: {
                invoiceItemTotalAmount: true
            }
        }),
        prisma.invoice.findMany({
            where: {
                userId: userId,
                status: "PENDING"
            },
            select: {
                id: true
            }
        }),
        prisma.invoice.findMany({
            where: {
                userId: userId,
                status: "PAID"
            },
            select: {
                id: true,
            }
        }),
    ])

    return {
        data,
        openInvoices,
        paidInvoices
    }
}

export async function DashboardBlocks() {

    const profile = await CurrentProfile();

    if (!profile) {
        return redirect("/login")
    }

    const { data, openInvoices, paidInvoices } = await getData(profile.id)

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="text-xl font-bold">{CurrencyFormat({amount: data.reduce((acc, invoice) => acc + invoice.invoiceItemTotalAmount, 0), currency: "INR"})}</h2>
                    <p className="text-xs text-muted-foreground">Based on the last 30 days</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Total Invoices Issued</CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="text-xl font-bold">+{data.length}</h2>
                    <p className="text-xs text-muted-foreground">Total Invoices Issued</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Paid Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="text-xl font-bold">+{paidInvoices.length}</h2>
                    <p className="text-xs text-muted-foreground">Total Invoices which has been paid</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Pending Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="text-xl font-bold">+{openInvoices.length}</h2>
                    <p className="text-xs text-muted-foreground">Invoices which haven't been paid</p>
                </CardContent>
            </Card>
        </div>
    )
}