import { userModel } from "../../models/user-model.js"

export const createUser = async (req, res) => {
    const body = req.body
    const newUser = await userModel.create({
        email: body.email,
        password: body.password,
        phoneNumber: body.phoneNumber,
        address: body.address,
    })

    res.status(201).json({
        message: "User succesfully added",
        user: newUser
    })
}   