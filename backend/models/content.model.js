import mongoose, { Types } from "mongoose";

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: contentTypes, // Fixed typo: 'emum' -> 'enum'
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    tags: [{
        type: Types.ObjectId,
        ref: "Tag",
        required: false // Made explicit that tags are optional
    }],
    createdAt: { // Added timestamp
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Added timestamps option for createdAt/updatedAt
});

// Add indexes for common queries
contentSchema.index({ user: 1 });
contentSchema.index({ type: 1 });
contentSchema.index({ tags: 1 });

const ContentModel = mongoose.model("Content", contentSchema); // Fixed model name casing

export default ContentModel;