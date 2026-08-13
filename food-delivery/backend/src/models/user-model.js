import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        ref: "user",
    },
    password: String,
    phoneNumber: String,
    address: String,
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
},);

export const userModel = mongoose.model("user", UserSchema);