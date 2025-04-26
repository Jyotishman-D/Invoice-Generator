"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth";
import { ChevronDown, LogOut, Settings, User as UserProfile } from "lucide-react"
import Link from "next/link";

interface SidebarHeaderProps {
    name: string | null
}

export function SidebarHeader({ name }: SidebarHeaderProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="w-44 mt-4 mb-3 hover:bg-primary/10 rounded-md transition py-2 px-3 text-primary text-sm flex items-center justify-center">
                    <span className="truncate">{name}</span>
                    <ChevronDown className="h-4 w-4 text-neutral-400 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span className="cursor-pointer">My Profile</span>
                        <UserProfile className="mr-2 h-5 w-5 ml-auto" />
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings/profile">
                            <span>Setting</span>
                            <Settings className="mr-2 h-5 w-5 ml-auto" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                        <span className="cursor-pointer">Logout</span>
                        <LogOut className="mr-2 h-5 w-5 ml-auto" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

