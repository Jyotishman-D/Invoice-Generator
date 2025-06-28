import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";

// Constants
const DUE_DATE_OPTIONS = [
    { value: "0", label: "Due on Receipt" },
    { value: "15", label: "Net 15" },
    { value: "30", label: "Net 30" }
] as const;

interface EditDateSectionProps {
    form: any;
}

export const EditDateSection = ({ form }: EditDateSectionProps) => {
    return (
        <div className="grid grid-cols-2 gap-6">
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
                                    <CalendarIcon className="w-4 h-4 ml-2" />
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
                                {DUE_DATE_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}; 