import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../../models/user-model.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email: email.trim() });

        if (!user) {
            return res
                .status(401)
                .json({ message: "Email эсвэл password буруу байна" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: "Email эсвэл password буруу байна" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT_SECRET is not configured" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            jwtSecret,
            { expiresIn: "7d" },
        );

        user.password = undefined;

        res.json({ message: "Амжилттай нэвтэрлээ", token, user });
    } catch {
        res.status(500).json({ message: "Нэвтрэхэд алдаа гарлаа" });
    }
};
