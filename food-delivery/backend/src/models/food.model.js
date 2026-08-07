import mongoose, { Schema } from "mongoose";

const FoodSchema = new Schema(
    {
        Objectid: {
            type: String
        },
        foodName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: false,
        },
        image: {
            type: String,
            default: "",
        },
        ingredients: {
            type: String,
            default: "",
        },
        category: {
            type: String,
            ref: "Category",
            required: false,
        },
        createdAt: { type: Date, required: true, default: Date.now },
        updatedAt: { type: Date, required: true, default: Date.now }
    },
);

export const foodModel = mongoose.model("Food", FoodSchema);