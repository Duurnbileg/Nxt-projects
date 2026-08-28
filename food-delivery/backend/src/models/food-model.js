import mongoose, { Schema, SchemaType } from "mongoose";

const ObjectId = Schema.ObjectId

const FoodSchema = new Schema(
    {
        Id: ObjectId,
        foodName: String,
        price: Number,
        image: String,
        ingredients: String,
        category: {
            type: ObjectId,
            ref: "category",
            req: true
        },
        createdAt: { type: Date, required: true, default: Date.now },
        updatedAt: { type: Date, required: true, default: Date.now }
    },
);

export const foodModel = mongoose.model("food", FoodSchema);