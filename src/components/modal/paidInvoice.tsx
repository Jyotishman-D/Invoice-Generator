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

interface PaidInvoiceDialogProps {
    children: ReactNode,
    id: string
}

export function PaidInvoiceDialog({ children, id }: PaidInvoiceDialogProps) {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const paidInvoice = async () => {
        try {
            setLoading(true)
            await axios.patch(`/api/paid/${id}`)
            router.refresh()
            toast.success("Mark as paid")
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
                    <AlertDialogDescription>
                        Are you sure you want to mark this as paid? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={paidInvoice}>
                        {loading && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        Paid
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
