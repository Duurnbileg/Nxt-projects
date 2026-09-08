import { foodModel } from "../../models/food-model.js";

export const getFoodByCategory = async (req, res) => {
    const foods = await foodModel
        .find({ category: req.params.categoryId })
        .populate("category");
    res.status(200).json({
        foods,
    });
};