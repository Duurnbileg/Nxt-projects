import { foodModel } from "../../models/food-model.js";

export const getFoodByCategory = async (req, res) => {
    const { category } = req.body;
    const foods = await foodModel.find({
        category: category,
    });
    res.status(200).json(foods);
};