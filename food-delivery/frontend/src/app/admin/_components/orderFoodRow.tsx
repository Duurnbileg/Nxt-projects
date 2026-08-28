import { TableCell, TableRow, } from "@/components/ui/table";

export const OrderFoodRow = ({ food }: { food: any }) => {
    return (
        <TableRow className="bg-muted/20">
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell colSpan={5}>
                <div className="flex items-center gap-3">
                    <img
                        src={food.image}
                        alt={food.name}
                        className="h-10 w-10 rounded-md object-cover"
                    />

                    <span className="font-medium">
                        {food.name}
                    </span>

                    <span className="ml-auto text-sm text-muted-foreground">
                        x {food.quantity}
                    </span>
                </div>
            </TableCell>
        </TableRow>
    );
};