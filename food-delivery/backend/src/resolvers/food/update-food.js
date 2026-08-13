import { foodModel } from "../../models/food.model.js";

export const updateFood = async (req, res) => {
    const body = req.body
    const updatedFood = await foodModel.findByIdAndUpdate(body.id, {
        categoryName: body.categoryName,
        foodName: body.foodName,
        price: body.price,
        image: body.image,
        ingredients: body.ingredients,
        category: body.category
    }, { new: true });

    res.status(201).json({
        message: "Updated",
        category: updatedFood
    })
}