import { categoryModel } from "../../models/category-model.js";

export const updateCategory = async (req, res) => {
    const body = req.body
    const updatedCategory = await categoryModel.findByIdAndUpdate(body.id, {
        categoryName: body.categoryName,
    }, { new: true });

    res.status(201).json({
        message: "Updated",
        category: updatedCategory
    })
}