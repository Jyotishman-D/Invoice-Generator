import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { z } from "zod";
import { InvoiceStatus } from "@/generated/prisma";
import { formSchema } from "@/lib/zod";

// Types
export type FormData = z.infer<typeof formSchema>;

export const useInvoiceForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            invoiceName: "",
            invoiceNumber: 0,
            currency: "INR",
            status: InvoiceStatus.PENDING,
            from: {
                name: "",
                email: "",
                address: ""
            },
            to: {
                name: "",
                email: "",
                address: ""
            },
            date: z.coerce.date().parse(new Date()),
            dueDate: 0,
            invoiceDescription: "",
            invoiceItemQuantity: 0,
            invoiceItemrate: 0,
            invoiceItemTotalAmount: 0,
            note: ""
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
            await axios.post(`/api/invoiceRoute`, values);
            form.reset();
            router.push("/invoices");
            toast.success("Invoice created successfully");
        } catch (error) {
            console.error("Error creating invoice:", error);
            toast.error("Failed to create invoice");
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