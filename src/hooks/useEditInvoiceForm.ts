import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { z } from "zod";
import { Invoice } from "@/generated/prisma";
import { formSchema } from "@/lib/zod";

// Types
export type FormData = z.infer<typeof formSchema>;

interface UseEditInvoiceFormProps {
    data: Invoice;
}

export const useEditInvoiceForm = ({ data }: UseEditInvoiceFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            invoiceName: data.invoiceName,
            invoiceNumber: data.invoiceNumber,
            currency: "INR",
            status: data.status,
            from: {
                name: data.fromName,
                email: data.fromEmail,
                address: data.fromAddress
            },
            to: {
                name: data.toName,
                email: data.toEmail,
                address: data.toAddress
            },
            date: data.date,
            dueDate: data.dueDate,
            invoiceDescription: data.invoiceDescription,
            invoiceItemQuantity: data.invoiceItemQuantity,
            invoiceItemrate: data.invoiceItemrate,
            invoiceItemTotalAmount: data.invoiceItemTotalAmount,
            note: data.note || ""
        },
    });

    const quantity = form.watch("invoiceItemQuantity");
    const rate = form.watch("invoiceItemrate");

    // Auto-calculate total amount
    useEffect(() => {
        if (quantity && rate) {
            const calculatedAmount = quantity * rate;
            form.setValue("invoiceItemTotalAmount", calculatedAmount);
        }
    }, [quantity, rate, form]);

    const onSubmit = async (values: FormData) => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/invoiceRoute/editRoute/${data.id}`, values);
            router.push("/invoices");
            form.reset();
            toast.success("Invoice updated successfully");
        } catch (error) {
            console.error("Error updating invoice:", error);
            toast.error("Failed to update invoice");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        isLoading,
        onSubmit
    };
}; 