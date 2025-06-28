"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form } from "@/components/ui/form"
import { useInvoiceForm } from "@/hooks/useInvoiceForm";
import { InvoiceHeader } from "./createInvoice/InvoiceHeader";
import { InvoiceDetails } from "./createInvoice/InvoiceDetails";
import { ContactSection } from "./createInvoice/ContactSection";
import { DateSection } from "./createInvoice/DateSection";
import { InvoiceItems } from "./createInvoice/InvoiceItems";
import { InvoiceSummary } from "./createInvoice/InvoiceSummary";
import { NotesSection } from "./createInvoice/NotesSection";

// Main component
export function CreateInvoice() {
    const { form, isLoading, onSubmit } = useInvoiceForm();

    return (
        <Card className="w-full max-w-5xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Create New Invoice</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-6">
                            <InvoiceHeader form={form} />
                            <InvoiceDetails form={form} />
                            <ContactSection form={form} />
                            <DateSection form={form} />
                            <InvoiceItems form={form} />
                            <InvoiceSummary form={form} />
                            <NotesSection form={form} />

                            <Button type="submit" className="flex ml-auto" disabled={isLoading}>
                                {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                                Send Invoice to Client
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}