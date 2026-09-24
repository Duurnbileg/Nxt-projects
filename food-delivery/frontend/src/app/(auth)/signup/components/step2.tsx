"use client";
import { Input } from "@/components/ui/input";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";

export const Step2 = ({ handlePrevStep }: { handlePrevStep: () => void }) => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const canSubmit = password.length >= 6 && confirmPassword.length >= 6 && password === confirmPassword;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!canSubmit) return;

        setLoading(true);

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const storedUser = JSON.parse(localStorage.getItem("signupUser") || "{}");
            const email = storedUser.email?.trim();

            if (!email) {
                toast.error("Email is missing. Please go back and enter your email.");
                setLoading(false);
                return;
            }

            const res = await fetch(`${API_URL}/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    role: "USER",
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                toast.error(data.message || "Failed to create account");
                return;
            }

            localStorage.removeItem("signupUser");
            toast.success("Account created successfully");
            router.push("/login");
        } catch {
            toast.error("Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col w-[400px] gap-6 rounded-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">Create a strong password</CardTitle>
                <CardDescription className="text-sm text-zinc-500">
                    Create a strong password with letters, numbers.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Confirm your password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="flex items-center">
                    <Checkbox
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground"
                    />
                    <span className="ml-2 text-sm text-zinc-500">Show Password</span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col-reverse gap-2">
                <Button variant="outline" className="w-full" onClick={handlePrevStep}>
                    Previous
                </Button>
                <Button type="submit" disabled={!canSubmit || loading} className="w-full" onClick={handleSubmit}>
                    Create Account
                </Button>
            </CardFooter>
        </main>
    )
}