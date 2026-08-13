import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.ObjectId

const CategorySchema = new Schema({
    id: ObjectId,
    categoryName: String,
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
},);

export const categoryModel = mongoose.model("category", CategorySchema);