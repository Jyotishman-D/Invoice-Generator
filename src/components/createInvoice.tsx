"use client";

import { CalendarIcon, Currency } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { object, z } from "zod";
import { format } from "date-fns"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InvoiceStatus } from "@/generated/prisma";
import { useEffect } from "react";
import { CurrencyFormat } from "@/hooks/currency";

const formSchema = z.object({
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

export function CreateInvoice() {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
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
    const rate = form.watch("invoiceItemrate")

    useEffect(() => {
        if (quantity && rate) {
            const calculatedAmount = quantity * rate;
            form.setValue("invoiceItemTotalAmount", calculatedAmount);
        }
    }, [quantity, rate, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.post(`/api/invoiceRoute`, values);
            router.push("/invoices");
            form.reset()
            toast.success("Invoice created")
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Card className="w-full max-w-5xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Create New Invoice</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="invoiceName"
                                render={({ field }) => (
                                    <FormItem >
                                        <div className="flex flex-col gap-1 mb-6">
                                            <div className="flex items-center gap-4">
                                                <Badge variant="secondary">Draft</Badge>
                                                <FormControl>
                                                    <Input placeholder="shadcn" {...field} className="w-fit" />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="invoiceNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Invoice No.</FormLabel>
                                                <FormControl>
                                                    <div className="flex">
                                                        <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">#</span>
                                                        <Input className=" rounded-l-none" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="currency"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Currency</FormLabel>
                                                <Select defaultValue="INR" onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select currency" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="USD">
                                                            United States Dollar (USD)
                                                        </SelectItem>
                                                        <SelectItem value="INR">
                                                            Indian Rupee (INR)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select defaultValue={field.value} onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select currency" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {Object.values(InvoiceStatus).map((status) => (
                                                            <SelectItem key={status} value={status}>
                                                                {status}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="from.name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>From</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="from.email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Your Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="from.address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Your Address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="to.name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>To</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Client Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="to.email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="space-y-2">
                                                    <FormControl>
                                                        <Input placeholder="Client Email" {...field} />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="to.address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="space-y-2">
                                                    <FormControl>
                                                        <Input placeholder="Client Address" {...field} />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline">
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="w-4 h-4" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            fromDate={new Date()}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="dueDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Invoice Due</FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select due date" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="0">
                                                            Due on Receipt
                                                        </SelectItem>
                                                        <SelectItem value="15">
                                                            Net 15
                                                        </SelectItem>
                                                        <SelectItem value="30">
                                                            Net 30
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-6">
                                    <FormField
                                        control={form.control}
                                        name="invoiceDescription"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="item name & description" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="invoiceItemQuantity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quantity</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="invoiceItemrate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Rate</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="invoiceItemTotalAmount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Amount</FormLabel>
                                                <FormControl>
                                                    <Input value={CurrencyFormat({ amount: form.watch("invoiceItemTotalAmount"), currency: form.watch("currency") })} disabled placeholder="0" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <div className="w-1/3">
                                    <div className="flex justify-between items-center py-2">
                                        <span>Subtotal</span>
                                        <span>{CurrencyFormat({ amount: form.watch("invoiceItemTotalAmount"), currency: form.watch("currency") })}</span>
                                    </div>

                                    {/* <div className="flex justify-between ietms-center py-2 border-t">
                                        <span>Total</span>
                                        <span>Total</span>
                                    </div> */}
                                </div>
                            </div>

                            <div>
                                <FormField
                                    control={form.control}
                                    name="note"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Note</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Add your notes" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="flex ml-auto">Send Invoice to Client</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}