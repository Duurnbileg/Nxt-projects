import { foodModel } from "../../models/food.model.js"

export const createFood= async (req, res) => {
    const newFood = await foodModel.create({ foodName: req.body.foodName })

    res.status(201).json({
        message: "Success",
        food: newFood
    })
}