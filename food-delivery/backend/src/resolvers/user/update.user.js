import { userModel } from "../../models/user-model.js";

export const updateUser = async (req, res) => {
    const body = req.body
    const updatedFood = await userModel.findByIdAndUpdate(body.id, {
        email: body.email,
        password: body.password,
        phoneNumber: body.phoneNumber,
        address: body.address,
        role: body.role
    }, { new: true });

    res.status(201).json({
        message: "Updated",
        category: updatedFood
    })
}