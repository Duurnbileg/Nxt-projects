import { categoryModel } from "../../models/category-model.js";

export const deleteCategory = async (req, res) => {
    const deletedCategory = await categoryModel.findByIdAndDelete(req.body.id);

    res.status(200).json({
        message: "Deleted",
        category: deletedCategory
    })
}