import { foodModel } from "../../models/food-model.js";
import { orderModel } from "../../models/order-model.js";

export const deleteOrder = async (req, res) => {
    const deletedOrder = await orderModel.findByIdAndDelete(req.body.id);

    res.status(200).json({
        message: "Deleted",
        food: deletedOrder
    })
}