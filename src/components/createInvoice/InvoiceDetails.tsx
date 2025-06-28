import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { InvoiceStatus } from "@/generated/prisma";

// Constants
const CURRENCIES = [
    { value: "USD", label: "United States Dollar (USD)" },
    { value: "INR", label: "Indian Rupee (INR)" }
] as const;

interface InvoiceDetailsProps {
    form: any;
}

export const InvoiceDetails = ({ form }: InvoiceDetailsProps) => (
    <div className="grid grid-cols-3 gap-4">
        <FormField
            control={form.control}
            name="invoiceNumber"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Invoice No.</FormLabel>
                    <FormControl>
                        <div className="flex">
                            <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">#</span>
                            <Input className="rounded-l-none" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

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
                            {CURRENCIES.map((currency) => (
                                <SelectItem key={currency.value} value={currency.value}>
                                    {currency.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                        <FormControl>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
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
); 