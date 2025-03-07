import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true, // Fixed typo: requred -> required
    },
    hash: {
        type: String,
        required: true, // Fixed typo: requred -> required
    },
    createdAt: { // Added timestamp
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Added timestamps option
});

// Add index for faster lookups
linkSchema.index({ user: 1 });
linkSchema.index({ hash: 1 });

const LinkModel = mongoose.model("Link", linkSchema); // Fixed model name casing

export default LinkModel;