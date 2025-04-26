"use client";

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface SubmitButtonProps {
    label: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    icon?: ReactNode
}

export function SubmitButton({ label, variant, icon }: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <Button variant={variant} className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting</span>
                </>
            ) : (
                <>
                    {icon && <div>{icon}</div>}
                    <span>{label}</span>
                </>
            )}
        </Button>
    )
}