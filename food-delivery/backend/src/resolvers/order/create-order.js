import { orderModel } from "../../models/order-model.js"

export const createOrder = async (req, res) => {
    const body = req.body
    const newOrder = await orderModel.create({
        user: body.user,
        foodOrderItems: body.foodOrderItems,
        totalPrice: body.totalPrice,
    })

    res.status(201).json({
        message: "Success",
        Order: newOrder
    })
}