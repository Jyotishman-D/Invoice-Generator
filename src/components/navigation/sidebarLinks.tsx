"use client";

import { cn } from "@/lib/utils";
import { HomeIcon, LucideProps, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface SidebarLinkProps {
    id: number;
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export const Links: SidebarLinkProps[] = [
    {
        id: 0,
        name: "Dashboard",
        href: "/dashboard",
        icon: HomeIcon
    },
    {
        id: 1,
        name: "Invoices",
        href: "/invoices",
        icon: User2
    }
]

export function SidebarLinks() {

    const pathname = usePathname()

    return (
        <>
            {Links.map((link) => (
                <Link key={link.id} href={link.href} className={cn(
                    "flex items-center gap-2 text-neutral-400 py-1 px-2 mt-1 rounded-lg transition-all",
                    pathname === link.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                )}>
                    <link.icon className="w-4 h-4" />
                    {link.name}
                </Link>

            ))}
        </>
    )
}