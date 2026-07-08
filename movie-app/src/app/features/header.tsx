import Image from "next/image"
import DropDown from "../_components/dropDownBtn";
import { Button } from "@/components/ui/button";
import { Moon, Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function Header() {
    return (
        <header className="w-full flex justify-between px-16 py-3">
            <Image
                src="/logo.png"
                alt="logo"
                width={92}
                height={20}
                className="object-contain ab"
            ></Image>
            <div className="flex gap-2">
                <DropDown />
                <InputGroup className="w-[380px]">
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>
            </div>
            <Button variant="outline" size="icon">
                <Moon />
            </Button>
        </header>
    );
}
