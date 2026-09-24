import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { categoryRouter } from "./routes/category.js";
import { userRouter } from "./routes/user.js";
import { foodRouter } from "./routes/food.js";
import { orderRouter } from "./routes/order.js";
import "dotenv/config";

const app = express();

const frontendUrl = process.env.FRONTEND_URL;
app.use(
    cors(
        frontendUrl
            ? {
                  origin: frontendUrl.split(",").map((url) => url.trim()),
                  credentials: true,
              }
            : undefined,
    ),
);
app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Food delivery API is running" });
});

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);

const globalWithMongo = globalThis;

if (!globalWithMongo._mongoose) {
    globalWithMongo._mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL is required");
    }

    if (globalWithMongo._mongoose.conn) {
        return globalWithMongo._mongoose.conn;
    }

    if (!globalWithMongo._mongoose.promise) {
        globalWithMongo._mongoose.promise = mongoose.connect(process.env.MONGODB_URL);
    }

    globalWithMongo._mongoose.conn = await globalWithMongo._mongoose.promise;
    return globalWithMongo._mongoose.conn;
}

await connectDB();
console.log("Connected");

if (!process.env.VERCEL) {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`server is running on http://localhost:${port}`);
    });
}

export default app;
