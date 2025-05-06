import { prisma } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Graph } from "./graph";
import { CurrentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";
import { format } from "date-fns";

export async function InvoiceGraph() {

    const profile = await CurrentProfile()

    if (!profile) {
        return redirect("/invoices")
    }

    const getInvoice = await prisma.invoice.findMany({
        where: {
            status: "PAID",
            userId: profile.id,
            createdAt: {
                lte: new Date(),
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
        },
        select: {
            createdAt: true,
            invoiceItemTotalAmount: true
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    const aggregateData = getInvoice.reduce((acc: { [key: string]: number }, curr) => {
        const date = format(curr.createdAt, "dd MMM");

        acc[date] = (acc[date] || 0) + curr.invoiceItemTotalAmount;

        return acc;
    }, {})

    const transformedData = Object.entries(aggregateData).map(([date, amount]) => (
        {
            date,
            amount,
            originalDate: new Date(date + ", " + new Date().getFullYear())
        }
    )).sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime()).map(({ date, amount }) => ({
        date,
        amount
    }))

    // console.log(transformedData);

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Paid Invoices</CardTitle>
                <CardDescription>Invoices which have been paid in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
                <Graph chartData={transformedData} />
            </CardContent>
        </Card>
    )
}