"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { CheckCircle, DownloadCloud, Edit, Mail, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { DeleteInvoiceDialog } from "./modal/deleteInvoice";
import { toast } from "sonner";
import axios from "axios";
import { PaidInvoiceDialog } from "./modal/paidInvoice";

interface InvoiceDropdownProps {
    invoiceId: string;
    status: string;
}

export function InvoiceDropdown({ invoiceId, status }: InvoiceDropdownProps) {

    const sendReminder = async () => {
        toast.promise(await axios.post(`/api/emailReminder/${invoiceId}`), {
            loading: "Sending Reminder email...",
            success: "Reminder send successfully",
            error: "Failed to send reminder email"
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <Button variant="secondary" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={`/invoices/edit/${invoiceId}`} className="flex items-center justify-between w-full cursor-pointer">
                            <span>Edit</span>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </DropdownMenuItem>
                    {status !== "PAID" && (
                        <DropdownMenuItem asChild>
                            <PaidInvoiceDialog id={invoiceId}>
                                <div className="flex items-center justify-between w-full cursor-pointer">
                                    <span>Mark as Paid</span>
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            </PaidInvoiceDialog>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                        <Link href={`/api/invoice/${invoiceId}`} target="_blank" className="flex items-center justify-between w-full cursor-pointer">
                            <span>Download Invoice</span>
                            <DownloadCloud className="h-4 w-4" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={sendReminder} className="flex items-center justify-between w-full cursor-pointer">
                        <span>Reminder Email</span>
                        <Mail className="h-4 w-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <DeleteInvoiceDialog id={invoiceId}>
                            <div className="flex items-center justify-between w-full cursor-pointer">
                                <span>Delete</span>
                                <Trash className="h-4 w-4" />
                            </div>
                        </DeleteInvoiceDialog>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}