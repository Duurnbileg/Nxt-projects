import { orderModel } from "../../models/order-model.js"

export const createOrder = async (req, res) => {
    try {
        const body = req.body

        if (!body.user || !body.foodOrderItems?.length) {
            return res.status(400).json({
                message: "User and food items are required",
            })
        }

        const newOrder = await orderModel.create({
            user: body.user,
            foodOrderItems: body.foodOrderItems,
            totalPrice: body.totalPrice,
            address: body.address,
            status: body.status || "PENDING",
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        res.status(201).json({
            message: "Success",
            order: newOrder,
        })
    } catch {
        res.status(500).json({ message: "Failed to create order" })
    }
}
