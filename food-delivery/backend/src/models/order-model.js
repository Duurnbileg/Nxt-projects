import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.ObjectId

const OrderItemSchema = new Schema({
    food: {
        type: ObjectId,
        ref: "food",
    },
    quantity: Number,
});

const OrderSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "user",
    },
    totalPrice: Number,
    foodOrderItems: [OrderItemSchema],
    status: {
        type: String,
        enum: ["PENDING", "CANCELED", "DELIVERED"],
        default: "PENDING",
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
});

export const orderModel = mongoose.model("Order", OrderSchema);