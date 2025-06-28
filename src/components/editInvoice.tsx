"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form } from "@/components/ui/form"
import { useEditInvoiceForm } from "@/hooks/useEditInvoiceForm";
import { Invoice } from "@/generated/prisma";
import { EditInvoiceHeader } from "./editInvoice/EditInvoiceHeader";
import { EditInvoiceDetails } from "./editInvoice/EditInvoiceDetails";
import { EditContactSection } from "./editInvoice/EditContactSection";
import { EditDateSection } from "./editInvoice/EditDateSection";
import { EditInvoiceItems } from "./editInvoice/EditInvoiceItems";
import { EditInvoiceSummary } from "./editInvoice/EditInvoiceSummary";
import { EditNotesSection } from "./editInvoice/EditNotesSection";

interface EditInvoiceProps {
    data: Invoice;
}

// Main component
export function EditInvoice({ data }: EditInvoiceProps) {
    const { form, isLoading, onSubmit } = useEditInvoiceForm({ data });

    return (
        <Card className="w-full max-w-5xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Edit Invoice</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-6">
                            <EditInvoiceHeader form={form} />
                            <EditInvoiceDetails form={form} />
                            <EditContactSection form={form} />
                            <EditDateSection form={form} />
                            <EditInvoiceItems form={form} />
                            <EditInvoiceSummary form={form} />
                            <EditNotesSection form={form} />

                            <Button type="submit" className="flex ml-auto" disabled={isLoading}>
                                {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                                Update Invoice
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}