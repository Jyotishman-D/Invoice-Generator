"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Loader2, Trash } from "lucide-react"
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react"
import { toast } from "sonner"

interface DeleteInvoiceDialogProps {
    children: ReactNode,
    id: string
}

export function DeleteInvoiceDialog({ children, id }: DeleteInvoiceDialogProps) {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const deleteInvoice = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/deleteInvoice/${id}`)
            router.refresh()
            toast.success("Invoice deleted")
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        invoice and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteInvoice}>
                        {loading && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
