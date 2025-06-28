import { Textarea } from "../ui/textarea";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface EditNotesSectionProps {
    form: any;
}

export const EditNotesSection = ({ form }: EditNotesSectionProps) => {
    return (
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
    )
}; 