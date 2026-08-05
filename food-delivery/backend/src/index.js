import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const port = 8000
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://duurnbileg_db_user:2aJ0o4lfYD7TD39j@food-delivery.himwcsy.mongodb.net/").then(() => console.log("Connected."))
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})