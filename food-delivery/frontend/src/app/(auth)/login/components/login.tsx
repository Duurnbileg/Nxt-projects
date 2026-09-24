"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export const Login = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const canSubmit = email.trim() && password.length >= 6;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!canSubmit) return;

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Нэвтрэхэд алдаа гарлаа");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    _id: data.user._id,
                    name: data.user.name,
                    email: data.user.email,
                    address: data.user.address,
                    phoneNumber: data.user.phoneNumber,
                    role: data.user.role,
                }),
            );

            toast.success("Амжилттай нэвтэрлээ");
            router.push("/");
        } catch {
            toast.error("Нэвтрэхэд алдаа гарлаа");
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="flex w-[400px] gap-6">
            <div className="flex w-full flex-col gap-6 rounded-lg border-0 bg-white p-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Log in</CardTitle>
                    <CardDescription className="text-sm text-zinc-500">
                        Please enter your email to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button className="w-full" variant="link">
                        Forgot your password?
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button type="submit" disabled={!canSubmit || loading} className="w-full" onClick={handleSubmit}>
                        {loading ? "Logging in..." : "Log in"}
                    </Button>
                    <Label htmlFor="signup" className="mt-2 text-sm text-zinc-500">
                        Don't have an account?
                        <Link href="/signup">
                            <Button variant="link">
                                Sign up
                            </Button>
                        </Link>
                    </Label>
                </CardFooter>
            </div>
        </main >
    );
}  