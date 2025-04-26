import { SubmitButton } from "@/components/submitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "@/lib/auth";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export default function Login() {

    return <div className="h-screen w-full flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Login</CardTitle>
                <CardDescription className="">Login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-y-4">
                    <form action={async () => {
                        "use server"
                        await signIn("google", {
                            redirectTo: "/dashboard"
                        })
                    }}>
                        <SubmitButton
                            variant="outline"
                            label="Login with Google"
                            icon={<FcGoogle className="w-4 h-4" />}
                        />
                    </form>

                    <form action={async () => {
                        "use server"
                        await signIn("github", {
                            redirectTo: "/dashboard"
                        })
                    }}>
                        <SubmitButton
                            variant="outline"
                            label="Login with Github"
                            icon={<BsGithub className="w-4 h-4" />}
                        />
                    </form>
                </div>
            </CardContent>
        </Card>
    </div>
}