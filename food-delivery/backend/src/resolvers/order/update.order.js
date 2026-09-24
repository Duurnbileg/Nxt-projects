import { orderModel } from "../../models/order-model.js";

export const updateOrder = async (req, res) => {
    try {
        const body = req.body;

        if (!body.id) {
            return res.status(400).json({ message: "Order id is required" });
        }

        const update = {
            updatedAt: new Date(),
        };

        if (body.user !== undefined) update.user = body.user;
        if (body.totalPrice !== undefined) update.totalPrice = body.totalPrice;
        if (body.foodOrderItems !== undefined) update.foodOrderItems = body.foodOrderItems;
        if (body.address !== undefined) update.address = body.address;
        if (body.status !== undefined) update.status = body.status;

        const updatedOrder = await orderModel.findByIdAndUpdate(body.id, update, {
            new: true,
        }).populate(["user", "foodOrderItems.food"]);

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Updated",
            order: updatedOrder,
        });
    } catch {
        res.status(500).json({ message: "Failed to update order" });
    }
};
