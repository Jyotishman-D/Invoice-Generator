import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CurrencyFormat } from "@/hooks/currency";

interface InvoiceItemsProps {
    form: any;
}

export const InvoiceItems = ({ form }: InvoiceItemsProps) => (
    <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
            <FormField
                control={form.control}
                name="invoiceDescription"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Item name & description" {...field} />
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
                            <Input 
                                value={CurrencyFormat({ 
                                    amount: form.watch("invoiceItemTotalAmount"), 
                                    currency: form.watch("currency") 
                                })} 
                                disabled 
                                placeholder="0" 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    </div>
); 