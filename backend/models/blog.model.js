import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    default: "https://via.placeholder.com/300"
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const BlogModel = mongoose.model('Blog', blogSchema);

export default BlogModel; 