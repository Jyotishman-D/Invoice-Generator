import { Input } from "../ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface ContactSectionProps {
    form: any;
}

export const ContactSection = ({ form }: ContactSectionProps) => (
    <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
            <FormLabel>From</FormLabel>
            <FormField
                control={form.control}
                name="from.name"
                render={({ field }) => (
                    <FormItem>
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
            <FormLabel>To</FormLabel>
            <FormField
                control={form.control}
                name="to.name"
                render={({ field }) => (
                    <FormItem>
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
                        <FormControl>
                            <Input placeholder="Client Email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="to.address"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input placeholder="Client Address" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    </div>
); 