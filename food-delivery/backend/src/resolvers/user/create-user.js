import { userModel } from "../../models/user-model.js"

export const createUser = async (req, res) => {
    const newUser = await userModel.create({ email: req.body.email })

    res.status(201).json({
        message: "User succesfully added",
        user: newUser
    })
}   