import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { API_URL } from "@/lib/api"
import { MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { UserType } from "../header"

export const LocationDialog = ({
    user,
    onUserUpdate,
}: {
    user: UserType | null;
    onUserUpdate: (user: UserType) => void;
}) => {
    const [address, setAddress] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!user?._id) {
            toast.error("Энэ үйлчилгээг ашиглахын тулд нэвтэрнэ үү");
            return;
        }

        if (!address.trim()) {
            toast.error("Please enter a delivery address");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: user._id,
                    address: address.trim(),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to update location");
            }

            onUserUpdate({
                ...user,
                ...(data.user ?? {}),
                address: address.trim(),
            });
            toast.success("Delivery address updated");
            setOpen(false);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update location");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            setAddress(user?.address ?? "");
        }
    }, [user, open]);

    return (
        <main>
            <Dialog open={open} onOpenChange={setOpen}>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="rounded-full text-gray-500">
                            <span className="flex items-center gap-2 text-red-400">
                                <MapPin />
                                Delivery Address
                            </span>
                            {user?.address ? (
                                <span className="text-sm">{user.address}</span>
                            ) : <span className="text-sm">Add location</span>}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle className="text-lg ">Please write your delivery address!</DialogTitle>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Textarea
                                    id="name-1"
                                    name="name"
                                    placeholder="Please share your complete address"
                                    className="h-25"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={!address.trim() || loading} onClick={handleSubmit}>
                                {loading ? "Saving..." : "Deliver here"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </main>
    )
}
