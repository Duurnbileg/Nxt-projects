import { foodModel } from "../../models/food.model.js";

export const getFood = async (req, res) => {
    const foods = await foodModel.find();

    res.status(200).json(foods)
}