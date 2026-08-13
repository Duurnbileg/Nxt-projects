import { orderModel } from "../../models/order-model.js"

export const getOrder = async (req, res) => {
    const orders = await orderModel.find().populate(["user", "foodOrderItems.food"])

    res.status(200).json(orders)
}