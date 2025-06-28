import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

export function Navbar() {

    return (
        <nav className="flex items-center justify-between h-16 bg-slate-500 px-4 mt-5 rounded-md">
            <Link href="/" className="text-2xl font-bold">
                Invoice Generator
            </Link>

            <Link href="/login" className={buttonVariants()}>
                Get started
            </Link>
        </nav>
    )
}