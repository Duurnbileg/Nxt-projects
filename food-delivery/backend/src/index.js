import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { categoryRouter } from "./routes/category.js";
import { userRouter } from "./routes/user.js";
import { foodRouter } from "./routes/food.js";
import { orderRouter } from "./routes/order.js";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);

await mongoose.connect(process.env.MONGODB_URL);
console.log("Connected");

if (!process.env.VERCEL) {
    const port = 8000;
    app.listen(port, () => {
        console.log(`server is running on http://localhost:${port}`);
    });
}

export default app;