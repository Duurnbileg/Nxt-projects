import { foodModel } from "../../models/food-model.js";

export const updateFood = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
        id,
        body,
        { new: true }
    );

    res.status(200).json({
        message: "Updated",
        food: updatedFood,
    });
};