import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true, // This ensures tags are unique
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    usageCount: {
        type: Number,
        default: 0 // Track how many times this tag is used
    },
    contents: [{
        type: mongoose.Types.ObjectId,
        ref: "Content" // Reference to content using this tag
    }]
});

// Add an index on title for faster lookups
// tagSchema.index({ title: 1 });

const TagModel = mongoose.model("Tag", tagSchema);

export default TagModel;