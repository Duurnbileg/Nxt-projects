import { foodModel } from "../../models/food.model.js";

export const deleteFood = async (req, res) => {
    const deletedFood = await foodModel.findByIdAndDelete(req.body.id);

    res.status(200).json({
        message: "Deleted",
        food: deletedFood
    })
}