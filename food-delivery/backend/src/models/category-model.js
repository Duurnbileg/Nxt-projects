import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    Objectid: {
        type: String
    },
    categoryName: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
},);

export const categoryModel = mongoose.model("Category", CategorySchema);