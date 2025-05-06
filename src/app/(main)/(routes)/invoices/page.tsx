import { InvoiceDropdown } from "@/components/invoiceDropdown";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CurrencyFormat } from "@/hooks/currency";
import { CurrentProfile } from "@/lib/currentProfile";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Invoices() {

    const profile = await CurrentProfile();

    if (!profile) {
        return redirect("/login")
    }

    const invoices = await prisma.invoice.findMany({
        where: {
            userId: profile.id
        },
        select: {
            id: true,
            toName: true,
            invoiceItemTotalAmount: true,
            status: true,
            invoiceNumber: true,
            currency: true,
            date: true,
            createdAt: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
                        <CardDescription>Manage your invoices here</CardDescription>
                    </div>
                    <Link href="/invoices/create" className={buttonVariants()}>
                        <Plus className="w-4 h-4" />
                        Create Invoice
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-end">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell>{invoice.invoiceNumber}</TableCell>
                                <TableCell>{invoice.toName}</TableCell>
                                <TableCell>{CurrencyFormat({
                                    amount: invoice.invoiceItemTotalAmount,
                                    currency: invoice.currency as any
                                })}</TableCell>
                                <TableCell>
                                    <Badge>{invoice.status}</Badge>
                                </TableCell>
                                <TableCell>{format(invoice.date, "dd-MM-yyyy")}</TableCell>
                                <TableCell className="text-end">
                                    <InvoiceDropdown invoiceId={invoice.id} status={invoice.status} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}  