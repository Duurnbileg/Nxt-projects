import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function DropDown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <ChevronDown />
                    Open
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Badge>Action</Badge>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
