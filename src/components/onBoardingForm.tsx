"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface OnBoardingFormProps {
    name: string | null
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    address: z.string().min(2, {
        message: "Address is required.",
    }),
})

export default function OnBoardingForm({ name }: OnBoardingFormProps) {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || "",
            address: ""
        },
    });

    const { isSubmitting, isValid } = form.formState

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            await axios.patch(`/api/onboardingRoute`, values);
            router.push("/dashboard")

            toast.success("onBoarding completed successfully")

        } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error) && error.response?.status === 400) {
                toast.error("Please check your information and try again")
            }
            else {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl">You are almost finished!</CardTitle>
                    <CardDescription>Enter your address to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}