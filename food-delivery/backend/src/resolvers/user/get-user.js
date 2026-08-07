import { userModel } from "../../models/user-model.js"

export const getUser = async (req, res) => {
    const users = await userModel.find()

    res.status(200).json(users)
}