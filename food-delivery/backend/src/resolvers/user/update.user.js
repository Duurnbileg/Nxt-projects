import bcrypt from "bcryptjs";
import { userModel } from "../../models/user-model.js";

export const updateUser = async (req, res) => {
    try {
        const body = req.body;

        if (!body.id) {
            return res.status(400).json({ message: "User id is required" });
        }

        const update = {
            updatedAt: new Date(),
        };

        if (body.email !== undefined) update.email = body.email;
        if (body.phoneNumber !== undefined) update.phoneNumber = body.phoneNumber;
        if (body.address !== undefined) update.address = body.address;
        if (body.role !== undefined) update.role = body.role;

        if (body.password) {
            update.password = await bcrypt.hash(body.password, 10);
        }

        const updatedUser = await userModel.findByIdAndUpdate(body.id, update, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        updatedUser.password = undefined;

        res.status(200).json({
            message: "Updated",
            user: updatedUser,
        });
    } catch (error) {
        if (error?.name === "CastError") {
            return res.status(400).json({ message: "Invalid user id" });
        }
        res.status(500).json({ message: "Failed to update user" });
    }
};
