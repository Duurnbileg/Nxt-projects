"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Step1 = ({ handleNextStep }: { handleNextStep: () => void }) => {
    const [email, setEmail] = useState("");

    const canSubmit = email.trim();

    const emailSubmit = (e: any) => {
        e.preventDefault();
        if (!canSubmit) return;

        const storedUser = JSON.parse(localStorage.getItem("signupUser") || "{}");
        localStorage.setItem(
            "signupUser",
            JSON.stringify({
                ...storedUser,
                email: email.trim(),
            }),
        );
        handleNextStep();
    };

    return (
        <main className="flex flex-col w-[400px] gap-6 rounded-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">Create Your Account</CardTitle>
                <CardDescription className="text-sm text-zinc-500">
                    Sign up to explore your favorite dishes.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button disabled={!canSubmit} className="w-full" onClick={emailSubmit}>
                    Next
                </Button>
                <Label htmlFor="signup" className="mt-2 text-sm text-zinc-500">
                    Already have an account?
                    <Link href="/login">
                        <Button variant="link">
                            Log in
                        </Button>
                    </Link>
                </Label>
            </CardFooter>

        </main>
    );
}