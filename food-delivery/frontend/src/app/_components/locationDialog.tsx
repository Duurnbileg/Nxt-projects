import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, MapPin } from "lucide-react"

export const LocationDialog = () => {
    return (
        <main>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="rounded-full text-gray-500">
                            <span className="flex items-center gap-2 text-red-400">
                                <MapPin />
                                Delivery Address
                            </span>
                            Add location <ChevronRight />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle className="text-lg ">Please write your delivery address!</DialogTitle>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Textarea id="name-1" name="name" placeholder="Please share your complete address" className="h-25" />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Deliver here</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </main>
    )
}