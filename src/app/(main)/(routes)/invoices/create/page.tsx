import { CreateInvoice } from "@/components/createInvoice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InvoiceCreateRoute() {
    return (
        <Card className="w-full max-w-5xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Create New Invoice</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <CreateInvoice />
            </CardContent>
        </Card>
    )
}