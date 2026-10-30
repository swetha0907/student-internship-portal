import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Student Internship Portal Backend Running");
});

app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {

        await mongoose.connect(process.env.MONGO_DB_URI);

        console.log("MongoDB connected successfully");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

startServer();