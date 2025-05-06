import { prisma } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CurrentProfile } from "@/lib/currentProfile";
import { redirect } from "next/navigation";
import { CurrencyFormat } from "@/hooks/currency";

export async function RecentInvoices() {

    const profile = await CurrentProfile()

    if (!profile) {
        return redirect("/invoices")
    }


    const data = await prisma.invoice.findMany({
        where: {
            userId: profile.id
        },
        select: {
            id: true,
            toName: true,
            toEmail: true,
            invoiceItemTotalAmount: true,
            currency: true
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 9
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {data.map((item) => (
                    <div className="flex items-center gap-4" key={item.id}>
                        <Avatar>
                            <AvatarFallback>{item.toName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium leading-none">{item.toName}</p>
                            <p className="text-muted-foreground text-sm">{item.toEmail}</p>
                        </div>
                        <div className="font-medium text-sm ml-auto">
                            +{CurrencyFormat({amount: item.invoiceItemTotalAmount, currency: item.currency as any})}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}