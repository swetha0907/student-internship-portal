import express from "express";
import mongoose from "mongoose";
import Application from "../models/Application.js";

const router = express.Router();

// POST - Submit application
router.post("/", async (req, res) => {
    try {
        const {
            studentName,
            email,
            rollNumber,
            internship
        } = req.body;

        if (
            !studentName?.trim() ||
            !email?.trim() ||
            !rollNumber?.trim() ||
            !internship?.trim()
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const application = await Application.create({
            studentName,
            email,
            rollNumber,
            internship
        });

        res.status(201).json({
            message: "Application submitted successfully!",
            data: application
        });

    } catch (error) {
        console.error("Application error:", error);

        res.status(400).json({
            message: error.message
        });
    }
});

// GET - All applications
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: applications.length,
            data: applications
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve applications"
        });
    }
});

// GET - Application by ID
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid application ID"
            });
        }

        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            data: application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve application"
        });
    }
});

export default router;