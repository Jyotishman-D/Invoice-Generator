import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

interface InvoiceHeaderProps {
    form: any;
}

export const InvoiceHeader = ({ form }: InvoiceHeaderProps) => (
    <FormField
        control={form.control}
        name="invoiceName"
        render={({ field }) => (
            <FormItem>
                <div className="flex flex-col gap-1 mb-6">
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary">Draft</Badge>
                        <FormControl>
                            <Input placeholder="Invoice name" {...field} className="w-fit" />
                        </FormControl>
                        <FormMessage />
                    </div>
                </div>
            </FormItem>
        )}
    />
); 