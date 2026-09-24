import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import Link from "next/link";
import { UserType } from "../header";

export const UserMenu = ({ user, logout }: { user: UserType | null, logout: () => void }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-full bg-red-400 hover:bg-red-300">
                    <User />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white rounded-lg shadow-lg p-2 absolute right-[-7rem]">
                <DropdownMenuGroup>
                    {!user?.email ?
                        <div className="flex flex-col gap-2">
                            <Link href="/login">
                                <Button className="w-full mt-2">Login</Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="w-full">Signup</Button>
                            </Link>
                        </div>
                        : <div className="flex flex-col gap-2">
                            <p className="text-sm">{user?.email}</p>
                            <Button onClick={logout} className="w-full mt-2">Log Out</Button>
                        </div>}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};