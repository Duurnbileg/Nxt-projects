"use client"
import { LocationDialog } from "./_user/locationDialog"
import { CardDrawer } from "./cart/cardDrawer"
import { UserMenu } from "./_user/userMenu"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import Image from "next/image"

export type UserType = {
    _id?: string;
    name?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const Header = () => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("user");
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        toast.success("Гарлаа");
    };

    const updateUser = (nextUser: UserType) => {
        localStorage.setItem("user", JSON.stringify(nextUser));
        setUser(nextUser);
    };

    return (
        <header className="bg-black flex w-full justify-between px-22 py-3">
            <Image
                src="/Logo-white.png"
                alt="Description"
                width={120}
                height={32}
                loading="eager"
                className="object-cover"
            />
            <div className="flex gap-2">
                <LocationDialog user={user} onUserUpdate={updateUser} />
                <CardDrawer user={user}/>
                <UserMenu user={user} logout={logout} />
            </div>
        </header>
    );
};
