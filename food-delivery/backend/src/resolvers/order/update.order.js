import { orderModel } from "../../models/order-model.js";

export const updateOrder = async (req, res) => {
    const body = req.body
    const updatedFood = await orderModel.findByIdAndUpdate(body.id, {
        user: body.user,
        totalPrice: body.totalPrice,
        foodOrderItems: body.foodOrderItems,
        status: body.status
    }, { new: true });

    res.status(201).json({
        message: "Updated",
        category: updatedFood
    })
}