import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, DownloadCloud, Edit, Mail, MoreHorizontal, Plus, Trash } from "lucide-react";
import Link from "next/link";

export default function Invoices() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
                        <CardDescription>Manage your invoices here</CardDescription>
                    </div>
                    <Link href="/invoices/create" className={buttonVariants()}>
                        <Plus className="w-4 h-4" />
                        Create Invoice
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-end">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>#1</TableCell>
                            <TableCell>jyoti</TableCell>
                            <TableCell>655</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>2024</TableCell>
                            <TableCell className="text-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="focus:outline-none" asChild>
                                        <Button variant="secondary" size="icon">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <span className="cursor-pointer">Edit</span>
                                                <Edit className="mr-2 h-5 w-5 ml-auto" />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="">
                                                    <span>Mark as Paid</span>
                                                    <CheckCircle className="mr-2 h-5 w-5 ml-auto" />
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="">
                                                    <span>Download Invoice</span>
                                                    <DownloadCloud className="mr-2 h-5 w-5 ml-auto" />
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem >
                                                <span className="cursor-pointer">Reminder Email</span>
                                                <Mail className="mr-2 h-5 w-5 ml-auto" />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="">
                                                    <span>Delete</span>
                                                    <Trash className="mr-2 h-5 w-5 ml-auto" />
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}  