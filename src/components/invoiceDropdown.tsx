"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { CheckCircle, DownloadCloud, Edit, Mail, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { DeleteInvoiceDialog } from "./modal/deleteInvoice";
import { toast } from "sonner";
import axios from "axios";

interface InvoiceDropdownProps {
    invoiceId: string
}

export function InvoiceDropdown({ invoiceId }: InvoiceDropdownProps) {

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
                        <Link href={`/invoices/edit/${invoiceId}`}>
                            <span className="cursor-pointer">Edit</span>
                            <Edit className="mr-2 h-5 w-5 ml-auto" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="">
                            <span>Mark as Paid</span>
                            <CheckCircle className="mr-2 h-5 w-5 ml-auto" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/api/invoice/${invoiceId}`} target="_blank">
                            <span>Download Invoice</span>
                            <DownloadCloud className="mr-2 h-5 w-5 ml-auto" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={sendReminder}>
                        <span className="cursor-pointer">Reminder Email</span>
                        <Mail className="mr-2 h-5 w-5 ml-auto" />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild >
                        <DeleteInvoiceDialog id={invoiceId}>
                            <div className="flex w-full items-center">
                                <span>Delete</span>
                                <Trash className="mr-2 h-4 w-4 ml-auto" />
                            </div>
                        </DeleteInvoiceDialog>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

