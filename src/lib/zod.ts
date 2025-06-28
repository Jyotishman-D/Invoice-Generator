import { InvoiceStatus } from "@/generated/prisma";
import { z } from "zod";

export const formSchema = z.object({
    invoiceName: z.string().min(1),
    invoiceNumber: z.coerce.number(),
    currency: z.enum(["INR", "USD"]),
    status: z.nativeEnum(InvoiceStatus),
    from: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        address: z.string().min(1)
    }),
    to: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        address: z.string().min(1)
    }),
    date: z.date(),
    dueDate: z.coerce.number().optional(),
    invoiceDescription: z.string().min(1),
    invoiceItemQuantity: z.coerce.number(),
    invoiceItemrate: z.coerce.number(),
    invoiceItemTotalAmount: z.coerce.number(),
    note: z.string().optional()
})