import { userModel } from "../../models/user-model.js"

export const getUser = async (req, res) => {
    const users = await userModel.find()
    if (!users) {
        res.status(404).json({ message: "No users found" });
        return;
    }
    res.status(200).json(users[0]);
}