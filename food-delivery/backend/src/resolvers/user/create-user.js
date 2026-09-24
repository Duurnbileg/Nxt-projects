import bcrypt from "bcryptjs";
import { userModel } from "../../models/user-model.js";

export const createUser = async (req, res) => {
    try {
        const { email, password, phoneNumber, address, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            email,
            password: hashedPassword,
            phoneNumber,
            address,
            role: role || "USER",
        });

        newUser.password = undefined;

        res.status(201).json({
            message: "User succesfully added",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create user" });
    }
};
