import { userModel } from "../../models/user-model.js"

export const deleteUser = async (req, res) => {
    const deletedUser = await userModel.findByIdAndDelete(req.body.id)

    res.status(200).json({
        message: "User deleted",
        user: deletedUser
    })
}