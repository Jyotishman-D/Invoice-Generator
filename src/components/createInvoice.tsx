"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Form } from "@/components/ui/form"
import { useInvoiceForm } from "@/hooks/useInvoiceForm";
import { InvoiceHeader } from "./createInvoiceForm/InvoiceHeader";
import { InvoiceDetails } from "./createInvoiceForm/InvoiceDetails";
import { ContactSection } from "./createInvoiceForm/ContactSection";
import { DateSection } from "./createInvoiceForm/DateSection";
import { InvoiceItems } from "./createInvoiceForm/InvoiceItems";
import { InvoiceSummary } from "./createInvoiceForm/InvoiceSummary";
import { NotesSection } from "./createInvoiceForm/NotesSection";

// Main component
export function CreateInvoice() {
    const { form, isLoading, onSubmit } = useInvoiceForm();

    return (
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
    );
}