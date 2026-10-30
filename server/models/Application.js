import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

    studentName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    rollNumber: {
        type: String,
        required: true,
        trim: true
    },

    internship: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const Application = mongoose.model(
    "Application",
    applicationSchema
);

export default Application;